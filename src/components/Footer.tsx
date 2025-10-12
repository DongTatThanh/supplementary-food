import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top red banner */}
      <div className="bg-brand-red-dark py-3 text-center text-sm overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="marquee">
            <span className="marquee-content">
               FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 1.500.000Đ • 💪 WHEY CHÍNH HÃNG - GIẢM GIÁ LÊN ĐẾN 50% • 📞 GỌI NGAY HOTLINE ĐỂ TƯ VẤN 0972068334 • 🏪 SEALINE • 🚚 FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 1.500.000Đ • 💪 WHEY CHÍNH HÃNG - GIẢM GIÁ LÊN ĐẾN 50% • 📞 GỌI NGAY HOTLINE ĐỂ TƯ VẤN • 🏪 SEALINE
            </span>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Store Info 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-accent">HỆ THỐNG CỬA HÀNG Gym Sinh Viên </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                <div>
                  <div className="font-semibold">🏪 Cửa hàng Thanh Xuân</div>
                  <div>📍 Hotline: 0972068334</div>
                  <div>⏰ Giờ mở: 7:00-23:00</div>
                  <div>dongbeo16@gmail.com</div>
                </div>
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