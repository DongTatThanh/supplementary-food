import React, { useState, useEffect } from 'react';
import { Brand } from '@/lib/api-client';
import BrandService from '@/services/brand.service';

interface BrandFilterProps 
{
  onChange: (brandId: number | null) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ onChange }) => 
     {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  const brandService = new BrandService();

  useEffect(() =>
     {
    const fetchBrands = async () => {
      try 
      {
        setLoading(true);
        const brandsData = await brandService.getAllBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error('Lỗi tải brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brandId: number | null) => {
    setSelectedBrand(brandId);
    onChange(brandId);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500">Đang tải...</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-2">
        {/* All Brands option */}
        <li>
          <button
            onClick={() => handleBrandClick(null)}
            className={`block w-full text-left border px-4 py-2 rounded hover:bg-gray-100 ${
              selectedBrand === null ? 'bg-blue-100 border-blue-500' : ''
            }`}
          >
            Tất cả
          </button>
        </li>
        
    
        {brands.map((brand) => (
          <li key={brand.id}>
            <button
              onClick={() => handleBrandClick(brand.id)}
              className={`block w-full text-left border px-4 py-2 rounded hover:bg-gray-100 ${
                selectedBrand === brand.id ? 'bg-blue-100 border-blue-500' : ''
              }`}
            >
              {brand.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
