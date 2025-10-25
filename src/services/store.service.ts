
import { apiClient, Store } from "@/lib/api-client";




export class StoreService {
  async getStoreAll(): Promise<Store[]>
   {
    return apiClient.get<Store[]>('/stores');
  } 
  
}
export default StoreService;