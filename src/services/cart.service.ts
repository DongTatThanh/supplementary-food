import { apiClient, CartResponse, cart } from "@/lib/api-client";




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

}