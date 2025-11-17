import { apiClient, Cart, CartItem, CartProduct } from '@/lib/api-client';

// Re-export types for convenience
export type { Cart, CartItem, CartProduct };

// Payload types for API requests
interface AddToCartPayload {
    product_id: number;
    quantity: number;
    variant?: number;
}

interface AddToCartResponse {
    success?: boolean;
    message?: string;
    data?: {
        items: any[];
        total: number;
        itemCount: number;
    };
}

export class CartService {

    // Lấy giỏ hàng của người dùng 
    async getUserCart(): Promise<Cart | null> {
        try {
            const response = await apiClient.get<any>('/cart');
            
            // Backend returns {success, message, data: {items, total, itemCount}}
            if (response && response.success && response.data) {
                const { items, total, itemCount } = response.data;
                
                return {
                    id: 0,
                    user_id: 0,
                    session_id: null,
                    created_at: '',
                    updated_at: '',
                    items: items || [],
                    total: total || 0,
                    itemCount: itemCount || 0
                } as Cart;
            }
            
            return null;
        } catch (error: any) {
            return null;
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    async addToCart(productId: number, quantity: number = 1, variant?: number): Promise<{ success: boolean; message: string; data?: any }> {
        try {
            const payload: AddToCartPayload = {
                product_id: productId,
                quantity: quantity
            };

            if (variant) {
                payload.variant = variant;
            }

            const response = await apiClient.post<any>('/cart/items', payload);

            // Backend returns {success, message, data: {...}}
            if (response && response.success) {
                return {
                    success: true,
                    message: response.message || 'Đã thêm sản phẩm vào giỏ hàng',
                    data: response.data
                };
            }

            return {
                success: false,
                message: response?.message || 'Không thể thêm vào giỏ hàng'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể thêm vào giỏ hàng'
            };
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    async updateCartItem(itemId: number, quantity: number): Promise<{ success: boolean; message: string }> {
        try {

            await apiClient.post(`/cart/items/${itemId}`, { quantity });
            return {
                success: true,
                message: 'Đã cập nhật số lượng'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể cập nhật'
            };
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    async removeFromCart(itemId: number): Promise<{ success: boolean; message: string }> {
        try {
            await apiClient.delete(`/cart/items/${itemId}`);
            return {
                success: true,
                message: 'Đã xóa sản phẩm khỏi giỏ hàng'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể xóa'
            };
        }
    }

    // Xóa toàn bộ giỏ hàng
    async clearCart(userId: number): Promise<{ success: boolean; message: string }> {
        try {
            await apiClient.delete(`/cart/user/${userId}`);
            return {
                success: true,
                message: 'Đã xóa toàn bộ giỏ hàng'
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể xóa giỏ hàng'
            };
        }
    }

}