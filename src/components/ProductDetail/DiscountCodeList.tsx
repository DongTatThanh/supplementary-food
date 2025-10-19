import { DiscountCode } from '@/lib/api-client';
import { Ticket, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DiscountCodeListProps {
  discountCodes: DiscountCode[];
  copiedCode: string | null;
  onCopyCode: (code: string) => void;
}

export const DiscountCodeList = ({
  discountCodes,
  copiedCode,
  onCopyCode,
}: DiscountCodeListProps) => {
  if (discountCodes.length === 0) return null;

  const getDiscountDisplay = (discountCode: DiscountCode) => {
    if (discountCode.type === 'percentage') {
      return `-${discountCode.value}%`;
    } else if (discountCode.type === 'fixed_amount') {
      return `-${Number(discountCode.value).toLocaleString('vi-VN')}đ`;
    }
    return '';
  };

  return (
    <div className="border-2 border-dashed border-orange-400 rounded-lg p-4 mb-6 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="flex items-center gap-2 mb-3">
        <Ticket className="w-5 h-5 text-orange-600" />
        <h3 className="font-bold text-gray-800">Quà khuyến mãi</h3>
      </div>
      <div className="space-y-2">
        {discountCodes.slice(0, 3).map((code) => (
          <div
            key={code.id}
            className="flex items-center justify-between bg-white rounded-lg p-3 border border-orange-200"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                <Ticket className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                  {code.name || code.code}
                </p>
                <p className="text-xs text-gray-600">
                  Trị giá: {getDiscountDisplay(code)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCopyCode(code.code)}
              className="text-orange-600 hover:text-orange-700"
            >
              {copiedCode === code.code ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Đã copy
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
