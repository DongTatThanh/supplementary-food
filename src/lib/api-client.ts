import { OrderStatus } from "@/services/order.service";


// API Configuration với fallback values
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
                     import.meta.env.VITE_API_URL || 
                     'http://localhost:3201';

const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

// API Client với error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log('API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
      body: config.body
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  // POST request
  async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<T> {
    console.log('POST request data before stringify:', data);
    const bodyString = data ? JSON.stringify(data) : undefined;
    console.log('POST request body string:', bodyString);
    
    return this.request<T>(endpoint, {
      method: 'POST',
      body: bodyString,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}


// Helper function để tạo URL đầy đủ cho ảnh

export const getImageUrl = (imageUrl: string | null) => {
  if (!imageUrl) return '/placeholder.png';
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_BASE_URL}${imageUrl}`;
};

// Export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  email: string;
  username?: string;
  full_name?: string;
  phone?: string;
  customer_tier_id?: number;
  role_id?: number;
  created_at?: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
  access_token?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface DiscountCode{
  id: number;
  code: string;
  name?: string;
  type?: string;
  value?: string;
  discount_percentage?: number;
  discount_amount?: number;
  minimum_order_amount?: string;
  min_order_value?: number;
  maximum_discount_amount?: string;
  max_discount_amount?: number;
  start_date: string;
  end_date: string;
  usage_limit?: number;
  usage_limit_per_customer?: number;
  used_count?: number;
  is_active: number | boolean;
  description?: string;
  created_at?: string;
  updated_at?: string;
  image_url?: string; // Đổi từ image sang image_url để khớp với API
  applicable_to?: string;
  applicable_items?: any;
  created_by?: number;
}
export interface DiscountCodeResponse {
  success: boolean;
  data: DiscountCode[];  // Đổi từ DiscountCode thành DiscountCode[]
  message?: string;
}
export interface Product {
  id: number;
  name: string;
  slug?: string;
  sku?: string;
  description?: string;
  short_description?: string;
  price: string | number;
  compare_price?: string | number;
  sale_price?: string | number;
  discount_percentage?: number;
  cost_price?: string | number;
  image_url?: string;
  featured_image?: string;
  image_gallery?: string[] | any;
  inventory_quantity?: number;
  stock_quantity?: number;
  weight?: string;
  dimensions?: string;
  category_id?: number;
  brand_id?: number;
  is_featured?: number;
  is_new_arrival?: number;
  is_bestseller?: number;
  is_on_sale?: number;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  batch_number?: string;
  origin_country?: string;
  manufacturer?: string;
  ingredients?: string;
  usage_instructions?: string;
  warnings?: string;
  track_inventory?: number;
  low_stock_threshold?: number;
  expiry_date?: string;
  brand?: Brand;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  description: string;
  country: string;
  website: string | null;
  is_verified: number;
  is_featured: number;
  sort_order: number;
  is_active: number;
  created_at: string;
  updated_at: string;

}
export interface BrandsResponse {
  success: boolean;
  data: Brand[];
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  icon_class?: string;
  parent_id?: number | null;
  level?: number;
  sort_order?: number;
  is_featured?: number;
  is_active?: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
  products?: Product[];
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  message?: string;
}

export interface FlashSaleInfo {
  id: number;
  name: string;
  description?: string;
  start_time: string;
  end_time: string;
  time_remaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total_seconds: number;
  };
}

export interface FlashSaleProduct {
  id: number;
  name: string;
  slug: string;
  featured_image: string | null;
  price: string;
  brand?: Brand;
  category?: Category;
  flash_sale: {
    item_id: number;
    original_price: string;
    sale_price: string;
    discount_percent: number;
    max_quantity: number;
    sold_quantity: number;
    remaining: number;
  };
}

export interface FlashSaleResponse {
  success: boolean;
  data: {
    flashSale: FlashSaleInfo;
    products: FlashSaleProduct[];
  };
  message?: string;
}


export interface ProductVariant
{
  id: number;
  variant_name: string;
  size?: string;
  flavor?: string;
  price: string;
  compare_price?: string;
  inventory_quantity: number;
  is_default: number;
}

export interface ProductReviewResponse
 {
  success: boolean;
  data: ProductReview[];
  message?: string;
}

export interface ProductReview
 {
  id: number;
  user_id: number;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
  is_verified_purchase: number;
}

export interface ProductAttributeResponse
 {
  success: boolean;
  data: ProductAttribute[];
  message?: string;
}

export interface ProductAttribute
 {
  attribute_name: string;
  attribute_value: string;
  unit?: string;
}

export interface ProductListResponse 
{
  success: boolean;
  data: Product[];
  message?: string;
} 

export interface ProductDetailData 
{
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  price: string;
  compare_price?: string;
  featured_image: string;
  image_gallery?: string[];
  inventory_quantity: number;
  is_on_sale: number;
  is_bestseller?: number;
  manufacturer?: string;
  origin_country?: string;
  brand?: {
    name: string;
    logo_url: string;
  };
  category?: {
    name: string;
  };
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  attributes?: ProductAttribute[];
  ingredients?: string;
  usage_instructions?: string;
  warnings?: string;
}

export interface ProductDetailResponse 
{
  success: boolean;
  data: ProductDetailData;
  message?: string;
}
export interface Banner {
  id: number;
  name: string;
  image_url: string;
  link_url?: string;
  link_target?: string;  
  position: string;      
  sort_order?: number;
  start_date?: string;
  end_date?: string;
  is_active: number;     
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}
export interface BannersResponse {  
  success: boolean; 
  data: Banner[];
  message?: string;
}
export interface ProductByCategory {

  id: number; // ID danh mục
  name: string; // Tên danh mục
  slug?: string;
  description?: string;
  image_url?: string;
  parent_id?: number | null;
  is_active?: number;
  created_at?: string;
  updated_at?: string;

  // Danh sách sản phẩm thuộc danh mục này
  products: Product[];
}
export interface ProductsByCategoryResponse {
  success: boolean;
  data: ProductByCategory[];
  message?: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  hotline: string;
  support_phone: string;
  email: string;
  opening_hours: string;
  image: string;
  map_link: string;
  description: string;
  latitude: number;
  longitude: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  marquee_text?: string;
}
export interface StoresResponse {
  success: boolean;
  data: Store[];
  message?: string;
}

export interface PriceFilter{
    label: string;
  minPrice: number;
  maxPrice: number;
}

// Cart Types - matching backend API structure
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
export interface Order {
    id: number;
    order_number: string;
    user_id: number;
    total_amount: string;
    subtotal: string;
    discount_amount: string;
    
    discount_code?: string;
    shipping_fee?: string;
    status: OrderStatus;
    payment_method: 'cod' | 'bank_transfer' | 'momo' | 'vnpay';
    payment_status: string;
    shipping_address: string;
    created_at: string;
    items: OrderItem[];
}

export interface OrderItem {
    id: number;
    product: any;
    quantity: number;
    price: string;
    subtotal: string;
}
export interface PaymentInfo {
  orderId: number;
  orderNumber: string;
  bankInfo: {
    accountNumber: string;
    accountName: string;
    bankCode: string;
    bankName: string;
  };
  amount: number;
  content: string;
  qrCode: string;
  message: string;
  expireAt: string;
}

export interface TransactionStatus {
  success: boolean;
  message: string;
  order?: any;
}

export { ApiClient };




