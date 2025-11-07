import { apiClient, CartResponse, cart } from "@/lib/api-client";

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
    async getUserCart(userId: number): Promise<cart[]> {
        try {
            const response = await apiClient.get<CartResponse>(`/cart/user/${userId}`);
            return response.data || [];
        } catch (error) {
            console.error('lỗi tải data giỏ hàng ', error);
            return [];
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
            await apiClient.put(`/cart/items/${itemId}`, { quantity });
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