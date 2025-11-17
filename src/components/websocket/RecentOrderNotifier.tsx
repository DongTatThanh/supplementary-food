import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToast } from '@/hooks/use-toast';
import { getImageUrl } from '@/lib/api-client';

// Sử dụng cùng API_BASE_URL như api-client
const WS_URL = import.meta.env.VITE_API_BASE_URL || 
               import.meta.env.VITE_API_URL || 
               'http://localhost:3201';

interface OrderNotification {
  product_name: string;
  product_image: string;
  message: string;
  time_ago: string;
  payment_status?: string;
  order_status?: string;
  status?: string;
}

function RecentOrderNotifier() {
  const { toast } = useToast();
  const socketRef = useRef<Socket | null>(null);

  const showNotification = (notification: OrderNotification) => {
    // Chỉ hiển thị notification khi thanh toán thành công
    const paymentStatus = notification.payment_status || notification.status;
    const orderStatus = notification.order_status;
    
    // Nếu có payment_status và nó là 'pending' hoặc 'unpaid' thì không hiển thị
    if (paymentStatus) {
      const unpaidStatuses = ['pending', 'unpaid', 'failed', 'cancelled'];
      const isUnpaid = unpaidStatuses.some(status => 
        paymentStatus.toLowerCase().includes(status)
      );
      
      if (isUnpaid) {
        // Chưa thanh toán hoặc thanh toán thất bại, không hiển thị notification
        return;
      }
    }
    
    // Nếu có order_status và là 'pending' thì không hiển thị
    if (orderStatus && orderStatus.toLowerCase() === 'pending') {
      return;
    }
    
    // Nếu có payment_status là 'pending' trong message hoặc data thì không hiển thị
    // Nhưng nếu không có payment_status, có thể backend chỉ gửi event sau khi thanh toán thành công
    // Nên sẽ hiển thị để đảm bảo notification vẫn hoạt động

    toast({
      title: 'Đơn hàng mới',
      description: (
        <div className="flex items-start gap-3 mt-2">
          {notification.product_image && (
            <img
              src={getImageUrl(notification.product_image)}
              alt={notification.product_name}
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900">
              {notification.product_name}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {notification.message}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {notification.time_ago}
            </p>
          </div>
        </div>
      ),
      duration: 5000,
    });
  };

  useEffect(() => {
    // Tạo socket connection nếu chưa có
    if (!socketRef.current) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      
      socketRef.current = io(WS_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        auth: token ? {
          token: token
        } : undefined,
      });
    }

    const socket = socketRef.current;
    
    // Cập nhật auth token nếu có thay đổi
    const updateAuth = () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token && socket.auth) {
        socket.auth = { token };
      }
    };
    
    // Lắng nghe sự thay đổi của token
    const handleStorageChange = () => {
      updateAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    updateAuth();

    // Event khi kết nối thành công
    const handleConnect = () => {
      // Đã kết nối
    };

    // Event khi mất kết nối
    const handleDisconnect = () => {
      // Đã ngắt kết nối, sẽ tự động reconnect
    };

    // Event khi có lỗi kết nối
    const handleConnectError = () => {
      // Lỗi kết nối, sẽ tự động thử lại
    };

    // Event khi backend gửi thông báo đơn hàng mới
    const handleNewOrder = (notification: OrderNotification) => {
      showNotification(notification);
    };

    // Event khi backend xác nhận kết nối
    const handleConnected = () => {
      // Backend xác nhận kết nối
    };

    // Event generic để catch các event khác có thể backend gửi
    const handleAnyEvent = (data: any) => {
      // Kiểm tra xem có phải là notification không
      if (data && typeof data === 'object' && (data.product_name || data.message)) {
        // Chỉ hiển thị nếu thanh toán thành công
        showNotification(data as OrderNotification);
      }
    };
    
    // Event khi thanh toán thành công (có thể backend gửi event riêng)
    // Các event này luôn hiển thị vì chúng chỉ được gửi khi thanh toán thành công
    const handlePaymentSuccess = (data: any) => {
      if (data && typeof data === 'object' && (data.product_name || data.message)) {
        // Luôn hiển thị vì đây là event chuyên biệt cho thanh toán thành công
        toast({
          title: 'Đơn hàng mới',
          description: (
            <div className="flex items-start gap-3 mt-2">
              {data.product_image && (
                <img
                  src={getImageUrl(data.product_image)}
                  alt={data.product_name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900">
                  {data.product_name}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {data.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {data.time_ago}
                </p>
              </div>
            </div>
          ),
          duration: 5000,
        });
      }
    };

    // Đăng ký các event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);
    socket.on('connected', handleConnected);
    
    // Chỉ listen event khi thanh toán thành công
    socket.on('payment:success', handlePaymentSuccess);
    socket.on('order:paid', handlePaymentSuccess);
    socket.on('order:completed', handlePaymentSuccess);
    
    // Event newOrder - sẽ được filter bởi showNotification
    socket.on('newOrder', handleNewOrder);
    socket.on('order:new', handleNewOrder);
    socket.on('notification', handleAnyEvent);
    socket.on('order_notification', handleAnyEvent);

    // Đảm bảo socket đã kết nối
    if (!socket.connected) {
      socket.connect();
    }

    // Cleanup khi component unmount
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
      socket.off('connected', handleConnected);
      socket.off('payment:success', handlePaymentSuccess);
      socket.off('order:paid', handlePaymentSuccess);
      socket.off('order:completed', handlePaymentSuccess);
      socket.off('newOrder', handleNewOrder);
      socket.off('order:new', handleNewOrder);
      socket.off('notification', handleAnyEvent);
      socket.off('order_notification', handleAnyEvent);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [toast]);

  // Cleanup socket khi component unmount hoàn toàn
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return null;
}

export default RecentOrderNotifier;