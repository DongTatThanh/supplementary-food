import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/ui/layout";
import ProductByCategory from "./pages/ProductByCategory";
import Cart from "./pages/Cart";
import FlashSalePage from "./pages/FlashSale";
import ToolTTDE from "./pages/ToolTTDE";
import ToolBMI from "./pages/ToolBMI";
import Checkout from "./pages/Checkout";
import PaymentPage from "./pages/PaymentPage";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import BrandProducts from "./pages/BrandProducts";
import SearchResults from "./pages/SearchResults";
import FloatingContactButton from "./components/contact/FloatingContactButton";
import AuthExpiredHandler from "./components/AuthExpiredHandler";
import RecentOrderNotifier from "./components/websocket/RecentOrderNotifier";
import BlogPages from "./pages/BlogPages";
import BlogDetail from "./pages/BlogDetail";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Handler xử lý token hết hạn */}
        <AuthExpiredHandler />
        {/* WebSocket notification cho đơn hàng mới */}
        <RecentOrderNotifier />
        {/* Floating Contact Button - hiển thị trên tất cả trang */}
        <FloatingContactButton />
        
        <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<ProductByCategory />} />
          <Route path="/brand/:id" element={<BrandProducts />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart/:user_id" element={<Cart />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/:orderNumber" element={<PaymentPage />} />
          <Route path="/order" element={<OrderDetail />} /> {/* Danh sách đơn hàng */}
          <Route path="/order/:orderNumber" element={<OrderDetail />} /> {/* Chi tiết đơn hàng */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/FlashSale" element={<FlashSalePage />} />
          <Route path="/ToolTTDE" element={<ToolTTDE />} />
          <Route path="/ToolBMI" element={<ToolBMI />} />
        <Route path="/blog" element={<BlogPages />} />
<Route path="/blog/category/:slug" element={<BlogPages />} />
<Route path="/blog/:slug" element={<BlogDetail />} />

        
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
