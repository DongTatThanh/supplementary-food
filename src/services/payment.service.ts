import { ApiClient, PaymentInfo, TransactionStatus } from "@/lib/api-client";
import { apiClient } from "@/lib/api-client";

export  class PaymentService {          

    // Tạo thông tin thanh toán (QR code)
    async createPaymentInfo(orderId: number)
    : Promise<{ success: boolean; data?: PaymentInfo; message?: string }>
     {
        try {
            const response = await apiClient.post<PaymentInfo>('/payment/info', { orderId }); 
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

    // Kiểm tra trạng thái thanh toán
    async checkTransactionStatus(orderNumber: string)
    : Promise<TransactionStatus> 
    {
        try{ 
            const response = await apiClient.get<TransactionStatus>(`/payment/check/${orderNumber}`);
            return response;
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