import { ApiClient, PaymentInfo, TransactionStatus } from "@/lib/api-client";
import { apiClient } from "@/lib/api-client";

export class PaymentService {          

    // Tạo thông tin thanh toán (QR code)
    async createPaymentInfo(orderId: number): Promise<{ success: boolean; data?: PaymentInfo; message?: string }> {
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
    async checkTransactionStatus(orderNumber: string): Promise<TransactionStatus> {
        try { 
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

    // Lấy danh sách transactions gần đây (để debug/test)
    async getRecentTransactions(): Promise<{ success: boolean; count: number; transactions: any[] }> {
        try {
            const response = await apiClient.get<any>('/payment/transactions');
            return response;
        } catch (error: any) {
            console.error('Lỗi lấy danh sách giao dịch:', error);
            return {
                success: false,
                count: 0,
                transactions: []
            };
        }
    }

    // Manual confirm payment (chỉ dùng cho testing)
    async manualConfirmPayment(orderNumber: string, transactionId?: string): Promise<TransactionStatus> {
        try {
            const response = await apiClient.post<TransactionStatus>('/payment/manual-confirm', {
                orderNumber,
                transactionId: transactionId || `MANUAL_${Date.now()}`
            });
            return response;
        } catch (error: any) {
            console.error('Lỗi xác nhận thanh toán thủ công:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể xác nhận thanh toán thủ công'
            };
        }
    }
}

export default PaymentService;