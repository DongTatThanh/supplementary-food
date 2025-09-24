import { apiClient, ApiResponse } from '@/lib/api-client';

// Product Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  brand_id?: number;
  category_id?: number;
  short_description?: string;
  description?: string;
  ingredients?: string;
  usage_instructions?: string;
  warnings?: string;
  price: number;
  compare_price?: number;
  inventory_quantity: number;
  featured_image?: string;
  image_gallery?: string[];
  is_featured: boolean;
  is_new_arrival: boolean;
  is_bestseller: boolean;
  is_on_sale: boolean;
  status: 'draft' | 'active' | 'inactive' | 'out_of_stock';
  brand_name?: string;
  category_name?: string;
  avg_rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku?: string;
  variant_name: string;
  size?: string;
  flavor?: string;
  color?: string;
  price: number;
  compare_price?: number;
  inventory_quantity: number;
  weight?: number;
  weight_unit?: string;
  image_url?: string;
  is_default: boolean;
  is_active: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  country?: string;
  is_verified: boolean;
  is_featured: boolean;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: number;
  level: number;
  is_featured: boolean;
  is_active: boolean;
  children?: Category[];
}

export interface ProductFilters {
  category_id?: number;
  brand_id?: number;
  min_price?: number;
  max_price?: number;
  search?: string;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_bestseller?: boolean;
  is_on_sale?: boolean;
  status?: string;
  sort_by?: 'name' | 'price' | 'created_at' | 'rating';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
}

export interface ProductListResponse {
  products: Product[];
  meta: PaginationMeta;
}

// Product Service
export class ProductService {
  // Get all products with filters and pagination
  static async getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const endpoint = `/api/products?${queryParams.toString()}`;
      console.log('ProductService.getProducts - Request URL:', endpoint);
      const response = await apiClient.get<ApiResponse<ProductListResponse>>(endpoint);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Get products error:', error);
      throw error;
    }
  }

  // Get featured products
  static async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ 
        is_featured: true, 
        status: 'active',
        limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      return response.products;
    } catch (error) {
      console.error('Get featured products error:', error);
      throw error;
    }
  }

  // Get product by ID or slug
  static async getProduct(identifier: string | number): Promise<Product> {
    try {
      const endpoint = `/api/products/${identifier}`;
      console.log('ProductService.getProduct - Request URL:', endpoint);
      const response = await apiClient.get<ApiResponse<Product>>(endpoint);

      if (response.success && response.data) {
        console.log('ProductService.getProduct - Response:', response.data);
        return response.data;
      } else {
        throw new Error(response.message || 'Product not found');
      }
    } catch (error) {
      console.error('Get product error:', error);
      throw error;
    }
  }

  // Get product variants
  static async getProductVariants(productId: number): Promise<ProductVariant[]> {
    try {
      const endpoint = `/products/${productId}/variants`;
      const response = await apiClient.get<ApiResponse<ProductVariant[]>>(endpoint);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch variants');
      }
    } catch (error) {
      console.error('Get product variants error:', error);
      throw error;
    }
  }

  // Search products
  static async searchProducts(query: string, filters: Omit<ProductFilters, 'search'> = {}): Promise<ProductListResponse> {
    try {
      return await this.getProducts({ ...filters, search: query });
    } catch (error) {
      console.error('Search products error:', error);
      throw error;
    }
  }

  // Get all brands
  static async getBrands(): Promise<Brand[]> {
    try {
      const response = await apiClient.get<ApiResponse<Brand[]>>('/brands');

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch brands');
      }
    } catch (error) {
      console.error('Get brands error:', error);
      throw error;
    }
  }

  // Get all categories
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>('/categories');

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  }

  // Get products by category
  static async getProductsByCategory(categoryId: number, filters: Omit<ProductFilters, 'category_id'> = {}): Promise<ProductListResponse> {
    try {
      return await this.getProducts({ ...filters, category_id: categoryId });
    } catch (error) {
      console.error('Get products by category error:', error);
      throw error;
    }
  }

  // Get products by brand
  static async getProductsByBrand(brandId: number, filters: Omit<ProductFilters, 'brand_id'> = {}): Promise<ProductListResponse> {
    try {
      return await this.getProducts({ ...filters, brand_id: brandId });
    } catch (error) {
      console.error('Get products by brand error:', error);
      throw error;
    }
  }

  // Get new arrivals
  static async getNewArrivals(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ 
        is_new_arrival: true, 
        status: 'active',
        limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      return response.products;
    } catch (error) {
      console.error('Get new arrivals error:', error);
      throw error;
    }
  }

  // Get bestsellers
  static async getBestsellers(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ 
        is_bestseller: true, 
        status: 'active',
        limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      return response.products;
    } catch (error) {
      console.error('Get bestsellers error:', error);
      throw error;
    }
  }

  // Get sale products
  static async getSaleProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await this.getProducts({ 
        is_on_sale: true, 
        status: 'active',
        limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      });
      return response.products;
    } catch (error) {
      console.error('Get sale products error:', error);
      throw error;
    }
  }
}