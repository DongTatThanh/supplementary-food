import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

/**
 * Component xử lý khi token hết hạn (401)
 * Lắng nghe event 'auth:expired' và hiển thị thông báo + redirect
 */
const AuthExpiredHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    useEffect(() => {
        const handleAuthExpired = (event: Event) => {
            const customEvent = event as CustomEvent<{ message: string }>;
            const message = customEvent.detail?.message || 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';

            // Hiển thị thông báo
            toast({
                title: "Phiên đăng nhập hết hạn",
                description: message,
                variant: "destructive",
                duration: 5000,
            });

            // Redirect về trang đăng nhập nếu không đang ở trang auth
            if (location.pathname !== '/auth') {
                // Lưu path hiện tại để redirect lại sau khi đăng nhập
                const returnUrl = location.pathname + location.search;
                navigate(`/auth?returnUrl=${encodeURIComponent(returnUrl)}`, { replace: true });
            }
        };

        // Lắng nghe event 'auth:expired'
        window.addEventListener('auth:expired', handleAuthExpired);

        // Cleanup
        return () => {
            window.removeEventListener('auth:expired', handleAuthExpired);
        };
    }, [navigate, location, toast]);

    // Component này không render gì
    return null;
};

export default AuthExpiredHandler;

