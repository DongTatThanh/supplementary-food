import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '@/services/order.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, MapPin, Clock, CheckCircle, Eye, XCircle } from 'lucide-react';
import { getImageUrl } from '@/lib/api-client';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const OrderDetail = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [order, setOrder] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    useEffect(() => {
        if (orderNumber) {
            loadOrderDetail();
        } else {
            loadOrdersList();
        }
    }, [orderNumber]);

    // Load danh sách đơn hàng
    const loadOrdersList = async () => {
        try {
            const data = await orderService.getUserOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load chi tiết 1 đơn hàng
    const loadOrderDetail = async () => {
        if (!orderNumber) return;
        
        try {
            const data = await orderService.getOrderByNumber(orderNumber);
            setOrder(data);
        } catch (error) {
            console.error('Error loading order:', error);
        } finally {
            setLoading(false);
        }
    };

    // Hủy đơn hàng
    const handleCancelOrder = async () => {
        if (!order?.id) return;
        
        setCancelling(true);
        try {
            await orderService.cancelOrder(order.id, cancelReason);
            toast({
                title: "Hủy đơn hàng thành công",
                description: `Đơn hàng ${order.order_number} đã được hủy`,
            });
            setShowCancelDialog(false);
            setCancelReason(''); // Reset reason
            // Reload order để cập nhật trạng thái
            loadOrderDetail();
        } catch (error: any) {
            toast({
                title: "Không thể hủy đơn hàng",
                description: error.message || "Vui lòng thử lại sau",
                variant: "destructive"
            });
        } finally {
            setCancelling(false);
        }
    };

    // Kiểm tra có thể hủy đơn không (chỉ pending)
    const canCancelOrder = (status: string) => {
        return status === 'pending';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'shipping':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Chờ xác nhận';
            case 'confirmed':
                return 'Đã xác nhận';
            case 'shipping':
                return 'Đang giao';
            case 'delivered':
                return 'Đã giao';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    <p className="mt-4">Đang tải thông tin đơn hàng...</p>
                </div>
            </div>
        );
    }

    // Hiển thị DANH SÁCH đơn hàng
    if (!orderNumber) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Đơn hàng của tôi</h1>
                
                {orders.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-xl mb-2">Chưa có đơn hàng nào</p>
                            <p className="text-gray-600 mb-6">Hãy mua sắm và tạo đơn hàng đầu tiên của bạn!</p>
                            <Button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700">
                                Mua sắm ngay
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Mã đơn hàng</p>
                                            <p className="font-semibold text-lg">{order.order_number}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Ngày đặt</p>
                                            <p className="font-medium">{new Date(order.order_date).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Tổng tiền</p>
                                            <p className="font-bold text-red-600">{parseFloat(order.total_amount).toLocaleString('vi-VN')}₫</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Sản phẩm</p>
                                            <p className="font-medium">{order.items?.length || 0} sản phẩm</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => navigate(`/order/${order.order_number}`)}
                                            className="flex items-center gap-2"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Hiển thị CHI TIẾT 1 đơn hàng (có orderNumber)
    if (!order) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto text-center">
                    <CardContent className="pt-12 pb-12">
                        <p className="text-xl mb-4">Không tìm thấy đơn hàng</p>
                        <Button onClick={() => navigate('/order')}>
                            Xem danh sách đơn hàng
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button 
                variant="ghost" 
                onClick={() => navigate('/order')}
                className="mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách đơn hàng
            </Button>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold">Chi tiết đơn hàng</h1>
                    <span className={`px-4 py-2 rounded-lg border font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                    </span>
                </div>
                <p className="text-gray-600">
                    Mã đơn hàng: <span className="font-semibold text-red-600">{order.order_number}</span>
                </p>
                <p className="text-sm text-gray-500">
                    Đặt hàng lúc: {new Date(order.createOrder).toLocaleString('vi-VN')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái - Thông tin đơn hàng */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Sản phẩm */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Sản phẩm đã đặt
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items?.map((item: any, index: number) => (
                                    <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                                        <img
                                            src={getImageUrl(item.product_image)}
                                            alt={item.product_name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium mb-1">{item.product_name}</h4>
                                            <p className="text-sm text-gray-600">
                                                Số lượng: {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Đơn giá: {parseFloat(item.price).toLocaleString('vi-VN')}₫
                                            </p>
                                            <p className="font-semibold text-red-600 mt-1">
                                                {(parseFloat(item.price) * item.quantity).toLocaleString('vi-VN')}₫
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Thông tin giao hàng */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Thông tin giao hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">Người nhận</p>
                                <p className="font-semibold">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Số điện thoại</p>
                                <p className="font-semibold">{order.customer_phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="font-semibold">{order.customer_email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Địa chỉ giao hàng</p>
                                <p className="font-semibold">
                                    {order.shipping_address}, {order.shipping_ward}, {order.shipping_district}, {order.shipping_city}
                                </p>
                            </div>
                            {order.notes && (
                                <div>
                                    <p className="text-sm text-gray-600">Ghi chú</p>
                                    <p className="font-semibold">{order.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Lịch sử đơn hàng */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Lịch sử đơn hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div className="w-0.5 h-12 bg-gray-300"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Đơn hàng đã được đặt</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(order.created_at).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                </div>
                                
                                {order.status !== 'pending' && (
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                            </div>
                                            {order.status !== 'confirmed' && <div className="w-0.5 h-12 bg-gray-300"></div>}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Đơn hàng đã được xác nhận</p>
                                            <p className="text-sm text-gray-600">
                                                {order.updated_at ? new Date(order.updated_at).toLocaleString('vi-VN') : '-'}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {(order.status === 'shipping' || order.status === 'delivered') && (
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-purple-600" />
                                            </div>
                                            {order.status !== 'shipping' && <div className="w-0.5 h-12 bg-gray-300"></div>}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Đang giao hàng</p>
                                            <p className="text-sm text-gray-600">-</p>
                                        </div>
                                    </div>
                                )}

                                {order.status === 'delivered' && (
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Đã giao hàng thành công</p>
                                            <p className="text-sm text-gray-600">-</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cột phải - Tổng quan đơn hàng */}
                <div>
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Tổng quan đơn hàng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tạm tính:</span>
                                <span className="font-semibold">
                                    {parseFloat(order.total_amount).toLocaleString('vi-VN')}₫
                                </span>
                            </div>

                            {order.discount_code && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                        Giảm giá ({order.discount_code}):
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        -{parseFloat(order.discount_amount || 0).toLocaleString('vi-VN')}₫
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Phí vận chuyển:</span>
                                <span className="font-semibold text-green-600">Miễn phí</span>
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Tổng cộng:</span>
                                    <span className="text-red-600">
                                        {(parseFloat(order.total_amount) - parseFloat(order.discount_amount || 0)).toLocaleString('vi-VN')}₫
                                    </span>
                                </div>
                            </div>

                            <div className="border-t pt-3">
                                <p className="text-sm text-gray-600 mb-1">Phương thức thanh toán:</p>
                                <p className="font-semibold">
                                    {order.payment_method === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}
                                </p>
                            </div>

                            <div className="border-t pt-3">
                                <p className="text-sm text-gray-600 mb-1">Trạng thái thanh toán:</p>
                                <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold ${
                                    order.payment_status === 'paid' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {order.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                </span>
                            </div>

                            {order.payment_status !== 'paid' && order.payment_method !== 'COD' && (
                                <Button
                                    onClick={() => navigate(`/payment/${order.order_number}`)}
                                    className="w-full bg-red-600 hover:bg-red-700"
                                >
                                    Thanh toán ngay
                                </Button>
                            )}

                            {/* Nút hủy đơn hàng - chỉ hiển thị khi pending */}
                            {canCancelOrder(order.status) && (
                                <Button
                                    onClick={() => setShowCancelDialog(true)}
                                    variant="outline"
                                    className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Hủy đơn hàng
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dialog xác nhận hủy đơn */}
            <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận hủy đơn hàng</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn hủy đơn hàng <strong>{order?.order_number}</strong>?
                            <br />
                            Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">
                            Lý do hủy đơn (tùy chọn):
                        </label>
                        <Textarea
                            placeholder="Ví dụ: Đặt nhầm sản phẩm, Tìm được giá rẻ hơn, Không cần nữa..."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            rows={3}
                            className="resize-none"
                        />
                    </div>
                    
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setCancelReason('')}>
                            Không, giữ đơn hàng
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancelOrder}
                            disabled={cancelling}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {cancelling ? 'Đang hủy...' : 'Có, hủy đơn hàng'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default OrderDetail;
