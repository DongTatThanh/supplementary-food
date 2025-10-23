import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthService } from "@/services/auth.service";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AuthTestPage = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshAuthState = () => {
    setUser(AuthService.getCurrentUser());
    setIsAuthenticated(AuthService.isAuthenticated());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle> Authentication Test</CardTitle>
            <CardDescription>
              Test đăng nhập/đăng ký với backend API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={refreshAuthState} variant="outline" size="sm">
                  Refresh Auth State
                </Button>
                {isAuthenticated && (
                  <Button onClick={handleLogout} variant="destructive" size="sm">
                    Đăng xuất
                  </Button>
                )}
              </div>

              {isAuthenticated ? (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    ✅ Đã đăng nhập thành công!<br />
                    <strong>Email:</strong> {user?.email}<br />
                    <strong>Username:</strong> {user?.username}<br />
                    <strong>Token:</strong> {localStorage.getItem('auth_token')?.substring(0, 20)}...
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertDescription className="text-orange-800">
                    ⚠️ Chưa đăng nhập. Hãy đăng nhập hoặc đăng ký tài khoản.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {!isAuthenticated && (
          <AuthForm onClose={refreshAuthState} />
        )}
      </div>
    </div>
  );
};

export default AuthTestPage;