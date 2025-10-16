import { apiClient, Product } from "@/lib/api-client";
import { promises } from "dns";



export class ProductsService {



    // lấy các sản phẩm đang giảm giá 
    async getOnSaleProducts(): Promise<Product[]> 
    {
        return apiClient.get<Product[]>('/products/on-sale');
    }
}