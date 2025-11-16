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
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };

      fetchDiscountCodes();
    }, []);

    if (discountCodes.length === 0) {
      return (
        <div className="py-10 text-center bg-gradient-to-br from-rose-50 via-white to-orange-50">
          <p className="text-gray-600 font-medium">Hiện chưa có mã giảm giá nào</p>
          <p className="text-gray-400 text-sm mt-1">Vui lòng quay lại sau nhé 💬</p>
        </div>
      );
    }

    return (
      <section className="py-6 bg-gradient-to-r via-white to-orange-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
          
          </div>

          {/* Grid full width - Chỉ hiển thị 4 mã giảm giá */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {discountCodes.slice(0, 4).map((discount) => (
              <DiscountCodeCard key={discount.id} discount={discount} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default DiscountCodeList;