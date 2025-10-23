import { useState, useEffect } from "react";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsService } from "@/services/products.service";
import { Category, getImageUrl } from "@/lib/api-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const productsService = new ProductsService();

const CategoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await productsService.getAllCategories();
        setCategories(response);
      } catch (err) {
        console.error('lỖI LÁY api', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <Menu className="h-4 w-4 mr-2" />
          Danh mục
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-0">
        <div className="p-3 bg-primary text-primary-foreground sticky top-0 z-10">
          <div className="text-left text-white text-sm font-semibold">Danh mục sản phẩm</div>
        </div>
        
        <div className="py-1">
          {loading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Đang tải...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Không có danh mục
            </div>
          ) : (
            categories.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className="flex items-center justify-between p-3 cursor-pointer"
                onClick={() => {
                  console.log('Clicked category:', item.name);
                  setIsOpen(false);
                }}
              > 
                <div className="flex items-center gap-2 flex-1">
                  {item.image_url ? (
                    <img 
                      src={getImageUrl(item.image_url)} 
                      alt={item.name} 
                      className="h-6 w-6 object-contain"
                    />
                  ) : (
                    <div className="h-6 w-6 flex items-center justify-center bg-gray-100 rounded">
                      <Menu className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="text-[10px] text-muted-foreground line-clamp-1">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDrawer;