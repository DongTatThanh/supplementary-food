import { cart } from './../lib/api-client';
import { apiClient, Product, ProductsResponse } from '@/lib/api-client';

export class PriceRangesService {

    // sắp xếp sản phẩm theo khoảng giá trong một danh mục
    
    async getProductsByCategory(
      categoryId: string,
      minPrice?: number,
      maxPrice?: number,
      brandId?: number,
      sort?: string,
      page?: number,
      limit?: number
    ): Promise<Product[]> {
        try 
        {
            let endpoint = `/products/${categoryId}/products`;
            const params: string[] = [];
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

            if (params.length) endpoint += `?${params.join('&')}`;

            const response = await apiClient.get<any>(endpoint);
            
            return response.data || [];
        } catch (error) {
            console.error('lỗi tải data:', error);
            return [];
        }
    }

 
    

      
 
}




export default PriceRangesService;
