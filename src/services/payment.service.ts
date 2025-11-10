import { ApiClient, PaymentInfo } from "@/lib/api-client";
import { apiClient } from "@/lib/api-client";

export  class PaymentService {          

    // tạo thông tin thanh toán qr 


    async createPaymentInfo(orderId: number)
    : Promise<{ success: boolean; data?: PaymentInfo; message?: string }>
     {
        try {
            const response = await apiClient.post<PaymentInfo>(`/payments/${orderId}/create-info`); 
            return {
                success: true,
                data: response
            };
        } catch (error: any) {
            console.error('Lỗi tạo thông tin thanh toán:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể tạo thông tin thanh toán'
            };
        }
    }
    // KIỂM TRA TRẠNG THÁI THANH TOÁN 

    async checkTransactionStatus(orderId: number)
    : Promise<{ success: boolean; data?: { paid: boolean }; message?: string }> 
    {
        try{ 
            const response = await apiClient.get<{ paid: boolean }>(`/payments/${orderId}/status`);
            return {
                success: true,
                data: response
            };
        } catch (error: any) {
            console.error('Lỗi kiểm tra trạng thái thanh toán:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể kiểm tra trạng thái thanh toán'
            };
        }
    }   

}
export default PaymentService;