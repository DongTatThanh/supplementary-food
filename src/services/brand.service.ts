import { apiClient, Brand } from "@/lib/api-client";


export class BrandService {
  async getFeaturedBrands(): Promise<Brand[]> {
    return apiClient.get<Brand[]>('/brands/featured');
  }
}

export default BrandService;  






