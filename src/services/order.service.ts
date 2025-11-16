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
            const response = await apiClient.post<Order>('/api/orders', orderData);
            return {
                success: true,
                message: 'Đã tạo đơn hàng thành công',
                data: response
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể tạo đơn hàng'
            };
        }
    }

    // Lấy danh sách đơn hàng
    async getUserOrders(status?: OrderStatus): Promise<Order[]> {
        try {
            const endpoint = status ? `/api/orders?status=${status}` : '/api/orders';
            const response = await apiClient.get<Order[]>(endpoint);
            return response || [];
        } catch (error) {
            return [];
        }
    }

    // Lấy chi tiết đơn hàng theo ID
    async getOrderById(orderId: number): Promise<Order | null> {
        try {
            const response = await apiClient.get<Order>(`/api/orders/${orderId}`);
            return response;
        } catch (error) {
            return null;
        }
    }

    // Lấy đơn hàng theo order_number
    async getOrderByNumber(orderNumber: string): Promise<Order | null> {
        try {
            const response = await apiClient.get<Order>(`/api/orders/number/${orderNumber}`);
            return response;
        } catch (error) {
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