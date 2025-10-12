import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AuthService } from "@/services/auth.service";
import { useToast } from "@/hooks/use-toast";
import CategoryDrawer from "./CategoryDrawer";

const Header = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Refresh auth state khi component mount
    setUser(AuthService.getCurrentUser());
    setIsAuthenticated(AuthService.isAuthenticated());
    
    // Listen for storage changes (khi login/logout từ tab khác)
    const handleStorageChange = () => {
      setUser(AuthService.getCurrentUser());
      setIsAuthenticated(AuthService.isAuthenticated());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
    navigate('/');
  };
  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top banner */}
      <div className="bg-brand-red-dark text-white text-sm py-2 px-4 text-center">
          HỆ THỐNG BÁN LẺ UY TÍN NHẤT TẠI VIỆT NAM 
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <button className="bg-transparent border-0 text-white hover:text-accent transition-colors">
             <img src="/assets/logoweb/1.png" alt="GymStore Logo" className="h-24 w-auto" />
            </button>
          </div>
          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Bạn cần gì ngày hôm nay..."
                className="w-full pl-4 pr-12 py-2 border-0 bg-white text-foreground"
              />
              <Button size="sm" className="absolute right-1 top-1 bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <User className="h-5 w-5 mr-2" />
                    {user?.username || user?.email?.split('@')[0] || 'User'}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.username || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Thông tin cá nhân</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Đơn hàng của tôi</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10" 
                onClick={() => navigate('/auth')}
              >
                <User className="h-5 w-5 mr-2" />
                Đăng nhập
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <NavigationMenu className="mx-0">
              <NavigationMenuList className="flex items-center gap-1 flex-wrap">
                <NavigationMenuItem>
                  <CategoryDrawer />
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10 whitespace-nowrap">
                    Thực Phẩm Bổ Sung
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Protein</h4>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Whey Protein</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Protein tăng cơ nhanh chóng
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Casein Protein</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Protein tiêu hóa chậm
                          </p>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Vitamin & Khoáng Chất</h4>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Multivitamin</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Bổ sung vitamin tổng hợp
                          </p>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Omega 3</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Axit béo thiết yếu
                          </p>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10 whitespace-nowrap">
                    Máy Tập Thể Dục
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] grid-cols-1 gap-3 p-4">
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Máy Chạy Bộ</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Cardio tại nhà hiệu quả
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Ghế Tập Đa Năng</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Tập toàn thân với một thiết bị
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Xe Đạp Tập</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Tăng cường sức bền
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10 whitespace-nowrap">
                    Phụ Kiện Gym
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] grid-cols-2 gap-3 p-4">
                      <div className="space-y-2">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Găng Tay Tập</div>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Dây Tập Kháng Lực</div>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Thảm Tập Yoga</div>
                        </NavigationMenuLink>
                      </div>
                      <div className="space-y-2">
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Bình Nước Thể Thao</div>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Đai Lưng Tập Gym</div>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Áo Gym Nam/Nữ</div>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                   Thực phẩm bổ sung
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Giải Thưởng
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Thương Hiệu
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="bg-transparent text-white hover:bg-white/10 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Kiến Thức
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-4 text-sm flex-shrink-0">
              <div className="text-white whitespace-nowrap">
                📞 Đặt hàng nhanh: <span className="font-bold">0972068334</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;