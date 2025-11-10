import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentService from '@/services/payment.service';
import orderService from '@/services/order.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentInfo } from '@/lib/api-client';

const Payment = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const paymentService = new PaymentService();
    
    const [order, setOrder] = useState<any>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [isPaid, setIsPaid] = useState(false);
    const [checking, setChecking] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderNumber) {
            loadOrderAndPayment();
            
            // Auto check payment status every 10 seconds
            const interval = setInterval(checkPaymentStatus, 10000);
            return () => clearInterval(interval);
        }
    }, [orderNumber]);

    const loadOrderAndPayment = async () => {
        if (!orderNumber) return;
        
        try {
            // Load order details
            const orderData = await orderService.getOrderByNumber(orderNumber);
            setOrder(orderData);

            // Create payment info (QR code) for bank transfer
            if (orderData?.id) {
                const paymentResult = await paymentService.createPaymentInfo(orderData.id);
                if (paymentResult.success && paymentResult.data) {
                    setPaymentInfo(paymentResult.data);
                }
            }
        } catch (error) {
            console.error('Error loading order:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkPaymentStatus = async () => {
        if (!orderNumber || checking) return;
        
        setChecking(true);
        try {
            // Backend trả về: { success: boolean, message: string, order?: Order }
            const result = await paymentService.checkTransactionStatus(orderNumber);
            
            if (result.success) {
                setIsPaid(true);
                toast({
                    title: "Thanh toán thành công!",
                    description: "Đơn hàng của bạn đã được xác nhận",
                });
            }
        } catch (error) {
            console.error('Error checking payment:', error);
        } finally {
            setChecking(false);
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Đã sao chép!",
            description: `${label} đã được sao chép vào clipboard`,
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                    <p className="mt-4">Đang tải thông tin thanh toán...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto text-center">
                    <CardContent className="pt-12 pb-12">
                        <p className="text-xl mb-4">Không tìm thấy đơn hàng</p>
                        <Button onClick={() => navigate('/')}>
                            Về trang chủ
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isPaid) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="max-w-2xl mx-auto text-center">
                    <CardContent className="pt-12 pb-12">
                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold mb-3">Thanh toán thành công!</h1>
                        <p className="text-gray-600 mb-2">
                            Mã đơn hàng: <span className="font-semibold text-red-600">{orderNumber}</span>
                        </p>
                        <p className="text-gray-600 mb-8">
                            Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button 
                                onClick={() => navigate(`/orders/${order.id}`)}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Xem chi tiết đơn hàng
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => navigate('/')}
                            >
                                Tiếp tục mua sắm
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                        <CardTitle className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-red-600" />
                            <div>
                                <div className="text-2xl">Chờ thanh toán</div>
                                <div className="text-sm font-normal text-gray-600 mt-1">
                                    Mã đơn hàng: <span className="font-semibold">{orderNumber}</span>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {paymentInfo && (
                            <>
                                <div className="text-center">
                                    <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                                        <img 
                                            src={paymentInfo.qrCode} 
                                            alt="QR Code thanh toán"
                                            className="w-72 h-72 mx-auto"
                                        />
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 font-medium">
                                        📱 Quét mã QR bằng ứng dụng ngân hàng để thanh toán
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg space-y-3 border">
                                    <h3 className="font-bold text-lg mb-4 text-gray-800">Thông tin chuyển khoản</h3>
                                    
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-semibold text-gray-700">Ngân hàng:</span>
                                        <span className="text-gray-900 font-medium">{paymentInfo.bankInfo.bankName}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-semibold text-gray-700">Số tài khoản:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-900 font-mono font-bold">{paymentInfo.bankInfo.accountNumber}</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => copyToClipboard(paymentInfo.bankInfo.accountNumber, 'Số tài khoản')}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-semibold text-gray-700">Chủ tài khoản:</span>
                                        <span className="text-gray-900 font-medium">{paymentInfo.bankInfo.accountName}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b">
                                        <span className="font-semibold text-gray-700">Số tiền:</span>
                                        <span className="text-red-600 font-bold text-xl">
                                            {paymentInfo.amount.toLocaleString('vi-VN')}₫
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 bg-yellow-50 -mx-6 px-6 rounded">
                                        <span className="font-semibold text-gray-700">Nội dung CK:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-600 font-mono font-bold">{paymentInfo.content}</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => copyToClipboard(paymentInfo.content, 'Nội dung chuyển khoản')}
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-yellow-800">
                                        <span className="font-semibold">⚠️ Lưu ý quan trọng:</span>
                                        <br />
                                        • Vui lòng chuyển khoản <span className="font-bold">ĐÚNG số tiền</span> và <span className="font-bold">ĐÚNG nội dung</span> như trên
                                        <br />
                                        • Hệ thống sẽ tự động xác nhận thanh toán sau khi nhận được tiền
                                        <br />
                                        • Không cần gửi ảnh chụp màn hình giao dịch
                                    </p>
                                </div>

                                <div className="text-center">
                                    <Button 
                                        onClick={checkPaymentStatus}
                                        disabled={checking}
                                        className="bg-red-600 hover:bg-red-700"
                                        size="lg"
                                    >
                                        {checking ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                Đang kiểm tra...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                Kiểm tra thanh toán
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Hệ thống sẽ tự động kiểm tra mỗi 10 giây
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Payment;

