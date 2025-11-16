import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentService from '@/services/payment.service';
import orderService from '@/services/order.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PaymentInfo } from '@/lib/api-client';

const Payment = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>(); // Thực ra là orderId
    const navigate = useNavigate();
    const { toast } = useToast();
    const paymentService = useMemo(() => new PaymentService(), []);
    const checkingRef = useRef(false);
    
    const [order, setOrder] = useState<any>(null);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
    const [isPaid, setIsPaid] = useState(false);
    const [checking, setChecking] = useState(false);
    const [loading, setLoading] = useState(true);

    // Định nghĩa checkPaymentStatus trước để có thể dùng trong useEffect
    const checkPaymentStatus = useCallback(async (showToast = false) => {
        if (!order?.order_number || checkingRef.current || isPaid) return;
        
        checkingRef.current = true;
        setChecking(true);
        try {
            const result = await paymentService.checkTransactionStatus(order.order_number);
            
            if (result.success) {
                setIsPaid(true);
                toast({
                    title: " Thanh toán thành công!",
                    description: "Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn đã mua hàng!",
                    duration: 5000,
                });
            } else if (showToast) {
                // Chỉ hiển thị toast khi người dùng click nút
                toast({
                    title: " Chưa nhận được thanh toán",
                    description: result.message || "Vui lòng kiểm tra lại nội dung chuyển khoản phải chứa mã đơn hàng",
                    variant: "default",
                    duration: 4000,
                });
            }
        } catch (error) {
            if (showToast) {
                toast({
                    title: " Lỗi kiểm tra thanh toán",
                    description: "Không thể kết nối đến server. Vui lòng thử lại sau.",
                    variant: "destructive",
                });
            }
        } finally {
            checkingRef.current = false;
            setChecking(false);
        }
    }, [order?.order_number, isPaid, paymentService, toast]);

    useEffect(() => {
        if (orderNumber) {
            loadOrderAndPayment();
        }
    }, [orderNumber]);

    // Auto check payment status sau khi order đã được load
    useEffect(() => {
        if (!order?.order_number || isPaid) return;
        
        // Check ngay lần đầu tiên sau khi order được load
        checkPaymentStatus(false);
        
        // Sau đó check tự động mỗi 10 giây (không hiển thị toast)
        const interval = setInterval(() => {
            checkPaymentStatus(false);
        }, 10000);
        
        return () => clearInterval(interval);
    }, [order?.order_number, isPaid, checkPaymentStatus]);

    const loadOrderAndPayment = async () => {
        if (!orderNumber) return;
        
        try {
            // Try to get from sessionStorage first (just created order)
            const pendingOrder = sessionStorage.getItem('pending_order');
            let orderData;
            
            if (pendingOrder) {
                orderData = JSON.parse(pendingOrder);
                sessionStorage.removeItem('pending_order'); // Clean up
                setOrder(orderData);
            } else {
                // Load order details by ID from backend
                const orderId = parseInt(orderNumber);
                if (isNaN(orderId)) {
                    toast({
                        title: 'Lỗi',
                        description: 'Mã đơn hàng không hợp lệ',
                        variant: 'destructive'
                    });
                    return;
                }
                orderData = await orderService.getOrderById(orderId);
                setOrder(orderData);
            }
            

            // Create payment info (QR code) for bank transfer
            if (orderData?.id) {
                const paymentResult = await paymentService.createPaymentInfo(orderData.id);
               
                
                if (paymentResult.success && paymentResult.data) {
                    setPaymentInfo(paymentResult.data);
                } else {
                    toast({
                        title: " Không thể tạo QR code",
                        description: paymentResult.message || "Vui lòng chuyển khoản thủ công theo thông tin bên dưới",
                        variant: "destructive",
                    });
                    // Vẫn set paymentInfo nhưng không có QR
                    if (paymentResult.data) {
                        setPaymentInfo(paymentResult.data);
                    }
                }
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    // Hàm check payment khi người dùng click nút (có hiển thị toast)
    const handleManualCheck = async () => {
        await checkPaymentStatus(true);
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
                            Mã đơn hàng: <span className="font-semibold text-red-600">{order?.order_number || orderNumber}</span>
                        </p>
                        <p className="text-gray-600 mb-8">
                            Cảm ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button 
                                onClick={() => navigate(`/order/${order?.order_number || orderNumber}`)}
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
                                    Mã đơn hàng: <span className="font-semibold">{order?.order_number || orderNumber}</span>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        {paymentInfo && (
                            <>
                                {paymentInfo.qrCode ? (
                                    <div className="text-center">
                                        <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                                            <img 
                                                src={paymentInfo.qrCode.startsWith('data:') || paymentInfo.qrCode.startsWith('http') 
                                                    ? paymentInfo.qrCode 
                                                    : `data:image/png;base64,${paymentInfo.qrCode}`
                                                } 
                                                alt="QR Code thanh toán"
                                                className="w-72 h-72 mx-auto"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    toast({
                                                        title: " QR Code không tải được",
                                                        description: "Vui lòng chuyển khoản thủ công theo thông tin bên dưới",
                                                        variant: "destructive",
                                                    });
                                                }}
                                            />
                                        </div>
                                        <p className="mt-4 text-sm text-gray-600 font-medium">
                                            📱 Quét mã QR bằng ứng dụng ngân hàng để thanh toán
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                                        <p className="text-yellow-800 font-semibold mb-2">
                                             QR Code tạm thời không khả dụng
                                        </p>
                                        <p className="text-sm text-yellow-700">
                                            Vui lòng chuyển khoản thủ công theo thông tin bên dưới
                                        </p>
                                    </div>
                                )}

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
                                    
                                    <div className="flex justify-between items-center py-2 bg-yellow-50 -mx-6 px-6 rounded border-2 border-yellow-300">
                                        <span className="font-semibold text-gray-700">Nội dung CK: <span className="text-red-600">*</span></span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-600 font-mono font-bold text-lg">{paymentInfo.content}</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => copyToClipboard(paymentInfo.content, 'Nội dung chuyển khoản')}
                                                className="bg-blue-100 hover:bg-blue-200"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Thông báo auto-check */}
                                <div className="pt-4 border-t">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <RefreshCw className={`w-4 h-4 text-blue-600 ${checking ? 'animate-spin' : ''}`} />
                                            <p className="text-sm font-semibold text-blue-800">
                                                {checking ? 'Đang kiểm tra thanh toán...' : 'Đang tự động kiểm tra thanh toán'}
                                            </p>
                                        </div>
                                        <p className="text-xs text-blue-600">
                                            Hệ thống sẽ tự động kiểm tra trạng thái thanh toán mỗi 10 giây. 
                                            Bạn không cần làm gì, chúng tôi sẽ thông báo ngay khi nhận được thanh toán.
                                        </p>
                                    </div>
                                    
                                    {/* Nút kiểm tra thủ công (tùy chọn) */}
                                    <Button
                                        onClick={handleManualCheck}
                                        disabled={checking || !order?.order_number || isPaid}
                                        variant="outline"
                                        className="w-full mt-3 h-10 text-sm"
                                    >
                                        {checking ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                                Đang kiểm tra...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                Kiểm tra ngay (tùy chọn)
                                            </>
                                        )}
                                    </Button>
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

