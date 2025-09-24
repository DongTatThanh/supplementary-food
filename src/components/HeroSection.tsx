import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div>
            <div className="text-xs text-primary font-semibold mb-2">NUTRA-BIO</div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              CREATINE<br />
              MONOHYDRATE<br />
              <span className="text-muted-foreground">POWDER</span>
            </h1>
            <div className="text-lg text-muted-foreground mb-2">Kích cỡ: 60 Hộp</div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">
                CREATINE TINH KHIẾT<br />
                ĐẠT TIÊU CHUẨN DƯỢC PHẨM
              </h2>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    ✓
                  </div>
                  <span>KHÔNG GLUTEN</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    ✓
                  </div>
                  <span>KHÔNG CHẤT BẢO QUẢN</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>✓ GIÚP TĂNG SỨC MẠNH VÀ SỨC CHỊU ĐỰNG</p>
              <p>✓ CUNG CẤP NĂNG LƯỢNG CHO CÁC BÀI TẬP CƯỜNG ĐỘ CAO</p>
              <p>✓ HỖ TRỢ PHỤC HỒI VÀ TĂNG TRƯỞNG CƠ BẮP</p>
              <p>✓ TĂNG CƯỜNG SỨC BỀN VÀ HIỆU SUẤT LUYỆN TẬP</p>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              MUA NGAY
            </Button>
          </div>

          {/* Right content - Product showcase */}
          <div className="relative">
            <div className="relative">
              {/* 5G badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-accent text-accent-foreground rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold">
                  <span className="text-2xl">5G</span>
                  <span className="text-xs">PER SCOOP</span>
                </div>
              </div>
              
              {/* Product images */}
              <div className="grid grid-cols-3 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=300&fit=crop&crop=center"
                  alt="Creatine container 1"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=300&fit=crop&crop=center"
                  alt="Creatine container 2"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-4"
                />
                <img 
                  src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=300&fit=crop&crop=center"
                  alt="Creatine container 3"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;