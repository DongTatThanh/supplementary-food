import { useState, useEffect } from "react";
import { Brand, getImageUrl } from "@/lib/api-client";
import { BrandService } from "@/services/brand.service";

const brandService = new BrandService();

const BrandShowcase = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandService.getFeaturedBrands();
       
     
        setBrands(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();  
  }, []);

  

  return (
    <section className="py-14 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">Thương Hiệu Nổi Bật</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl aspect-square flex items-center justify-center hover:shadow-2xl transition-transform hover:scale-105 overflow-hidden p-4"
            >
              <img
                src={getImageUrl(brand.logo_url)}
                alt={brand.name}
                className="w-full h-full object-contain transition-all"
                onError={(e) => {
                  
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="text-center text-sm text-gray-500">${brand.name}</div>`;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;