
import { useState, useEffect } from "react";
import FlashSaleService from "@/services/fashSale.service"
import { FlashSaleResponse, FlashSaleInfo, FlashSaleProduct } from "@/lib/api-client";
import ProductCard from "@/components/ui/ProductCard";
import Banner from "@/components/Banner";
import PriceFilterproducts from "@/components/PriceFilterproducts";
import BrandFilter from "@/components/BrandFilter";
import { ProductSort } from "@/components/ProductSort";

const flashSaleService = new FlashSaleService();

const FlashSalePage = () => {
  const [flashSale, setFlashSale] = useState<FlashSaleInfo | null>(null);
  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Load initial data khi component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result: FlashSaleResponse = await flashSaleService.getActiveFlashSale();

        if (result.success && result.data?.flashSale) {
          setFlashSale(result.data.flashSale);
          setTimeRemaining(result.data.flashSale.time_remaining);

          const validProducts = (result.data.products || []).filter(
            (item: FlashSaleProduct) => item && item.flash_sale
          );

          setProducts(validProducts);
        }
      } catch (err) {
        console.error("Lỗi tải Flash Sale:", err);
        setError("Không thể tải sản phẩm Flash Sale");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!flashSale) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSale]);

  const handlePriceChange = (min: number | null, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
    // Fetch filtered products from backend (giống ProductByCategory)
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result: FlashSaleResponse = await flashSaleService.getActiveFlashSale(
          min ?? undefined,
          max ?? undefined,
          brandId ?? undefined,
          sort ?? undefined
        );

        if (result.success && result.data?.flashSale) {
          setFlashSale(result.data.flashSale);
          setTimeRemaining(result.data.flashSale.time_remaining);

          const validProducts = (result.data.products || []).filter(
            (item: FlashSaleProduct) => item && item.flash_sale
          );

          setProducts(validProducts);
        }
      } catch (err) {
        console.error("Lỗi tải Flash Sale:", err);
        setError("Không thể tải sản phẩm Flash Sale");
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleBrandChange = (brand: number | null) => {
    setBrandId(brand);
    // Fetch filtered products from backend (giống ProductByCategory)
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const result: FlashSaleResponse = await flashSaleService.getActiveFlashSale(
          minPrice ?? undefined,
          maxPrice ?? undefined,
          brand ?? undefined,
          sort ?? undefined
        );

        if (result.success && result.data?.flashSale) {
          setFlashSale(result.data.flashSale);
          setTimeRemaining(result.data.flashSale.time_remaining);

          const validProducts = (result.data.products || []).filter(
            (item: FlashSaleProduct) => item && item.flash_sale
          );

          setProducts(validProducts);
        }
      } catch (err) {
        console.error("Lỗi tải Flash Sale:", err);
        setError("Không thể tải sản phẩm Flash Sale");
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleSortChange = async (sortParam: string) => {
    setSort(sortParam);
    try {
      setLoading(true);
      setError(null);
      const result: FlashSaleResponse = await flashSaleService.getActiveFlashSale(
        minPrice ?? undefined,
        maxPrice ?? undefined,
        brandId ?? undefined,
        sortParam
      );

      if (result.success && result.data?.flashSale) {
        setFlashSale(result.data.flashSale);
        setTimeRemaining(result.data.flashSale.time_remaining);

        const validProducts = (result.data.products || []).filter(
          (item: FlashSaleProduct) => item && item.flash_sale
        );

        setProducts(validProducts || []);
      }
    } catch (err) {
      console.error("Lỗi tải Flash Sale:", err);
      setError("Không thể tải sản phẩm Flash Sale");
    } finally {
      setLoading(false);
    }
  };

  if (!flashSale) return null;

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header with Countdown */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800">{flashSale.name}</h2>
          </div>

          <div className="flex gap-3">
            {['days', 'hours', 'minutes', 'seconds'].map((key, i) => (
              <div key={i} className="text-center bg-red-600 text-white rounded-lg p-3 min-w-[70px]">
                <div className="text-3xl font-bold">
                  {String(timeRemaining[key as keyof typeof timeRemaining]).padStart(2, '0')}
                </div>
                <div className="text-xs capitalize">
                  {key === 'days' ? 'Ngày' : key === 'hours' ? 'Giờ' : key === 'minutes' ? 'Phút' : 'Giây'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div className="mb-8">
          <Banner />
        </div>

        {/* Layout với Sidebar */}
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-4 space-y-6">
              {/* Brand Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Hãng sản xuất</h3>
                <BrandFilter onChange={handleBrandChange} />
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Giá</h3>
                <PriceFilterproducts onChange={handlePriceChange} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm font-semibold text-gray-700">Sắp xếp:</span>
                  <div className="flex gap-2 flex-wrap">
                    <ProductSort onChange={handleSortChange} />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {products.length} sản phẩm
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Đang tải sản phẩm...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((item) => {
                  if (!item || !item.flash_sale) return null;

                  const productData = {
                    id: item.id,
                    name: item.name,
                    slug: item.slug,
                    featured_image: item.featured_image,
                    image_url: item.featured_image,
                    brand: item.brand,
                    category: item.category,
                    price: item.flash_sale.original_price,
                    sale_price: item.flash_sale.sale_price,
                    compare_price: null,
                    discount_percentage: item.flash_sale.discount_percent,
                    is_on_sale: 1,
                    inventory_quantity: item.flash_sale.remaining
                  };

                  return (
                    <ProductCard
                      key={item.id}
                      product={productData}
                      soldQuantity={item.flash_sale.sold_quantity}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">Không có sản phẩm nào phù hợp với bộ lọc</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSalePage;



