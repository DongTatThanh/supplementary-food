import { DiscountCodeResponse } from './../lib/api-client';
import { apiClient, ApiResponse, DiscountCode } from '../lib/api-client';

export class DiscountCodeService {
   // lấy danh sách mã giảm giá active 
   async getActiveCodes(): Promise<DiscountCode[]> {
      return apiClient.get<DiscountCode[]>('/discount-codes/active');
   }

   async getActiveDiscountCodes(): Promise<DiscountCode[]> {
      return apiClient.get<DiscountCode[]>('/discount-codes/active');
   }
}
