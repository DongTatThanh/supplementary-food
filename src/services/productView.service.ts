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
    private readonly STORAGE_KEY = 'recently_viewed_products';
    private readonly MAX_ITEMS = 20;

    // Lưu vào localStorage cho anonymous users
    private saveToLocalStorage(productId: number): void {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            let viewedIds: number[] = stored ? JSON.parse(stored) : [];
            
            // Xóa productId cũ nếu đã tồn tại
            viewedIds = viewedIds.filter(id => id !== productId);
            
            // Thêm vào đầu mảng
            viewedIds.unshift(productId);
            
            // Giới hạn số lượng
            if (viewedIds.length > this.MAX_ITEMS) {
                viewedIds = viewedIds.slice(0, this.MAX_ITEMS);
            }
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(viewedIds));
        } catch (error) {
            // Silent fail
        }
    }

    // Lấy từ localStorage
    private getFromLocalStorage(): number[] {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    }

    // Ghi nhận user đã xem sản phẩm
    async trackProductView(productId: number): Promise<boolean> {
        try {
            const payload = { productId: Number(productId) };
            
            const response = await apiClient.post<{ success: boolean; message: string; data?: any }>(
                '/product-views', 
                payload
            );
            
            // Lưu vào localStorage để hiển thị ngay lập tức
            this.saveToLocalStorage(productId);
            
            return response.success;
        } catch (error: any) {
            // Vẫn lưu vào localStorage nếu API fail
            this.saveToLocalStorage(productId);
            
            return false;
        }
    }

    // Lấy danh sách sản phẩm đã xem
    async getUserViewHistory(limit: number = 20): Promise<ProductView[]> {
        try {
            // Lấy danh sách product IDs từ localStorage
            const viewedIds = this.getFromLocalStorage().slice(0, limit);
            
            if (viewedIds.length === 0) {
                return [];
            }
            
            // Fetch thông tin chi tiết của từng sản phẩm
            const products = await Promise.all(
                viewedIds.map(async (productId) => {
                    try {
                        const product = await apiClient.get<any>(`/products/${productId}`);
                        return {
                            id: productId,
                            user_id: 0,
                            product_id: productId,
                            viewed_at: new Date().toISOString(),
                            product: product
                        } as ProductView;
                    } catch (error) {
                        return null;
                    }
                })
            );
            
            // Filter out null values
            const validProducts = products.filter((p): p is ProductView => p !== null);
            
            return validProducts;
            
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
