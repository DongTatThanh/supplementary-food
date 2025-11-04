import { apiClient, Brand } from "@/lib/api-client";


export class BrandService {


  // lấy brands nổi bật
  async getFeaturedBrands(): Promise<Brand[]> {
    return apiClient.get<Brand[]>('/brands/featured');
  }

  async getAllBrands(): Promise<Brand[]> {
    return apiClient.get<Brand[]>('/brands');
  }
}

export default BrandService;  






