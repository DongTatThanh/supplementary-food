import { Product } from '@/lib/api-client';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = Number(product.price);
  const salePrice = product.sale_price ? Number(product.sale_price) : null;
  const discount = product.discount_percentage || 
    (salePrice ? Math.round((1 - salePrice / price) * 100) : 0);

  return (
    <div className="bg-white border-2 border-red-600 rounded-lg overflow-hidden hover:shadow-xl transition-all">
      {/* Badge khuyến mại */}
      {product.is_on_sale && discount > 0 && (
        <div className="relative">
          <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-md z-10">
            <span className="text-xs font-bold">WHEY SINH VIÊN</span>
          </div>
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full z-10">
            <span className="text-sm font-bold">-{discount}%</span>
          </div>
        </div>
      )}

      {/* Hình ảnh sản phẩm */}
      <div className="relative h-64 bg-white p-4">
        <img
          src={product.image_url || '/placeholder-product.png'}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-4">
        {/* Tên sản phẩm */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2 h-12 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Giá */}
        <div className="mb-3">
          {salePrice ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-600">
                  {salePrice.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded">
                  -{discount}%
                </span>
              </div>
              <span className="text-sm text-gray-500 line-through">
                {price.toLocaleString('vi-VN')}đ
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-800">
              {price.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>

        {/* Mô tả ngắn */}
        {product.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Số lượng còn lại */}
        {product.stock_quantity !== undefined && (
          <p className="text-xs text-gray-500 mb-3">
            Số lượng: {product.stock_quantity > 0 ? `${product.stock_quantity} sản phẩm` : 'Hết hàng'}
          </p>
        )}

        {/* Button thêm vào giỏ */}
        <button 
          className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            product.stock_quantity && product.stock_quantity > 0
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.stock_quantity || product.stock_quantity === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock_quantity && product.stock_quantity > 0 ? 'SỐ LƯỢNG CÓ HẠN' : 'HẾT HÀNG'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;