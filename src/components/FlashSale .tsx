import { useState, useEffect } from "react";
import { FlashSaleService } from "@/services/fashSale.service";
import { FlashSaleResponse, FlashSaleInfo, FlashSaleProduct } from "@/lib/api-client";
import ProductCard from "@/components/ui/ProductCard";

const flashSaleService = new FlashSaleService();


const FlashSale = () => {
  const [flashSale, setFlashSale] = useState<FlashSaleInfo | null>(null);
  const [products, setProducts] = useState<FlashSaleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchFlashSale = async () =>
         {
      try {
        setLoading(true);
        const result: FlashSaleResponse = await flashSaleService.getActiveFlashSale();

        if (result.success && result.data?.flashSale) {

          setFlashSale(result.data.flashSale);
          setTimeRemaining(result.data.flashSale.time_remaining);
          
          // Kiểm tra và filter products hợp lệ
          const validProducts = (result.data.products || []).filter(
            (item: FlashSaleProduct) => item && item.flash_sale
          );

          setProducts(validProducts);
        }
      } catch (error) {
        console.error(" Lỗi tải Flash Sale:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSale();
  }, []);

  // Đếm ngược thời gian
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



  if (!flashSale) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header với countdown */}
        <div className="flex flex-col md:flex-row items-center justify-between text-black-600 mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-5xl font-bold"> {flashSale.name}</h2>
        
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

      
      {products.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((item) => {
              if (!item || !item.flash_sale) return null;
              
              // Chuyển đổi FlashSaleProduct sang Product format để dùng với ProductCard
              const productData = {
                ...item,
                sale_price: item.flash_sale.sale_price,
                price: item.flash_sale.original_price,
                discount_percentage: item.flash_sale.discount_percent,
                is_on_sale: 1 // 1 = true trong database
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
        </div>
      )}
    </div>
  </section>
);
};

export default FlashSale;