import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cart, CartService } from '@/services/cart.service';
import orderService, { CreateOrderDto } from '@/services/order.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageUrl, DiscountCode } from '@/lib/api-client';
import { ArrowLeft, Tag, X, MapPin } from 'lucide-react';
import DiscountCodeService from '@/services/discountCode.service';
import AddressSelect from '@/components/address/AddressSelect';

const Checkout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const cartService = new CartService();
    const discountService = new DiscountCodeService();
    
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
    const [checkingDiscount, setCheckingDiscount] = useState(false);
    const [formData, setFormData] = useState<CreateOrderDto>({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_district: '',
        shipping_ward: '',
        notes: ''
    });
    const [availableCodes, setAvailableCodes] = useState<DiscountCode[]>([]);

    useEffect(() => {
        loadCart();
        loadAvailableCodes();
    }, []);

    const loadCart = async () => {
        const data = await cartService.getUserCart();
        if (!data || data.items.length === 0) {
            toast({
                title: "Giỏ hàng trống",
                description: "Vui lòng thêm sản phẩm vào giỏ hàng",
                variant: "destructive"
            });
            navigate('/cart');
            return;
        }
        setCart(data);
    };

    const loadAvailableCodes = async () => {
        try {
            const codes = await discountService.getActiveCodes();
            setAvailableCodes(codes.slice(0, 5)); 
        } catch (error) {
            console.error('Lỗi tải mã giảm giá:', error);
        }
    };

    const quickApplyDiscount = (code: DiscountCode) => {
        setDiscountCode(code.code);
        setAppliedDiscount(code);
        toast({
            title: "Áp dụng thành công!",
            description: `Bạn đã được giảm ${code.discount_percentage ? code.discount_percentage + '%' : code.discount_amount?.toLocaleString('vi-VN') + '₫'}`,
        });
    };

    const handleAutoFillAddress = () => {
        if (!navigator.geolocation) {
            toast({
                title: " Không hỗ trợ",
                description: "Trình duyệt không hỗ trợ chia sẻ vị trí!",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "📍 Đang lấy vị trí...",
            description: "Vui lòng chờ trong giây lát",
        });

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=vi`
                    );

                    const data = await res.json();
                    const addr = data.address || {};

                    // Tự động điền toàn bộ trường
                    setFormData(prev => ({
                        ...prev,
                        shipping_address: addr.road || addr.neighbourhood || "",
                        shipping_city: addr.state || addr.city || "",
                        shipping_district: addr.county || addr.city_district || "",
                        shipping_ward: addr.suburb || addr.village || addr.hamlet || ""
                    }));

                    toast({
                        title: " Thành công!",
                        description: "Đã tự động điền địa chỉ hiện tại của bạn",
                    });
                } catch (error) {
                    console.error(error);
                    toast({
                        title: " Lỗi",
                        description: "Không thể lấy địa chỉ hiện tại!",
                        variant: "destructive"
                    });
                }
            },
            () => {
                toast({
                    title: " Quyền truy cập bị từ chối",
                    description: "Bạn cần cho phép trình duyệt truy cập vị trí!",
                    variant: "destructive"
                });
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Thêm mã giảm giá vào order data nếu có
            const orderData: CreateOrderDto = {
                ...formData,
                ...(appliedDiscount && { discount_code: appliedDiscount.code })
            };
            
            const result = await orderService.createOrder(orderData);
            
            if (result.success && result.data) {
                toast({
                    title: "Đặt hàng thành công!",
                    description: `Mã đơn hàng: ${result.data.order_number}`,
                });
                
                // Chuyển sang trang thanh toán
                navigate(`/payment/${result.data.order_number}`);
            } else {
                toast({
                    title: "Lỗi",
                    description: result.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể đặt hàng",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce((sum, item) => 
            sum + (parseFloat(item.price) * item.quantity), 0
        );
    };

    const calculateDiscount = () => {
        if (!appliedDiscount) return 0;
        
        const subtotal = calculateTotal();
        
        // Kiểm tra đơn hàng tối thiểu
        const minOrder = appliedDiscount.min_order_value || 0;
        if (subtotal < minOrder) return 0;
        
        let discount = 0;
        
        // Tính giảm giá theo phần trăm
        if (appliedDiscount.discount_percentage) {
            discount = (subtotal * appliedDiscount.discount_percentage) / 100;
            
            // Áp dụng giảm giá tối đa nếu có
            const maxDiscount = appliedDiscount.max_discount_amount || Infinity;
            discount = Math.min(discount, maxDiscount);
        } 
        // Tính giảm giá theo số tiền cố định
        else if (appliedDiscount.discount_amount) {
            discount = appliedDiscount.discount_amount;
        }
        
        return Math.min(discount, subtotal); // Không giảm quá tổng tiền
    };

    const getFinalTotal = () => {
        return calculateTotal() - calculateDiscount();
    };

    const applyDiscountCode = async () => {
        if (!discountCode.trim()) {
            toast({
                title: "Lỗi",
                description: "Vui lòng nhập mã giảm giá",
                variant: "destructive"
            });
            return;
        }

        setCheckingDiscount(true);
        try {
            // Lấy danh sách mã giảm giá active
            const activeCodes = await discountService.getActiveCodes();
            
            // Tìm mã giảm giá khớp với mã nhập vào
            const foundCode = activeCodes.find(
                code => code.code.toUpperCase() === discountCode.trim().toUpperCase()
            );

            if (!foundCode) {
                toast({
                    title: "Mã không hợp lệ",
                    description: "Mã giảm giá không tồn tại hoặc đã hết hạn",
                    variant: "destructive"
                });
                return;
            }

            // Kiểm tra điều kiện đơn hàng tối thiểu
            const minOrder = foundCode.min_order_value || 0;
            if (calculateTotal() < minOrder) {
                toast({
                    title: "Không đủ điều kiện",
                    description: `Đơn hàng tối thiểu ${minOrder.toLocaleString('vi-VN')}₫ để áp dụng mã này`,
                    variant: "destructive"
                });
                return;
            }

            setAppliedDiscount(foundCode);
            toast({
                title: "Áp dụng thành công!",
                description: `Bạn đã được giảm ${foundCode.discount_percentage ? foundCode.discount_percentage + '%' : foundCode.discount_amount?.toLocaleString('vi-VN') + '₫'}`,
            });
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể kiểm tra mã giảm giá",
                variant: "destructive"
            });
        } finally {
            setCheckingDiscount(false);
        }
    };

    const removeDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCode('');
        toast({
            title: "Đã xóa mã giảm giá",
        });
    };

    if (!cart) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button 
                variant="ghost" 
                onClick={() => navigate('/cart')}
                className="mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại giỏ hàng
            </Button>

          
            
            {/* Layout 3 cột */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột 1: Thông tin mua hàng */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Thông tin mua hàng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                                    <Input
                                        placeholder="Email *"
                                        type="email"
                                        value={formData.customer_email}
                                        onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                                        required
                                    />
                                    
                                    <Input
                                        placeholder="Họ và tên *"
                                        value={formData.customer_name}
                                        onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                                        required
                                    />
                                    
                                    <Input
                                        placeholder="Số điện thoại *"
                                        value={formData.customer_phone}
                                        onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                                        required
                                    />
                                    
                                    <Input
                                        placeholder="Địa chỉ *"
                                        value={formData.shipping_address}
                                        onChange={(e) => setFormData({...formData, shipping_address: e.target.value})}
                                        required
                                    />

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="sameAddress"
                                            className="w-4 h-4"
                                            defaultChecked
                                        />
                                        <label htmlFor="sameAddress" className="text-sm text-gray-700">
                                            Giao hàng đến địa chỉ khác
                                        </label>
                                    </div>

                                    {/* Thông tin nhận hàng */}
                                    <div className="pt-4 border-t space-y-4">
                                        <h3 className="font-semibold text-gray-800">Thông tin nhận hàng</h3>
                                        
                                        <Input
                                            placeholder="Họ và tên *"
                                            value={formData.customer_name}
                                            onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                                            required
                                        />
                                        
                                        <Input
                                            placeholder="Số điện thoại *"
                                            value={formData.customer_phone}
                                            onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                                            required
                                        />
                                        
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Địa chỉ *"
                                                value={formData.shipping_address}
                                                onChange={(e) => setFormData({...formData, shipping_address: e.target.value})}
                                                required
                                            />
                                            <Button 
                                                type="button"
                                                variant="outline"
                                                onClick={handleAutoFillAddress}
                                                className="w-full flex items-center justify-center gap-2"
                                            >
                                                <MapPin className="w-4 h-4" />
                                                Lấy vị trí hiện tại
                                            </Button>
                                        </div>

                                        {/* Component chọn địa chỉ */}
                                        <AddressSelect
                                            onProvinceChange={(name) => setFormData({...formData, shipping_city: name})}
                                            onDistrictChange={(name) => setFormData({...formData, shipping_district: name})}
                                            onWardChange={(name) => setFormData({...formData, shipping_ward: name})}
                                        />

                                        <Textarea
                                            placeholder="Ghi chú đơn hàng (tùy chọn)"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                            rows={3}
                                        />
                                    </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cột 2: Vận chuyển & Thanh toán */}
                <div className="space-y-6">
                    {/* Vận chuyển */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Vận chuyển</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="radio" 
                                            name="shipping" 
                                            id="ship-fast"
                                            defaultChecked
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="ship-fast" className="cursor-pointer">
                                            <p className="font-medium">Giao hàng nhanh (1-4 giờ)</p>
                                        </label>
                                    </div>
                                    <span className="font-semibold">Miễn phí</span>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="radio" 
                                            name="shipping" 
                                            id="ship-normal"
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="ship-normal" className="cursor-pointer">
                                            <p className="font-medium">Giao hàng thường (1-3 ngày)</p>
                                        </label>
                                    </div>
                                    <span className="font-semibold">Miễn phí</span>
                                </div>
                            </CardContent>
                        </Card>

                    {/* Thanh toán */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Thanh toán</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        id="payment-cod"
                                        defaultChecked
                                        className="w-4 h-4"
                                    />
                                    <label htmlFor="payment-cod" className="cursor-pointer">
                                        <p className="font-medium">Thanh Toán Khi Giao Hàng (COD)</p>
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
          
                {/* Cột 3: Đơn hàng */}
                <div>
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Đơn hàng của bạn</CardTitle>
                        </CardHeader>2
                        <CardContent className="space-y-4">
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex gap-3 pb-3 border-b">
                                        <img
                                            src={getImageUrl(item.product.featured_image)}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm line-clamp-2">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {item.quantity} x {parseFloat(item.price).toLocaleString('vi-VN')}₫
                                            </p>
                                            <p className="text-sm font-semibold text-red-600">
                                                {(parseFloat(item.price) * item.quantity).toLocaleString('vi-VN')}₫
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                  {/* Mã giảm giá có sẵn - compact */}
          
                            </div>
                              {availableCodes.length > 0 && !appliedDiscount && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Mã giảm giá có sẵn</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {availableCodes.map((code) => (
                            <button
                                key={code.id}
                                onClick={() => quickApplyDiscount(code)}
                                className="bg-white border border-green-300 rounded px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100 hover:border-green-500 transition-colors"
                            >
                                {code.code}
                            </button>
                        ))}
                    </div>
                </div>
            )}


                            <div className="space-y-2 pt-4 border-t">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tạm tính:</span>
                                    <span className="font-semibold">{calculateTotal().toLocaleString('vi-VN')}₫</span>
                                </div>
                                
                                {/* Mã giảm giá */}
                                <div className="space-y-2 py-2">
                                    {!appliedDiscount ? (
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Nhập mã giảm giá"
                                                value={discountCode}
                                                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                                className="flex-1"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        applyDiscountCode();
                                                    }
                                                }}
                                            />
                                            <Button 
                                                onClick={applyDiscountCode}
                                                disabled={checkingDiscount}
                                                variant="outline"
                                                className="whitespace-nowrap"
                                            >
                                                <Tag className="w-4 h-4 mr-1" />
                                                {checkingDiscount ? 'Kiểm tra...' : 'Áp dụng'}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Tag className="w-4 h-4 text-green-600" />
                                                    <div>
                                                        <p className="font-semibold text-green-800 text-sm">
                                                            {appliedDiscount.code}
                                                        </p>
                                                        {appliedDiscount.name && (
                                                            <p className="text-xs text-green-600">
                                                                {appliedDiscount.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={removeDiscount}
                                                    className="h-6 w-6 p-0"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {appliedDiscount && calculateDiscount() > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Giảm giá:</span>
                                        <span className="font-semibold">-{calculateDiscount().toLocaleString('vi-VN')}₫</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Phí vận chuyển:</span>
                                    <span className="font-semibold text-green-600">Miễn phí</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span>Tổng cộng:</span>
                                    <span className="text-red-600">{getFinalTotal().toLocaleString('vi-VN')}₫</span>
                                </div>
                            </div>

                            {/* Nút quay về giỏ hàng */}
                            <Button
                                variant="outline"
                                onClick={() => navigate('/cart')}
                                className="w-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Quay về giỏ hàng
                            </Button>

                            {/* Nút đặt hàng */}
                            <Button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 h-12 text-base font-semibold"
                            >
                                {loading ? 'Đang xử lý...' : 'ĐẶT HÀNG'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
    

        </div>
    );
};

export default Checkout;
