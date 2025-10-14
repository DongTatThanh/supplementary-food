import { useEffect, useState } from 'react';
import { DiscountCode } from '@/lib/api-client';
import { DiscountCodeService } from '@/services/discountCode.service';
import DiscountCodeCard from './DiscountCodeCard';
import { Sparkles } from 'lucide-react';

const discountCodeService = new DiscountCodeService();

const DiscountCodeList = () => {
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        setLoading(true);
        const response = await discountCodeService.getActiveCodes();
        setDiscountCodes(response);
        setError(null);
      } catch (err: any) {
        console.error('Error:', err);
        setError(err.message || 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountCodes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải mã giảm giá...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex justify-center items-center">
        <div className="text-center p-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 inline-block shadow-lg">
            <div className="text-6xl mb-4">😞</div>
            <p className="text-red-600 font-semibold text-lg mb-2">Oops! Có lỗi xảy ra</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (discountCodes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex justify-center items-center">
        <div className="text-center p-8">
          <div className="text-8xl mb-4">🎫</div>
          <p className="text-gray-600 text-xl font-medium">Hiện chưa có mã giảm giá nào</p>
          <p className="text-gray-400 text-sm mt-2">Vui lòng quay lại sau</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4">
          
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            Mã Giảm Giá <span className="text-red-600">Hot</span> Nhất
          </h1>
          <p className="text-gray-600 text-lg">
            Tiết kiệm ngay với các mã giảm giá hấp dẫn! 🔥
          </p>
          <div className="mt-4">
            <span className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm">
              {discountCodes.length} mã đang có
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {discountCodes.map((discount) => (
            <DiscountCodeCard key={discount.id} discount={discount} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Áp dụng mã ngay!</h3>
            <p className="text-red-100 mb-4">
              Nhập mã giảm giá khi thanh toán để nhận ưu đãi
            </p>
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors">
              Mua sắm ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeList;
