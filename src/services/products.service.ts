

import { apiClient, Product, ProductByCategory, ProductsByCategoryResponse , } from '@/lib/api-client';
import { ProductDetailData } from '@/lib/api-client';




export class ProductsService {
  // Lấy sản phẩm đang khuyến mại
  async getOnSaleProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/on-sale');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      throw error;
    }
  }

  // Lấy tất cả sản phẩm
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      throw error;
    }
  }

  // Lấy sản phẩm theo category
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await apiClient.get<any>(`/categories/${categoryId}/products`);
      
      // API trả về { id, name, products: [...] }
      if (response?.products && Array.isArray(response.products)) {
        return response.products;
      }
      
    
      if (response?.data && Array.isArray(response.data)) {
        return response.data;
      }
      
      
      if (Array.isArray(response)) {
        return response;
      }
      
      return [];
    } catch (error) {
      return [];
    }
  }

  // Lấy sản phẩm nổi bật
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/featured');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      throw error;
    }
  }

  // Lấy sản phẩm mới về
  async getNewArrivalProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/new-arrivals');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      throw error;
    }
  }

  // Lấy sản phẩm bán chạy
  async getBestsellerProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/bestsellers');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      throw error;
    }
  }
 
  // Lấy chi tiết sản phẩm theo ID
  async getProductById(productId: number): Promise<ProductDetailData | null> {
    try {
      const response = await apiClient.get<ProductDetailData>(`/products/${productId}`);
      return response || null;
    } catch (error) {
      return null;
    } 
  }
  // lấy tất cả cac dnah mục category
   async getAllCategories(): Promise<any[] | null> {
    try {
       const response = await apiClient.get<any[]>('/categories');
        return response || null;
    } catch (error) {
      return null;
    } 
    }
    
    // lấy catogory theo id cùng với products
    async getCategoryByIdWithProducts(categoryId: number): Promise<Product[]> {
      try {
        const response = await apiClient.get<ProductByCategory>(`/categories/${categoryId}/products`);
        const data = response?.products || [];
         if(response?.products && Array.isArray(response.products)) {
           return response.products;
         }
      } catch (error) {
      }
      return [];
    }

    // Tìm kiếm sản phẩm với các bộ lọc
    async searchProducts(filter: {
      search?: string;
      brandId?: number;
      categoryId?: number;
      priceMin?: number;
      priceMax?: number;
      sort?: string;
      page: number;
      limit: number;
    }): Promise<{
      data: Product[];
      total: number;
      currentPage: number;
      totalPages: number;
    }> {
      try {
        // Xây dựng query parameters
        const params = new URLSearchParams();
        
        if (filter.search) {
          params.append('search', filter.search);
        }
        if (filter.brandId !== undefined) {
          params.append('brandId', filter.brandId.toString());
        }
        if (filter.categoryId !== undefined) {
          params.append('categoryId', filter.categoryId.toString());
        }
        if (filter.priceMin !== undefined) {
          params.append('minPrice', filter.priceMin.toString());
        }
        if (filter.priceMax !== undefined) {
          params.append('maxPrice', filter.priceMax.toString());
        }
        if (filter.sort) {
          params.append('sort', filter.sort);
        }
        params.append('page', filter.page.toString());
        params.append('limit', filter.limit.toString());

        const queryString = params.toString();
        const response = await apiClient.get<{
          data: Product[];
          total: number;
          currentPage: number;
          totalPages: number;
        }>(`/products?${queryString}`);

        // Xử lý response - có thể là object trực tiếp hoặc wrapped trong data
        if (response.data && Array.isArray(response.data)) {
          return {
            data: response.data,
            total: response.total || response.data.length,
            currentPage: response.currentPage || filter.page,
            totalPages: response.totalPages || Math.ceil((response.total || response.data.length) / filter.limit),
          };
        }

        // Nếu response là array (trường hợp không có filter)
        if (Array.isArray(response)) {
          return {
            data: response,
            total: response.length,
            currentPage: filter.page,
            totalPages: Math.ceil(response.length / filter.limit),
          };
        }

        // Fallback
        return {
          data: [],
          total: 0,
          currentPage: filter.page,
          totalPages: 0,
        };
      } catch (error) {
        console.error('Error searching products:', error);
        return {
          data: [],
          total: 0,
          currentPage: filter.page,
          totalPages: 0,
        };
      }
    }
  } 
export default ProductsService;