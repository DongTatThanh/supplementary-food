import { AuthForm } from "@/components/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-red mb-2">WheyProtein VN</h1>
          <p className="text-muted-foreground">Đăng nhập để trải nghiệm mua sắm tuyệt vời</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}