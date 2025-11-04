import { cart, Brand } from './../lib/api-client';
import { apiClient, Product, ProductsResponse } from '@/lib/api-client';

export class PriceRangesService
 {

    // sắp xếp sản phẩm theo khoảng giá trong một danh mục
    
    async getProductsByCategory(
      categoryId: string,
      minPrice?: number,
      maxPrice?: number,
      brandId?: number,
      sort?: string,
      page?: number,
      limit?: number
    ): Promise<Product[]> 
    {
        try 
        {
            let endpoint = `/products/${categoryId}/products`;
            const params: string[] = [];
            
            // Backend expects: priceMin, priceMax, brandId (lowercase)
            if (minPrice != null) params.push(`minPrice=${encodeURIComponent(String(minPrice))}`);
            if (maxPrice != null) params.push(`maxPrice=${encodeURIComponent(String(maxPrice))}`);
            if (brandId != null) params.push(`brandId=${encodeURIComponent(String(brandId))}`);
           
            const sortMap: Record<string, string> = 
            {
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

         
            if (Array.isArray(response)) return response as Product[];
            if (response?.products && Array.isArray(response.products)) return response.products as Product[];
            if (response?.data && Array.isArray(response.data)) return response.data as Product[];
            if (response?.data?.data && Array.isArray(response.data.data)) return response.data.data as Product[];

            return [];
        } catch (error) {
            console.error('lỗi tải data:', error);
            return [];
        }
    }

 
    

      
 
}




export default PriceRangesService;
