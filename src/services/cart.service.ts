import { apiClient, ApiResponse } from '@/lib/api-client';
import { AuthService } from './auth.service';

// Cart Types
export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price: number;
  product_name: string;
  variant_name?: string;
  product_image?: string;
  added_at: string;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  total_items: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface AddToCartData {
  product_id: number;
  variant_id?: number;
  quantity: number;
}

export interface UpdateCartItemData {
  quantity: number;
}

// Cart Service
export class CartService {
  // Get current user's cart
  static async getCart(): Promise<Cart> {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await apiClient.get<ApiResponse<Cart>>('/cart', {
        'Authorization': `Bearer ${token}`
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch cart');
      }
    } catch (error) {
      console.error('Get cart error:', error);
      throw error;
    }
  }

  // Add item to cart
  static async addToCart(data: AddToCartData): Promise<Cart> {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await apiClient.post<ApiResponse<Cart>>('/cart/items', data, {
        'Authorization': `Bearer ${token}`
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  }

  // Update cart item quantity
  static async updateCartItem(itemId: number, data: UpdateCartItemData): Promise<Cart> {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await apiClient.put<ApiResponse<Cart>>(`/cart/items/${itemId}`, data, {
        'Authorization': `Bearer ${token}`
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update cart item');
      }
    } catch (error) {
      console.error('Update cart item error:', error);
      throw error;
    }
  }

  // Remove item from cart
  static async removeFromCart(itemId: number): Promise<Cart> {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await apiClient.delete<ApiResponse<Cart>>(`/cart/items/${itemId}`, {
        'Authorization': `Bearer ${token}`
      });

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      throw error;
    }
  }

  // Clear entire cart
  static async clearCart(): Promise<void> {
    try {
      const token = AuthService.getToken();
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await apiClient.delete<ApiResponse<void>>('/cart', {
        'Authorization': `Bearer ${token}`
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    }
  }

  // Get cart item count
  static async getCartItemCount(): Promise<number> {
    try {
      const cart = await this.getCart();
      return cart.total_items;
    } catch (error) {
      console.error('Get cart item count error:', error);
      return 0;
    }
  }
}