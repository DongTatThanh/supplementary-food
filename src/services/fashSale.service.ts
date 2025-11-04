
  import { apiClient, FlashSaleResponse } from '@/lib/api-client';
  import { error } from 'console';

  export class FlashSaleService {
    // Lấy Flash Sale đang active với filters
    async getActiveFlashSale(
      minPrice?: number,
      maxPrice?: number,
      brandId?: number,
      sort?: string,
      page?: number,
      limit?: number
    ): Promise<FlashSaleResponse> {
      try {
        let endpoint = `/flash-sales/active/filtered`;
        const params: string[] = [];
        
        // Backend expects: minPrice, maxPrice, brandId
        if (minPrice != null) params.push(`minPrice=${encodeURIComponent(String(minPrice))}`);
        if (maxPrice != null) params.push(`maxPrice=${encodeURIComponent(String(maxPrice))}`);
        if (brandId != null) params.push(`brandId=${encodeURIComponent(String(brandId))}`);
      
        const sortMap: Record<string, string> = {
          priceAsc: 'price_asc',
          priceDesc: 'price_desc',
          nameAsc: 'name_asc',
          nameDesc: 'name_desc',
        };
        if (sort) params.push(`sort=${encodeURIComponent(sortMap[sort] ?? sort)}`);

        if (page != null) params.push(`page=${encodeURIComponent(String(page))}`);
        if (limit != null) params.push(`limit=${encodeURIComponent(String(limit))}`);

        // Append query params to endpoint
        if (params.length) endpoint += `?${params.join('&')}`;

        const response = await apiClient.get<FlashSaleResponse>(endpoint);
        return response;
      } catch 
      {
        
        // Return empty FlashSaleResponse structure
        return {
          success: false,
          data: null,
          message: 'Lỗi tải dữ liệu Flash Sale'
        };
      }
    }
  }

  export default FlashSaleService;




