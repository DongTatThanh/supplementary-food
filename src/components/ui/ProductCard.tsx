import { Product, getImageUrl } from '@/lib/api-client';
import { ShoppingCart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CartService } from '@/services/cart.service';
import { AuthService } from '@/services/auth.service';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  categoryId?: number;
  soldQuantity?: number; // Số lượng đã bán (cho Flash Sale)
}

const ProductCard = ({ product, soldQuantity, categoryId }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const cartService = new CartService();
  
  // Giá hiện tại để hiển thị (ưu tiên sale_price nếu có)
  const displayPrice = product.sale_price ? Number(product.sale_price) : Number(product.price);
  
  // Giá gốc để so sánh (để tính discount)
  const originalPrice = Number(product.price);
  const comparePrice = product.compare_price ? Number(product.compare_price) : null;
  
  // Giá để so sánh với giá hiển thị (ưu tiên compare_price, fallback về price)
  const priceToCompare = comparePrice || originalPrice;
  
  // Tính phần trăm giảm giá
  const discount = product.discount_percentage || 
    (priceToCompare > displayPrice ? Math.round((1 - displayPrice / priceToCompare) * 100) : 0);
  
  // Get inventory quantity - API returns inventory_quantity
  const quantity = product.inventory_quantity || product.stock_quantity ;
  const hasStock = quantity > 0;
  
  // Navigate to product detail page
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Handle thêm vào giỏ hàng
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn không cho navigate khi click vào button

    // Check đăng nhập trước
    if (!AuthService.isAuthenticated()) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
      navigate(`/auth?redirect=/product/${product.id}`);
      return;
    }

    if (!hasStock) {
      toast({
        title: "Hết hàng",
        description: "Sản phẩm này hiện đã hết hàng",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await cartService.addToCart(product.id, 1);

      if (response.success) {
        toast({
          title: "Thành công!",
          description: `Đã thêm "${product.name}" vào giỏ hàng`,
        });
      } else {
        toast({
          title: "Lỗi",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể thêm vào giỏ hàng. Vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };



  return (
    <div 
      onClick={handleProductClick}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md  transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1"
    >
      {/* Badge khuyến mại */}
      {product.is_on_sale==1 && discount > 0 ? (
        <div className="relative">


         
<div className="absolute top-2 right-2 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md z-10">
            <span className="text-sm font-bold">-{discount}%</span> 
          </div>
        </div>
      ): null}

      {/* Hình ảnh sản phẩm */}
      <div className="relative h-64 bg-white p-0.5  hover:caption_dropdowns  hover:shadow-xl hover:-translate-y-2" >
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
      <div className="p-1 margin-top-0.5">
       {/* Tên sản phẩm + rating */}
<div className="flex flex-col">
  <h3 className="  text-sl font-semibold text-gray-600 leading-[1.1] mb-3">
    {product.name}
  </h3>

  <div className="flex items-center gap-[1px] mt-[5px]">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className="h-3 w-3 fill-yellow-400 text-yellow-400"
      />
    ))}
  </div>
</div>
        {/* Giá */}
        <div className="mb-3">
          {priceToCompare > displayPrice ? (
            <div>
              <span className="text-xl font-bold text-red-600">
                {displayPrice.toLocaleString('vi-VN')}đ
              </span>
              <div>
                <span className="text-sm text-gray-500 line-through">
                  {priceToCompare.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          ) : (
            <span className="text-xl font-bold text-gray-800">
              {displayPrice.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>

        {/* Số lượng đã bán (Flash Sale) */}
        {soldQuantity !== undefined && (
          <div className="mb-2">
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-semibold">
              Đã bán {soldQuantity}
            </span>
          </div>
        )}

        {/* Nút thêm vào giỏ hàng */}
        <button
          onClick={handleAddToCart}
          disabled={!hasStock || isAddingToCart}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md font-semibold transition-colors ${
            !hasStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isAddingToCart
              ? 'bg-red-400 text-white cursor-wait'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>
            {!hasStock ? 'Hết hàng' : isAddingToCart ? 'Đang thêm...' : 'Thêm vào giỏ'}
          </span>
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;