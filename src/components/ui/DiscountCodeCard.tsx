import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DiscountCode, getImageUrl } from '@/lib/api-client';

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
    // Ưu tiên dùng value và type từ API
    if (discount.type === 'percentage' && discount.value) {
      return `${discount.value}%`;
    }
    if (discount.type === 'fixed_amount' && discount.value) {
      return `${(parseFloat(discount.value) / 1000).toLocaleString('vi-VN')}K`;
    }
    // Fallback về các field cũ
    if (discount.discount_percentage) {
      return `${discount.discount_percentage}%`;
    }
    if (discount.discount_amount) {
      return `${(discount.discount_amount / 1000).toLocaleString('vi-VN')}K`;
    }
    return '';
  };

  const getMinOrderValue = () => {
    // Ưu tiên dùng minimum_order_amount từ API
    if (discount.minimum_order_amount) {
      return `${(parseFloat(discount.minimum_order_amount) / 1000).toLocaleString('vi-VN')}K`;
    }
    // Fallback về field cũ
    if (discount.min_order_value) {
      return `${(discount.min_order_value / 1000).toLocaleString('vi-VN')}K`;
    }
    return '';
  };

  return (
    <div className="flex bg-red-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image or Star Icon - 40% width */}
      <div className="w-[40%] bg-red-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {discount.image_url ? (
          <img
            src={getImageUrl(discount.image_url)}
            alt={discount.code}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to star icon if image fails to load
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <svg class="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                `;
              }
            }}
          />
        ) : (
          <svg className="w-10 h-10 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
      </div>

      {/* Content - 60% width */}
      <div className="w-[60%] bg-white text-gray-900 p-3">
        <p className="text-sm  font-bold mb-1    text-red-600  ">NHẬP MÃ: {discount.code}</p>
        <p className="text-[14px] mb-3 leading-tight opacity-200  text- gray-400">
          {discount.description || `Giảm ${getDiscountDisplay()} cho đơn hàng giá trị tối thiểu ${getMinOrderValue()}. Số lượng mã giảm giá có hạn.`}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors text  ${
              copied
                ? 'bg-red-500 text-white'
                : 'bg-red-500 text-white hover:bg-red-100'
            }`}
          >
            {copied ? 'Đã sao' : 'Sao chép'}
          </button>

          <button className="text-xs text-blue-700 hover:underline font-medium">
            Điều kiện
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCodeCard;
