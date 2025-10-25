import { apiClient, Product } from '@/lib/api-client';

export class PriceRangesService {
    /**
     * Fetch products for a category (server-side filtered by min/max price when provided).
     * Endpoint format used: /products/{categoryId}/products?minPrice=...&maxPrice=...
     */
    async getProductsByCategory(categoryId: string, minPrice?: number, maxPrice?: number): Promise<Product[]> {
        try {
            let endpoint = `/products/${categoryId}/products`;
            const params: string[] = [];
            if (minPrice != null) params.push(`minPrice=${encodeURIComponent(String(minPrice))}`);
            if (maxPrice != null) params.push(`maxPrice=${encodeURIComponent(String(maxPrice))}`);
            if (params.length) endpoint += `?${params.join('&')}`;

            const response = await apiClient.get<any>(endpoint);

            // Normalize products list from response
            if (response?.products && Array.isArray(response.products)) return response.products;
            if (Array.isArray(response)) return response;
            if (response?.data && Array.isArray(response.data)) return response.data;
            return [];
        } catch (error) {
            console.error('lỗi tải data (getProductsByCategory):', error);
            return [];
        }
    }
}

export default PriceRangesService;
