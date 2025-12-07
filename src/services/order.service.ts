import { apiClient } from '@/lib/api-client';
import { Order } from '@/lib/api-client';

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
    RETURNED = 'returned'
}

export interface CreateOrderDto {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_district: string;
    shipping_ward: string;
    notes?: string;
    discount_code?: string;
}
export class OrderService {
    // Tạo đơn hàng mới
    async createOrder(orderData: CreateOrderDto): Promise<{ success: boolean; message: string; data?: Order }> {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (!token) {
                return {
                    success: false,
                    message: 'Bạn cần đăng nhập để tạo đơn hàng'
                };
            }

            const response = await apiClient.post<Order>('/api/orders', orderData);
            
            // Xử lý response có thể là object với data property
            let orderResult: Order | undefined;
            if (response && typeof response === 'object') {
                if ('data' in response) {
                    orderResult = (response as any).data;
                } else {
                    orderResult = response as Order;
                }
            }
            
            return {
                success: true,
                message: 'Đã tạo đơn hàng thành công',
                data: orderResult
            };
        } catch (error: any) {
            let errorMessage = 'Không thể tạo đơn hàng';
            if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
                errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
            } else if (error.message?.includes('404') || error.message?.includes('Not Found')) {
                errorMessage = 'Endpoint tạo đơn hàng không tồn tại. Vui lòng liên hệ hỗ trợ.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            return {
                success: false,
                message: errorMessage
            };
        }
    }

    // Lấy danh sách đơn hàng
    async getUserOrders(status?: OrderStatus): Promise<Order[]> {
        try {
            // Kiểm tra token trước khi gọi API
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (!token) {
                return [];
            }

            const endpoint = status ? `/api/orders?status=${status}` : '/api/orders';
            const response = await apiClient.get<Order[]>(endpoint);
            
            // Xử lý response có thể là object với data property hoặc array trực tiếp
            if (Array.isArray(response)) {
                return response;
            }   
            if (response && typeof response === 'object' && 'data' in response) {
                return Array.isArray((response as any).data) ? (response as any).data : [];
            }
            
            return [];
        } catch (error: any) {
            // Xử lý các loại lỗi khác nhau
            if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
                // Token đã được clear bởi api-client khi 401
                return [];
            }
            
            if (error.message?.includes('404') || error.message?.includes('Not Found')) {
                // Thử dùng endpoint recent orders như fallback
                try {
                    return await this.getRecentOrders(10);
                } catch (fallbackError) {
                    // Ignore fallback error
                }
            }
            
            return [];
        }
    }

    // Lấy đơn hàng gần đây (fallback method)
    async getRecentOrders(limit: number = 10): Promise<Order[]> {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (!token) {
                return [];
            }

            const response = await apiClient.get<Order[]>(`/api/orders/recent?limit=${limit}`);
            
            if (Array.isArray(response)) {
                return response;
            }
            if (response && typeof response === 'object' && 'data' in response) {
                return Array.isArray((response as any).data) ? (response as any).data : [];
            }
            
            return [];
        } catch (error: any) {
            return [];
        }
    }

    // Lấy chi tiết đơn hàng theo ID
    async getOrderById(orderId: number): Promise<Order | null> {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (!token) {
                return null;
            }

            const response = await apiClient.get<Order>(`/api/orders/${orderId}`);
            
            // Xử lý response có thể là object với data property
            if (response && typeof response === 'object') {
                if ('data' in response) {
                    return (response as any).data;
                }
                return response as Order;
            }
            
            return null;
        } catch (error: any) {
            return null;
        }
    }

    // Lấy đơn hàng theo order_number
    async getOrderByNumber(orderNumber: string): Promise<Order | null> {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
            if (!token) {
                return null;
            }

            const response = await apiClient.get<Order>(`/api/orders/number/${orderNumber}`);
            
            // Xử lý response có thể là object với data property
            if (response && typeof response === 'object') {
                if ('data' in response) {
                    return (response as any).data;
                }
                return response as Order;
            }
            
            return null;
        } catch (error: any) {
            return null;
        }
    }

    // Hủy đơn hàng
    async cancelOrder(orderId: number, reason?: string): Promise<void> {
        try {
            // Thử dùng POST thay vì PATCH để tránh lỗi CORS
            // Nếu backend không hỗ trợ POST, có thể thử PUT
            await apiClient.post(`/api/orders/${orderId}/cancel`, { reason });
        } catch (error: any) {
            // Kiểm tra nếu là lỗi CORS, thử dùng PUT
            if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
                try {
                    await apiClient.put(`/api/orders/${orderId}/cancel`, { reason });
                } catch (putError: any) {
                    throw new Error(putError.response?.data?.message || 'Không thể hủy đơn hàng. Vui lòng liên hệ hỗ trợ.');
                }
            } else {
                throw new Error(error.response?.data?.message || error.message || 'Không thể hủy đơn hàng. Vui lòng thử lại sau.');
            }
        }
    }
}

export default new OrderService();