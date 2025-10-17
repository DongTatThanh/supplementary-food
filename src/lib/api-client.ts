
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

  // DELETE request
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

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
  discount_percentage?: number;
  discount_amount?: number;
  min_order_value?: number;
  max_discount_amount?: number;
  start_date: string;
  end_date: string;
  usage_limit?: number;
  used_count?: number;
  is_active: boolean;
  description?: string;
  created_at?: string;
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



export { ApiClient };


