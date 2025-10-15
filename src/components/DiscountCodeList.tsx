import { useEffect, useState } from 'react';
import { DiscountCode } from '@/lib/api-client';
import { DiscountCodeService } from '@/services/discountCode.service';
import DiscountCodeCard from './ui/DiscountCodeCard';
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
    <div className="bg-gray-50 py-2">
      <div className="container mx-auto px-4">
        <div className="mb-2">
          <h2 className="text-sm font-bold text-gray-800">
            Mã Giảm Giá
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {discountCodes.slice(0, 4).map((discount) => (
            <div key={discount.id} className="flex-shrink-0 w-72">
              <DiscountCodeCard discount={discount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeList;
