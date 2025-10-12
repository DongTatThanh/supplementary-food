import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice?: number;
  rating: number;
  reviews: number;
  brand: string;
  isFreeShip?: boolean;
}

const ProductCard = ({ 
  name, 
  image, 
  originalPrice, 
  salePrice,
  rating,
  reviews,
  brand,
  isFreeShip = false
}: ProductCardProps) => {
  const discountPercent = salePrice 
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover"
          />
          {discountPercent > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
              -{discountPercent}%
            </div>
          )}
          {isFreeShip && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              FREESHIP
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{brand}</p>
          <h3 className="text-sm font-medium mb-2 line-clamp-2 min-h-[40px]">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              {(salePrice || originalPrice).toLocaleString('vi-VN')}đ
            </span>
            {salePrice && (
              <span className="text-sm text-gray-400 line-through">
                {originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          <Button className="w-full" size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Thêm vào giỏ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
