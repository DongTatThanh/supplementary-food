import { apiClient, Product } from '@/lib/api-client';

export class ProductsService {
  // Lấy sản phẩm đang khuyến mại
  async getOnSaleProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/on-sale');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error in getOnSaleProducts:', error);
      throw error;
    }
  }

  // Lấy tất cả sản phẩm
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      throw error;
    }
  }

  // Lấy sản phẩm theo category
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await apiClient.get<any>(`/categories/${categoryId}/products`);
      
      console.log('Raw API response:', response);
      
      // API trả về { id, name, products: [...] }
      if (response?.products && Array.isArray(response.products)) {
        console.log('Returning products:', response.products.length, 'items');
        return response.products;
      }
      
      // Fallback: Trường hợp response là { data: [...] }
      if (response?.data && Array.isArray(response.data)) {
        console.log('Returning response.data');
        return response.data;
      }
      
      // Fallback: Response là array trực tiếp
      if (Array.isArray(response)) {
        console.log('Returning response directly');
        return response;
      }
      
      console.warn('Unexpected response format:', response);
      return [];
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      return [];
    }
  }

  // Lấy sản phẩm nổi bật
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/featured');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error in getFeaturedProducts:', error);
      throw error;
    }
  }

  // Lấy sản phẩm mới về
  async getNewArrivalProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/new-arrivals');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error in getNewArrivalProducts:', error);
      throw error;
    }
  }

  // Lấy sản phẩm bán chạy
  async getBestsellerProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>('/products/bestsellers');
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error in getBestsellerProducts:', error);
      throw error;
    }
  }
}