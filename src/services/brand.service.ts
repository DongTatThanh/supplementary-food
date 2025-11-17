import { apiClient, Brand, Product } from "@/lib/api-client";


export class BrandService {

  // lấy brands nổi bật
  async getFeaturedBrands(): Promise<Brand[]> {
    return apiClient.get<Brand[]>('/brands/featured');
  }

  async getAllBrands(): Promise<Brand[]> {
    return apiClient.get<Brand[]>('/brands');
  }

  async getBrandById(id: number): Promise<Brand> {
    return apiClient.get<Brand>(`/brands/${id}`);
  }

  async getBrandProducts(
    id: number,
    options?: {
      page?: number;
      limit?: number;
      status?: string;
      minPrice?: number;
      maxPrice?: number;
      sortBy?: string;
      sortOrder?: 'ASC' | 'DESC';
    }
  ): Promise<any> {
    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.status) params.append('status', options.status);
    if (options?.minPrice) params.append('minPrice', options.minPrice.toString());
    if (options?.maxPrice) params.append('maxPrice', options.maxPrice.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    if (options?.sortOrder) params.append('sortOrder', options.sortOrder);

    const queryString = params.toString();
    const endpoint = `/brands/${id}/products${queryString ? `?${queryString}` : ''}`;
    
    return apiClient.get<any>(endpoint);
  }
}

export default BrandService;  






