import { apiClient } from '@/lib/api-client';
import { Product } from '@/lib/api-client';

export interface ProductView {
    id: number;
    user_id: number;
    product_id: number;
    viewed_at: string;
    ip_address?: string;
    user_agent?: string;
    product?: Product;
}

export class ProductViewService {
    // Ghi nhận user đã xem sản phẩm
    async trackProductView(productId: number): Promise<void> {
        try {
            await apiClient.post('/product-views', { product_id: productId });
        } catch (error) {
            // Không throw error để không ảnh hưởng UX
        }
    }

    // Lấy danh sách sản phẩm đã xem
    async getUserViewHistory(limit: number = 20): Promise<ProductView[]> {
        try {
            const response = await apiClient.get<{ success: boolean; data: ProductView[] }>(
                `/product-views/history?limit=${limit}`
            );
            return response.data || [];
        } catch (error) {
            return [];
        }
    }

    // Xóa lịch sử xem
    async clearViewHistory(): Promise<void> {
        try {
            await apiClient.delete('/product-views');
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductViewService();
