import { useState } from 'react';
import { Copy, Check, Tag, Calendar, TrendingDown } from 'lucide-react';
import { DiscountCode } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

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
      return `${discount.discount_amount.toLocaleString('vi-VN')}đ`;
    }
    return 'N/A';
  };

  const getRemainingUses = () => {
    if (discount.usage_limit && discount.used_count !== undefined) {
      return discount.usage_limit - discount.used_count;
    }
    return null;
  };

  const remainingUses = getRemainingUses();
  const isExpiringSoon = new Date(discount.end_date).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-400 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
      
      {/* Expiring badge */}
      {isExpiringSoon && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="destructive" className="animate-pulse">
            Sắp hết hạn
          </Badge>
        </div>
      )}

      <CardContent className="p-6 relative">
        {/* Discount value - Big & Eye-catching */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl px-8 py-4 shadow-lg transform group-hover:scale-105 transition-transform">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-6 w-6" />
              <span className="text-4xl font-black">{getDiscountDisplay()}</span>
            </div>
            <p className="text-xs text-red-100 text-center mt-1">GIẢM GIÁ</p>
          </div>
        </div>

        {/* Code section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-dashed border-gray-300">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Tag className="h-4 w-4 text-gray-500" />
              <code className="text-xl font-mono font-bold text-gray-800 tracking-wider">
                {discount.code}
              </code>
            </div>
            <Button
              size="sm"
              variant={copied ? "default" : "outline"}
              onClick={handleCopy}
              className={copied ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Đã sao
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Sao chép
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Description */}
        {discount.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {discount.description}
          </p>
        )}

        {/* Conditions */}
        <div className="space-y-2 mb-4">
          {discount.min_order_value && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span>Đơn tối thiểu: <strong>{discount.min_order_value.toLocaleString('vi-VN')}đ</strong></span>
            </div>
          )}
          {discount.max_discount_amount && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span>Giảm tối đa: <strong>{discount.max_discount_amount.toLocaleString('vi-VN')}đ</strong></span>
            </div>
          )}
          {remainingUses !== null && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span>Còn lại: <strong className="text-red-600">{remainingUses}</strong> mã</span>
            </div>
          )}
        </div>

        {/* Footer - Expiry date */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>HSD: {new Date(discount.end_date).toLocaleDateString('vi-VN')}</span>
          </div>
          {discount.is_active && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
              Đang hoạt động
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscountCodeCard;
