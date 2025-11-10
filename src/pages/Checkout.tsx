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
import { ArrowLeft, Tag, X } from 'lucide-react';
import DiscountCodeService from '@/services/discountCode.service';

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
            setAvailableCodes(codes.slice(0, 3)); // Hiển thị tối đa 3 mã
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

            <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
            
            {/* Mã giảm giá có sẵn */}
            {availableCodes.length > 0 && !appliedDiscount && (
                <Card className="mb-6 border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-green-800">Mã giảm giá có sẵn</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {availableCodes.map((code) => (
                                <div 
                                    key={code.id}
                                    className="bg-white border-2 border-dashed border-green-300 rounded-lg p-3 cursor-pointer hover:border-green-500 transition-colors"
                                    onClick={() => quickApplyDiscount(code)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-green-700 text-lg">{code.code}</span>
                                        <span className="text-xs text-green-600 font-semibold">
                                            {code.discount_percentage ? `-${code.discount_percentage}%` : `-${code.discount_amount?.toLocaleString('vi-VN')}₫`}
                                        </span>
                                    </div>
                                    {code.name && (
                                        <p className="text-xs text-gray-600 line-clamp-2">{code.name}</p>
                                    )}
                                    {code.min_order_value && code.min_order_value > 0 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Đơn tối thiểu: {code.min_order_value.toLocaleString('vi-VN')}₫
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form thông tin */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thông tin giao hàng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    placeholder="Họ và tên *"
                                    value={formData.customer_name}
                                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Số điện thoại *"
                                        value={formData.customer_phone}
                                        onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                                        required
                                    />
                                    <Input
                                        placeholder="Email *"
                                        type="email"
                                        value={formData.customer_email}
                                        onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                                        required
                                    />
                                </div>

                                <Input
                                    placeholder="Địa chỉ cụ thể (số nhà, tên đường) *"
                                    value={formData.shipping_address}
                                    onChange={(e) => setFormData({...formData, shipping_address: e.target.value})}
                                    required
                                />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        placeholder="Tỉnh/Thành phố *"
                                        value={formData.shipping_city}
                                        onChange={(e) => setFormData({...formData, shipping_city: e.target.value})}
                                        required
                                    />
                                    <Input
                                        placeholder="Quận/Huyện *"
                                        value={formData.shipping_district}
                                        onChange={(e) => setFormData({...formData, shipping_district: e.target.value})}
                                        required
                                    />
                                    <Input
                                        placeholder="Phường/Xã *"
                                        value={formData.shipping_ward}
                                        onChange={(e) => setFormData({...formData, shipping_ward: e.target.value})}
                                        required
                                    />
                                </div>

                                <Textarea
                                    placeholder="Ghi chú đơn hàng (tùy chọn)"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                    rows={3}
                                />

                                <Button 
                                    type="submit" 
                                    className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Tóm tắt đơn hàng */}
                <div>
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Đơn hàng của bạn</CardTitle>
                        </CardHeader>
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
                            </div>

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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
