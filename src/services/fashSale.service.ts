
import { apiClient } from '../lib/api-client';
import { FlashSaleResponse } from '../lib/api-client';

export class FlashSaleService {
  async getActiveFlashSale(
    minPrice?: number,
    maxPrice?: number,
    brandId?: number,
    sort?: string
  ): Promise<FlashSaleResponse> {
    // Build query params
    const params = new URLSearchParams();
    
    // Backend expects: priceMin, priceMax, brandId (lowercase)
    if (minPrice !== undefined) {
      params.append('minPrice', minPrice.toString());
    }
    if (maxPrice !== undefined) {
      params.append('maxPrice', maxPrice.toString());
    }
    if (brandId !== undefined) {
      params.append('brandId', brandId.toString());
    }
    if (sort) {
      // Map UI sort keys to backend format
      const sortMap: Record<string, string> = {
        'priceAsc': 'price_asc',
        'priceDesc': 'price_desc',
        'nameAsc': 'name_asc',
        'nameDesc': 'name_desc',
      };
      const backendSort = sortMap[sort] || sort;
      params.append('sort', backendSort);
    }

    const queryString = params.toString();
    const url = queryString ? `/flash-sales/active?${queryString}` : '/flash-sales/active';
    
    console.log('🔍 Flash Sale API Call:', url); // Debug log
    
    return apiClient.get<FlashSaleResponse>(url);
  }
} 
export default FlashSaleService;

