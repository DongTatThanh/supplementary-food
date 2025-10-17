import { Product } from '@/lib/api-client';
import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const price = Number(product.price);
  const salePrice = product.sale_price ? Number(product.sale_price) : null;
  const discount = product.discount_percentage || 
    (salePrice ? Math.round((1 - salePrice / price) * 100) : 0);
  
  // Get inventory quantity - API returns inventory_quantity
  const quantity = product.inventory_quantity || product.stock_quantity || 0;
  const hasStock = quantity > 0;
  
  // Navigate to product detail page
  const handleProductClick = () => {
    navigate(`/product/${product.slug || product.id}`);
  };
        
  // Handle image URL - support relative and absolute paths
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return '/placeholder-product.png';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `http://localhost:3201${imageUrl}`;
    return `http://localhost:3201/${imageUrl}`;
  };

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
          src={getImageUrl(product.featured_image || product.image_url)}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.png';
          }}
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
        <p className="text-xs text-gray-500 mb-3">
          Số lượng: {hasStock ? `${quantity} sản phẩm` : 'Hết hàng'}
        </p>

        {/* Button xem chi tiết */}
        <button 
          onClick={handleProductClick}
          className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            hasStock
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {hasStock ? 'SỐ LƯỢNG CÓ HẠN' : 'XEM CHI TIẾT'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;