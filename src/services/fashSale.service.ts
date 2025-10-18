
import { apiClient } from '../lib/api-client';
import { FlashSaleResponse } from '../lib/api-client';

export class FlashSaleService {
  async getActiveFlashSale(): Promise<FlashSaleResponse> {
    return apiClient.get<FlashSaleResponse>('/flash-sales/active');
  }
} 
