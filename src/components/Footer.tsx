import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top red banner */}
      <div className="bg-brand-red-dark py-3 text-center text-sm overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="marquee">
            <span className="marquee-content">
              🚚 FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 1.500.000Đ • 💪 WHEY CHÍNH HÃNG - GIẢM GIÁ LÊN ĐẾN 50% • 📞 GỌI NGAY HOTLINE ĐỂ TƯ VẤN • 🏪 SEALINE • 🚚 FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 1.500.000Đ • 💪 WHEY CHÍNH HÃNG - GIẢM GIÁ LÊN ĐẾN 50% • 📞 GỌI NGAY HOTLINE ĐỂ TƯ VẤN • 🏪 SEALINE
            </span>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Store Info 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">HỆ THỐNG CỬA HÀNG GYMSTORE</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold">🏪 Cửa hàng Quận 1</div>
                  <div>📍 Hotline: 0913-23-25-35</div>
                  <div>⏰ Giờ mở: 7:00-23:00</div>
                  <div>📧 gymstorehn@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Info 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">CHI NHÁNH</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold">🏪 Cửa hàng Hà Nội</div>
                  <div>📍 Thái Hà-Đống Đa-HN</div>
                  <div>📞 Hotline: 0913-12-24-35</div>
                  <div>⏰ Giờ mở: 7:00-23:00</div>
                  <div>📧 gymstore@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Info 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">GYMSTORE MIỀN BẮC</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold">🏪 Bia hơi Trường Trinh Q.Đống Đa HN</div>
                  <div>📍 Thái Hà-Đống Đa-HN</div>
                  <div>📞 Hotline: 0949-26-05-33</div>
                  <div>⏰ Giờ mở: 7:00-23:00</div>
                  <div>📧 gymstore.hn@gmail.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Info 4 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">GYMSTORE MIỀN NAM</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold">🏪 Số 1030-Anh Văn-Q.Gò Vấp-TP HCM</div>
                  <div>📍 Hoàng Thị-Gò Vấp-TP HCM</div>
                  <div>📞 Hotline: 0947-25-05-25</div>
                  <div>⏰ Giờ mở: 7:00-23:00</div>
                  <div>📧 gymstore.hcm@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-accent">GYMSTORE HÀ NỘI</h3>
              <div className="space-y-2 text-sm">
                <div>🏪 Địa chỉ Bán Hàng: Số 5, Phố Tháị, Q.Đống Đa, TP.Hà Nội</div>
                <div>📞 Hotline: 0913-12-24-35</div>
                <div>📞 Tel: 024-1234-5678</div>
                <div>📧 Email: gymstore.hn@gmail.com</div>
                <div>🔑 MST: 01-090-456</div>
                <div>🌐 Website: www.gymstore.vn</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4 text-accent">GYMSTORE TP HỒ CHÍ MINH</h3>
              <div className="space-y-2 text-sm">
                <div>🏪 Địa chỉ Bán Hàng: Số 1030 Âu Cơ, Q.Tân Phú, TP.HCM</div>
                <div>📞 Hotline: 0947-25-05-25</div>
                <div>📞 Tel: 028-1234-5678</div>
                <div>📧 Email: gymstore.hcm@gmail.com</div>
                <div>🔑 MST: 01-090-456</div>
                <div>🌐 Website: www.gymstore.vn</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/20 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          © 2024 GYMSTORE. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;