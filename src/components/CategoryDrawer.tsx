import { useState } from "react";
import { Menu, ChevronRight, Star, Flame, Heart, Dumbbell, Coffee, Shield, Leaf, FlaskConical, icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const categoryItems = [
  {
    title: "Thương Hiệu Nổi Bật ",
    image: "/assets/img_swiper/4.png", // Dùng ảnh thay vì icon
    subtitle: "",
    hasArrow: true,   // hiển thị mũi tên
    isHeader: true, // hiển thị chữ đậm 
    badge: "HOT",
    link: "/products/whey-protein"
  },
  {
    title: "Whey Protein ",
    image: "/assets/menu_list/5.png",
    subtitle: "",
    hasArrow: false,
    isHeader: true,
    link: "/products/whey-protein"
  },
  {
    title: "Mass Tăng Cân    ",
    image: "/assets/menu_list/2.png",
    subtitle: "",
    hasArrow: false,
    link: "/products/sua-tang-mo"
  },
  {
    title: "BCAAs, EAAs Phục Hồi Cơ ",
    image: "/assets/menu_list/7.png",
    subtitle: "",
    hasArrow: false,

  },
  {
    title: "HỖ TRỢ GIẢM CÂN ",
    image: "/assets/menu_list/6.png",
    subtitle: "",
    hasArrow: false
  },
  {
    title: "VITAMIN - KHOÁNG CHẤT",
    image: "/assets/menu_list/7.png",
    subtitle: "",
    hasArrow: false
  },
  {
    title: "PHỤ KIÊN TẬP GYM ",
    image: "/assets/menu_list/8.png",
    subtitle: "",
    hasArrow: false
  },
  {
    title: "QUẦN ÁO GYM ",
    image: "/assets/menu_list/9.png",
    subtitle: "",
    hasArrow: false
  },
  {
    title: "Sức Khỏe - Sinh Lý ",
    image: "/assets/menu_list/4.png",

    subtitle: "",
    hasArrow: false
  },
 
  
 
];

const CategoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <Menu className="h-4 w-4 mr-2" />
          Danh mục
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 max-h-[500px] overflow-y-auto p-0">
        <div className="p-3 bg-primary text-primary-foreground sticky top-0 z-10">
          <div className="text-left text-white text-sm font-semibold">Danh mục sản phẩm</div>
        </div>
        
        <div className="py-1">
          {categoryItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className={`flex items-center justify-between p-3 cursor-pointer ${
                item.isHeader ? 'bg-muted/30 font-semibold' : ''
              }`}
              onClick={() => {
                console.log('Clicked:', item.title);
                setIsOpen(false);
              }}
            > 
              <div className="flex items-center gap-2 flex-1">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <div className="h-6 w-6 flex items-center justify-center">
                    {/* Fallback icon if no image */}
                  
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${item.isHeader ? 'font-semibold' : 'font-medium'}`}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.subtitle && (
                    <span className="text-[10px] text-muted-foreground">{item.subtitle}</span>
                  )}
                </div>
              </div>
              
              {item.hasArrow && (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDrawer;