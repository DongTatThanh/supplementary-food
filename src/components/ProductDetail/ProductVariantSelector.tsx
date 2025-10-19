import { ProductVariant } from '@/lib/api-client';
import { Badge } from '@/components/ui/badge';

interface ProductVariantSelectorProps {
  variants?: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
}

export const ProductVariantSelector = ({
  variants,
  selectedVariant,
  onVariantSelect,
}: ProductVariantSelectorProps) => {
  if (!variants || variants.length === 0) return null;

  // Group by size and flavor
  const sizes = [...new Set(variants.map(v => v.size).filter(Boolean))];
  const flavors = [...new Set(variants.map(v => v.flavor).filter(Boolean))];

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {sizes.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Chọn sản phẩm</h3>
          <div className="grid grid-cols-2 gap-3">
            {variants
              .filter((v, i, arr) => arr.findIndex(x => x.size === v.size) === i)
              .map((variant) => (
                <label
                  key={variant.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition ${
                    selectedVariant?.size === variant.size
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    checked={selectedVariant?.size === variant.size}
                    onChange={() => {
                      const matchingVariant = variants?.find(v => v.size === variant.size);
                      if (matchingVariant) onVariantSelect(matchingVariant);
                    }}
                    className="sr-only"
                  />
                  {variant.size && (
                    <>
                      {variant.size.includes('6lbs') && (
                        <Badge 
                          variant="destructive" 
                          className="absolute top-2 right-2 text-xs"
                        >
                          Tạm hết
                        </Badge>
                      )}
                      <div className="font-bold text-gray-800 mb-1">{variant.size}</div>
                      <div className="text-lg font-bold text-red-600">
                        {Number(variant.price).toLocaleString('vi-VN')}đ
                      </div>
                    </>
                  )}
                </label>
              ))}
          </div>
        </div>
      )}

      {/* Flavor Selection */}
      {flavors.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Hương vị:</h3>
          <div className="grid grid-cols-4 gap-2">
            {flavors.map((flavor, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const matchingVariant = variants?.find(v => v.flavor === flavor);
                  if (matchingVariant) onVariantSelect(matchingVariant);
                }}
                className={`border-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedVariant?.flavor === flavor
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : 'border-gray-300 text-gray-700 hover:border-red-400'
                }`}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
