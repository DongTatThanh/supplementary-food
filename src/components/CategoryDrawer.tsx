import { useState } from "react";
import { Menu, ChevronRight, Star, Flame, Heart, Dumbbell, Coffee, Shield, Leaf, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const categoryItems = [
  {
    title: "WHEY PROTEIN",
    icon: Star,
    subtitle: "",
    hasArrow: false,
    isHeader: true
  },
  {
    title: "SỮA TĂNG CÂN ",
    icon: Flame,
    subtitle: "",
    hasArrow: true,
    badge: "HOT"
  },
  {
    title: "TĂNG SỨC MẠNH ",
    icon: Star,
    subtitle: "",
    hasArrow: true
  },
  {
    title: "HỖ TRỢ GIẢM CÂN ",
    icon: Dumbbell,
    subtitle: "Vegan Protein",
    hasArrow: false
  },
  {
    title: "VITAMIN - KHOÁNG CHẤT",
    icon: Coffee,
    subtitle: "",
    hasArrow: false
  },
  {
    title: "PHỤ KIÊN TẬP GYM ",
    icon: Shield,
    subtitle: "",
    hasArrow: false
  },
  {
    title: "QUẦN ÁO GYM ",
    icon: Flame,
    subtitle: "",
    hasArrow: false
  },
  {
    title: "EAA - ESSENTIAL AMINO",
    icon: Heart,
    subtitle: "",
    hasArrow: true
  },
  {
    title: "TĂNG TESTOSTERONE",
    icon: Leaf,
    subtitle: "Yến Mạch",
    hasArrow: false
  },
 
];

const CategoryDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/10">
          <Menu className="h-4 w-4 mr-2" />
          Danh mục
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-background">
        <SheetHeader className="p-4 bg-primary text-primary-foreground">
          <SheetTitle className="text-left text-white">Danh mục sản phẩm </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-auto">
          {categoryItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
                item.isHeader ? 'bg-muted/30 font-semibold' : ''
              }`}
              onClick={() => {
                console.log('Clicked:', item.title);
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${item.isHeader ? 'font-semibold' : 'font-medium'}`}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <Badge variant="destructive" className="text-xs px-1.5 py-0.5 h-5">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  {item.subtitle && (
                    <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                  )}
                </div>
              </div>
              
              {item.hasArrow && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryDrawer;