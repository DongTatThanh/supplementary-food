import { AuthForm } from "@/components/AuthForm";
import { useSearchParams } from "react-router-dom";

export default function Auth() {
  const [searchParams] = useSearchParams();
  // Hỗ trợ cả 'redirect' và 'returnUrl' để tương thích
  const redirect = searchParams.get('returnUrl') || searchParams.get('redirect') || '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-red mb-2">WheyProtein VN</h1>
          <p className="text-muted-foreground">Đăng nhập để trải nghiệm mua sắm tuyệt vời</p>
        </div>
        <AuthForm redirect={redirect} />
      </div>
    </div>
  );
}