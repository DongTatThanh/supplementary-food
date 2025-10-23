import { Store } from "@/lib/api-client";
import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { StoreService } from "@/services/store.service";

const storeService = new StoreService();

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [fetched, setFetched] = useState(false);

  const fetchStoreInfo = async () => {
    try {
      setLoading(true);
      const result = await storeService.getStoreAll();

      if (result && result.length > 0) {
        setStores(result);
      } else {
        setStores([]);
      }

      setError(null);
      setFetched(true);
    } catch (error) {
      console.error("Lỗi tải dữ liệu cửa hàng:", error);
      setError("Không thể tải thông tin cửa hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetched) {
      fetchStoreInfo();
    }
  }, [fetched]);

  return (
    <footer className="bg-primary text-primary-foreground">

   <div className="bg-brand-red-dark py-3 text-sm overflow-hidden">
  <div className="mx-auto px-4 max-w-4xl">
    <div className="animate-marquee whitespace-nowrap">
      {stores.map((store) => (
        <span key={store.id} className="mx-8 font-semibold">
          {store.marquee_text}
        </span>
      ))}
    </div>
  </div>
</div>

      {/* Thông tin cửa hàng */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-white text-center">
              HỆ THỐNG CỬA HÀNG GYMTH
            </h3>

            {loading && <p>Đang tải thông tin cửa hàng...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && stores.length > 0 && (
              // Horizontal list: use flex row with horizontal overflow on small screens
              <div className="w-full flex flex-wrap">
                <div className="flex gap-4  py-1  ">
                  {stores.map((store) => (
                    <div
                      key={store.id}
                      className="min-w-[260px] shrink-0 bg-white/5 p-4 rounded-lg border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-accent mt-1" />
                        <div>
                          <h2 className="font-bold text-base mb-1">{store.name}</h2>
                          <p className="text-sm"> {store.address}</p>
                          <p className="text-sm"> {store.hotline}</p>
                          <p className="text-sm"> {store.support_phone}</p>
                          <p className="text-sm"> {store.opening_hours}</p>
                          <p className="text-sm">{store.email}</p>
                          <a
                            href={store.map_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm inline-block mt-1"
                          >
                          Xem bản đồ
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/20 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          © 2024 GYMTH. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
