import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DiscountCode } from '@/lib/api-client';

interface DiscountCodeCardProps {
  discount: DiscountCode;
}

const DiscountCodeCard = ({ discount }: DiscountCodeCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(discount.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDiscountDisplay = () => {
    if (discount.discount_percentage) {
      return `${discount.discount_percentage}%`;
    }
    if (discount.discount_amount) {
      return `${(discount.discount_amount / 1000).toLocaleString('vi-VN')}K`;
    }
    return '';
  };

  const getMinOrderValue = () => {
    if (discount.min_order_value) {
      return `${(discount.min_order_value / 1000).toLocaleString('vi-VN')}K`;
    }
    return '';
  };

  return (
    <div className="flex bg-red-600 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Star Icon */}
      <div className="w-16 bg-red-700 flex items-center justify-center flex-shrink-0">
        <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 bg-red-600 text-white p-3">
        <p className="text-xs font-bold mb-1">NHẬP MÃ: {discount.code}</p>
        <p className="text-[11px] mb-3 leading-tight opacity-90">
          {discount.description || `Giảm ${getDiscountDisplay()} cho đơn hàng giá trị tối thiểu ${getMinOrderValue()}. Số lượng mã giảm giá có hạn.`}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-white text-red-600 hover:bg-gray-100'
            }`}
          >
            {copied ? 'Đã sao' : 'Sao chép'}
          </button>
          
          <button className="text-xs text-white hover:underline font-medium">
            Điều kiện
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeCard;
