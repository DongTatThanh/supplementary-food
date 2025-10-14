import { DiscountCodeResponse } from './../lib/api-client';
import { apiClient, ApiResponse, DiscountCode } from '../lib/api-client';

export class DiscountCodeService {
   // lấy danh sách mã giảm giá active 
   async getActiveCodes(): Promise<DiscountCode[]> {
      // Backend trả về array trực tiếp, không có wrapper
      return apiClient.get<DiscountCode[]>('/discount-codes/active');
   }
   
   async validateCode(code: string): Promise<ApiResponse<DiscountCode>> {
      return apiClient.get<ApiResponse<DiscountCode>>(`/discount-codes/validate/${code}`);
   }
}
