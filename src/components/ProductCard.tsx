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
  const discount = salePrice ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;

  return (
    <Card className="group hover:shadow-product transition-all duration-300 hover:-translate-y-1 border-0 shadow-card">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
              -{discount}%
            </div>
          )}
          {isFreeShip && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
              Freeship
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-1">{brand}</div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {(salePrice || originalPrice).toLocaleString('vi-VN')}đ
              </span>
              {salePrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {originalPrice.toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>
          </div>

          {/* Add to cart button */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Thêm vào giỏ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;