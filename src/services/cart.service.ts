import { apiClient, Brand, Product } from "@/lib/api-client";

// Types matching backend API response
export interface CartProduct extends Product {
    brand: Brand;
}

export interface CartItem {
    id: number;
    cart_id: number;
    product: CartProduct;
    quantity: number;
    price: string;
    added_at: string;
    updated_at: string;
}

export interface Cart {
    id: number;
    user_id: number;
    session_id: string | null;
    created_at: string;
    updated_at: string;
    items: CartItem[];
}

interface AddToCartPayload {
    product_id: number;
    quantity: number;
    variant?: number;
}

interface AddToCartResponse {
    items: any[];
    total: number;
    itemCount: number;
}

export class CartService {

    // Lấy giỏ hàng của người dùng 
    async getUserCart(): Promise<Cart | null> {
        try {
            // Backend returns array with single cart object
            const response = await apiClient.get<Cart[]>('/cart');
            
            if (response && Array.isArray(response) && response.length > 0) {
                return response[0];
            }
            
            return null;
        } catch (error) {
            console.error('lỗi tải data giỏ hàng ', error);
            return null;
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    async addToCart(productId: number, quantity: number = 1, variant?: number): Promise<{ success: boolean; message: string; data?: AddToCartResponse }> {
        try {
            const payload: AddToCartPayload = {
                product_id: productId,
                quantity: quantity
            };

            if (variant) {
                payload.variant = variant;
            }

            const response = await apiClient.post<AddToCartResponse>('/cart/items', payload);

            return {
                success: true,
                message: 'Đã thêm sản phẩm vào giỏ hàng',
                data: response
            };
        } catch (error: any) {
            console.error('Lỗi thêm vào giỏ hàng:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể thêm vào giỏ hàng'
            };
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    async updateCartItem(itemId: number, quantity: number): Promise<{ success: boolean; message: string }> {
        try {
            // Backend uses POST for update, not PUT
            await apiClient.post(`/cart/items/${itemId}`, { quantity });
            return {
                success: true,
                message: 'Đã cập nhật số lượng'
            };
        } catch (error: any) {
            console.error('Lỗi cập nhật giỏ hàng:', error);
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
            console.error('Lỗi xóa khỏi giỏ hàng:', error);
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
            console.error('Lỗi xóa giỏ hàng:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể xóa giỏ hàng'
            };
        }
    }

}