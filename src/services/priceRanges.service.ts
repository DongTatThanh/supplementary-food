import { apiClient, Product } from '@/lib/api-client';

export class PriceRangesService {

    // sắp xếp sản phẩm theo khoảng giá trong một danh mục
    
    async getProductsByCategory(categoryId: string, minPrice?: number, maxPrice?: number): Promise<Product[]>
     {
        try 
        {
            let endpoint = `/products/${categoryId}/products`;
            const params: string[] = [];
            if (minPrice != null) params.push(`minPrice=${encodeURIComponent(String(minPrice))}`);
            if (maxPrice != null) params.push(`maxPrice=${encodeURIComponent(String(maxPrice))}`);
            if (params.length) endpoint += `?${params.join('&')}`;  //params.join('&')} nối thẳng bằng &

            const response = await apiClient.get<any>(endpoint);

       
            if (response?.products && Array.isArray(response.products)) return response.products;
            if (Array.isArray(response)) return response;
            if (response?.data && Array.isArray(response.data)) return response.data;
            return [];
        } catch (error) {
            console.error('lỗi tải data:', error);
            return [];
        }
    }



  // Sắp xếp sản phẩm theo giá hoặc tên
  async sortProducts(sort?: string): Promise<Product[]> {
    try {
      // Map frontend sort keys to backend expected values if needed
      const map: Record<string, string> = {
        priceAsc: 'price_asc',
        priceDesc: 'price_desc',
        nameAsc: 'name_asc',
        nameDesc: 'name_desc',
      };

      const sortParam = sort ? (map[sort] ?? sort) : '';
      const response = await apiClient.get<any>(`/products?sort=${encodeURIComponent(String(sortParam || ''))}`);

      // Normalize possible response shapes: array, { data: [] }, { products: [] }
      if (Array.isArray(response)) return response as Product[];
      if (response?.data && Array.isArray(response.data)) return response.data as Product[];
      if (response?.products && Array.isArray(response.products)) return response.products as Product[];

      console.warn('Dữ liệu API không đúng định dạng (sortProducts):', response);
      return [];
    } catch (error) {
      console.error('Lỗi tải dữ liệu sản phẩm theo sắp xếp:', error);
      return [];
    }
  }
}



export default PriceRangesService;
