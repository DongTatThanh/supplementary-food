import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="bg-gradient-red text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-accent text-lg font-bold"> KHUYẾN MÃI KHỦNG</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            1 TỶ LỢI NHUẬN <br />
            27G PROTEIN <br />
            17G EAAs 
          </h2>
          <p className="text-xl mb-6">SẢN PHẨM ĐỘC QUYỀN<br />GIÁ CẠNH TRANH</p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 px-8 py-3">
            ĐẶT NGAY
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/30 rounded-full translate-y-12 -translate-x-12"></div>
    </section>
  );
};

export default PromoBanner;