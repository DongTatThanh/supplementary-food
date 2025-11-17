import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Truck, Shield, Award, ChevronRight, 
  Home, MapPin, Clock, Phone
} from 'lucide-react';
import { ProductDetailData, ProductVariant, DiscountCode, getImageUrl } from '../lib/api-client';
import { ProductsService } from '@/services/products.service';
import { DiscountCodeService } from '@/services/discountCode.service';
import { CartService } from '@/services/cart.service';
import { AuthService } from '@/services/auth.service';
import FlashSaleService from '@/services/fashSale.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Import các component con
import { ProductImageGallery } from '@/components/ProductDetail/ProductImageGallery';
import { ProductVariantSelector } from '@/components/ProductDetail/ProductVariantSelector';
import { ProductTabs } from '@/components/ProductDetail/ProductTabs';
import RecentlyViewedProducts from '@/components/RecentlyViewedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cartService = new CartService();
  
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [flashSalePrice, setFlashSalePrice] = useState<{item_id: number, variant_id: number | null, original_price: string, sale_price: string, discount_percent: number} | null>(null);

  // Scroll về đầu trang ngay khi vào trang hoặc khi id thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const service = new ProductsService();
        const productId = parseInt(id || '0', 10);
        const response = await service.getProductById(productId);
        
        if (response) {
          setProduct(response);
          setSelectedImage(response.featured_image);
          
          if (response.variants && response.variants.length > 0) {
            const defaultVariant = response.variants.find((v: ProductVariant) => v.is_default === 1) || response.variants[0];
            setSelectedVariant(defaultVariant);
          }


        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
  // Lấy danh sách mã giảm giá
    const fetchDiscountCodes = async () => {
      try {
        const service = new DiscountCodeService();
        const codes = await service.getActiveDiscountCodes();
        setDiscountCodes(codes);
      } catch (error) {
      }
    };
    // Kiểm tra Flash Sale

    const checkFlashSale = async (productId: number) => {
      try {
        const flashSaleService = new FlashSaleService();
        const result = await flashSaleService.getActiveFlashSale();
        if (result.success && result.data?.products) {
          const flashSaleProduct = result.data.products.find(p => p.id === productId);
          if (flashSaleProduct?.flash_sale) {
            setFlashSalePrice({
              item_id: Number(flashSaleProduct.flash_sale.item_id),
              variant_id: flashSaleProduct.flash_sale.variant_id ? Number(flashSaleProduct.flash_sale.variant_id) : null,
              original_price: flashSaleProduct.flash_sale.original_price,
              sale_price: flashSaleProduct.flash_sale.sale_price,
              discount_percent: flashSaleProduct.flash_sale.discount_percent
            });
          } else {
            setFlashSalePrice(null);
          }
        } else {
          setFlashSalePrice(null);
        }
      } catch (error) {
        setFlashSalePrice(null);
      }
    };

    if (id) {
      const productId = parseInt(id || '0', 10);
      fetchProduct();
      fetchDiscountCodes();
      checkFlashSale(productId);
    }
  }, [id]);

  // Tự động chọn variant đang Flash Sale khi product và flashSalePrice đã load
  useEffect(() => {
    if (product && flashSalePrice && flashSalePrice.variant_id && product.variants && product.variants.length > 0) {
      const flashSaleVariant = product.variants.find((v: ProductVariant) => Number(v.id) === Number(flashSalePrice.variant_id));
      if (flashSaleVariant && (!selectedVariant || Number(selectedVariant.id) !== Number(flashSalePrice.variant_id))) {
        setSelectedVariant(flashSaleVariant);
      }
    }
  }, [product, flashSalePrice]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleBuyNow = async () => {
    if (!product) return;

    // Check đăng nhập trước
    if (!AuthService.isAuthenticated()) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để mua sản phẩm",
        variant: "destructive",
      });
      navigate(`/auth?redirect=/product/${product.id}`);
      return;
    }

    setIsAddingToCart(true);
    try {
      const result = await cartService.addToCart(
        product.id,
        quantity,
        selectedVariant?.id
      );

      if (result.success) {
        toast({
          title: " Đã thêm vào giỏ hàng!",
          description: `${product.name} x ${quantity}`,
        });
        
        // Chuyển đến trang giỏ hàng
        setTimeout(() => {
          navigate('/cart');
        }, 500);
      } else {
        toast({
          title: " Lỗi",
          description: result.message || "Không thể thêm vào giỏ hàng",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: " Lỗi",
        description: "Không thể thêm vào giỏ hàng. Vui lòng thử lại!",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h2>
          <button onClick={() => navigate('/')} className="text-red-600 hover:underline">
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Ưu tiên giá flash sale nếu variant được chọn đang trong flash sale
  const isSelectedVariantInFlashSale = flashSalePrice && selectedVariant && flashSalePrice.variant_id && Number(flashSalePrice.variant_id) === Number(selectedVariant.id);
  const finalSalePrice = isSelectedVariantInFlashSale ? flashSalePrice.sale_price : (selectedVariant ? selectedVariant.price : product.price);
  const price = Number(finalSalePrice);
  const comparePrice = isSelectedVariantInFlashSale ? Number(flashSalePrice.original_price) : (selectedVariant?.compare_price ? Number(selectedVariant.compare_price) : (product.compare_price ? Number(product.compare_price) : null));
  const discount = isSelectedVariantInFlashSale ? flashSalePrice.discount_percent : (comparePrice && comparePrice > price ? Math.round((1 - price / comparePrice) * 100) : 0);
  const images = [product.featured_image, ...(product.image_gallery || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-red-600 flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Trang chủ</span>
          </button>
          <ChevronRight className="w-4 h-4" />
          {product.category && (
            <>
              <span className="hover:text-red-600 cursor-pointer">
                {product.category.name}
              </span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Component: Product Image Gallery */}
          <ProductImageGallery
            images={images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            productName={product.name}
            discount={discount}
            isOnSale={!!product.is_on_sale}
            isBestseller={product.is_bestseller === 1}
          />

          {/* Phần Thông Tin Sản Phẩm - Bên Phải */}
          <div className="bg-white rounded-lg p-6">
            {/* Brand & Title */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600">Thương hiệu:</span>
                {product.brand && (
                  <>
                    <img 
                      src={getImageUrl(product.brand.logo_url)} 
                      alt={product.brand.name}
                      className="h-8 object-contain"
                    />
                    <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
                      {product.brand.name}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            </div>

            {/* Nhà sản xuất */}
            {product.manufacturer && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Nhà sản xuất {product.brand?.name} - Nhập khẩu chính ngạch bởi
                    </p>
                    <p className="text-sm text-gray-700">Công Ty TNHH B.O.C.C.I Việt Nam</p>
                  </div>
                </div>
              </div>
            )}

            {/* Giá */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-bold text-red-600">
                  {price.toLocaleString('vi-VN')}đ
                </span>
                {comparePrice && comparePrice > price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {comparePrice.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              
         
            {/* Component: Product Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <ProductVariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantSelect={setSelectedVariant}
                flashSalePrice={flashSalePrice}
              />
            )}

            {/* Component: Discount Code List 
            {discountCodes.length > 0 && (
              <DiscountCodeList
                discountCodes={discountCodes}
                copiedCode={copiedCode}
                onCopyCode={handleCopyCode}
              />
            )}
            *}

            {/* Số lượng */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Số lượng</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition font-bold text-xl"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x-2 py-2 font-bold text-lg focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={handleBuyNow}
                disabled={isAddingToCart}
                className="bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {isAddingToCart ? 'Đang xử lý...' : 'THÊM VÀO GIỎ'}
              </button>
              <button 
                onClick={handleBuyNow}
                disabled={isAddingToCart}
                className="bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingToCart ? 'Đang xử lý...' : 'MUA NGAY'}
                {!isAddingToCart && <div className="text-xs font-normal">Giao tận nơi hoặc nhận tại cửa hàng</div>}
              </button>
            </div>

            {/* Hotline */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Gọi đặt mua:</p>
              <a href="tel:0919013030" className="text-2xl font-bold text-red-600 hover:underline flex items-center justify-center gap-2">
                <Phone className="w-6 h-6" />
                0972068334
              </a>
              <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-1">
                <Clock className="w-4 h-4" />
                (8h30 - 22h30)
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-4 gap-3 py-4 border-t">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-semibold text-gray-800">Đổi ngũ tư vấn</p>
                <p className="text-xs text-gray-600">có kinh nghiệm</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-semibold text-gray-800">30 ngày đổi</p>
                <p className="text-xs text-gray-600">trả hàng, thủ tục nhanh</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-semibold text-gray-800">Ship đảm bảo,</p>
                <p className="text-xs text-gray-600">siêu tốc toàn quốc</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-1 text-green-600" />
                <p className="text-xs font-semibold text-gray-800">Cam kết chính</p>
                <p className="text-xs text-gray-600">hàng, kho hàng lớn</p>
              </div>
            </div>
          </div>
        </div>

        {/* Component: Product Tabs */}
        <ProductTabs product={product} selectedVariant={selectedVariant} />

        {/* Component: Recently Viewed Products */}
        
      </div>
      <RecentlyViewedProducts />
    </div>
    </div>
    

  );

};



export default ProductDetail;
