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
    shipping_address: string;
    shipping_city: string;
    shipping_district: string;
    shipping_ward: string;
    phone: string;
    email?: string;
    notes?: string;
    payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
}
export class OrderService {
    // Tạo đơn hàng mới
    async createOrder(orderData: CreateOrderDto): Promise<{ success: boolean; message: string; data?: Order }> {
        try {
            const response = await apiClient.post<Order>('/orders', orderData);
            return {
                success: true,
                message: 'Đã tạo đơn hàng thành công',
                data: response
            };
        } catch (error: any) {
            console.error('Lỗi tạo đơn hàng:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể tạo đơn hàng'
            };
        }
    }

    // Lấy danh sách đơn hàng
    async getUserOrders(status?: OrderStatus): Promise<Order[]> {
        try {
            const endpoint = status ? `/orders?status=${status}` : '/orders';
            const response = await apiClient.get<Order[]>(endpoint);
            return response || [];
        } catch (error) {
            console.error('Lỗi tải đơn hàng:', error);
            return [];
        }
    }

    // Lấy chi tiết đơn hàng theo ID
    async getOrderById(orderId: number): Promise<Order | null> {
        try {
            const response = await apiClient.get<Order>(`/orders/${orderId}`);
            return response;
        } catch (error) {
            console.error('Lỗi tải đơn hàng:', error);
            return null;
        }
    }

    // Lấy đơn hàng theo order_number
    async getOrderByNumber(orderNumber: string): Promise<Order | null> {
        try {
            const response = await apiClient.get<Order>(`/orders/number/${orderNumber}`);
            return response;
        } catch (error) {
            console.error('Lỗi tải đơn hàng:', error);
            return null;
        }
    }
}

export default new OrderService();