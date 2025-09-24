import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { AuthService } from "@/services/auth.service";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  confirmPassword: z.string().min(6, "Mật khẩu xác nhận ít nhất 6 ký tự"),
  fullName: z.string().min(2, "Họ tên ít nhất 2 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

const otpSchema = z.object({
  otp: z.string().min(6, "OTP phải có 6 chữ số").max(6, "OTP phải có 6 chữ số").regex(/^\d{6}$/, "OTP phải là 6 chữ số"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  confirmPassword: z.string().min(6, "Mật khẩu xác nhận ít nhất 6 ký tự"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type OTPFormData = z.infer<typeof otpSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface AuthFormProps {
  onClose?: () => void;
}

export function AuthForm({ onClose }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [showResetPasswordStep, setShowResetPasswordStep] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", fullName: "" },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await AuthService.login({
        email: data.email,
        password: data.password
      });
      toast({
        title: "Đăng nhập thành công!",
        description: `Chào mừng ${result.user?.email || 'bạn'} quay lại!`,
      });
      
      // Chuyển hướng về trang chính sau 1 giây
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
      onClose?.();
    } catch (error: any) {
      toast({
        title: "Lỗi đăng nhập",
        description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      console.log('Form data received:', data);
      console.log('Email length:', data.email.length, 'Email:', data.email);
      console.log('Password length:', data.password.length, 'Password:', data.password.substring(0, 3) + '***');
      
      // Validate locally first
      if (!data.email || !data.email.includes('@')) {
        throw new Error('Email không hợp lệ');
      }
      if (!data.password || data.password.length < 6) {
        throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
      }
      
      const requestData = {
        email: data.email.trim(),
        password: data.password,
        full_name: data.fullName.trim()
      };
      
      console.log('Sending to API:', requestData);
      const result = await AuthService.register(requestData);
      console.log('Registration result:', result);
      
      toast({
        title: "Đăng ký thành công!",
        description: `Tài khoản ${data.email} đã được tạo thành công! Đang chuyển về trang chính...`,
      });
      
      // Chuyển hướng về trang chính sau 1.5 giây
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
      onClose?.();
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Lỗi đăng ký",
        description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPassword = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await AuthService.sendForgotPasswordOtp(data.email);

      toast({
        title: "Mã OTP đã được gửi!",
        description: `Vui lòng kiểm tra email ${data.email} và nhập mã OTP 6 chữ số.`,
      });
      
      // Chuyển đến bước OTP
      setEmailForOtp(data.email);
      setShowOtpStep(true);
      
    } catch (error: any) {
      console.error('Forgot password error:', error);
      toast({
        title: "Lỗi gửi email",
        description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      toast({
        title: "Lỗi xác thực OTP",
        description: "Vui lòng nhập đủ 6 chữ số",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await AuthService.verifyOtp(emailForOtp, otpValue);
      
      if (success) {
        toast({
          title: "Xác thực thành công!",
          description: "Bây giờ bạn có thể đặt lại mật khẩu mới.",
        });
        
        // Chuyển đến bước reset password
        setOtpToken(otpValue); // Lưu token để xác thực
        setShowOtpStep(false);
        setShowResetPasswordStep(true);
        
      } else {
        throw new Error('Mã OTP không chính xác');
      }
      
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Lỗi xác thực OTP",
        description: error.message || "Mã OTP không chính xác, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowOtpStep(false);
    setShowResetPasswordStep(false);
    setEmailForOtp("");
    setOtpValue("");
    setOtpToken("");
  };

  const handleBackToOtp = () => {
    setShowResetPasswordStep(false);
    setShowOtpStep(true);
    resetPasswordForm.reset();
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const success = await AuthService.resetPassword(emailForOtp, otpToken, data.password);
      
      if (success) {
        toast({
          title: "Đặt lại mật khẩu thành công!",
          description: "Mật khẩu của bạn đã được cập nhật. Vui lòng đăng nhập lại.",
        });
        
        // Reset tất cả states
        setShowOtpStep(false);
        setShowResetPasswordStep(false);
        setEmailForOtp("");
        setOtpValue("");
        setOtpToken("");
        forgotPasswordForm.reset();
        resetPasswordForm.reset();
        
        // Chuyển về tab đăng nhập
        const loginTab = document.querySelector('[value="login"]') as HTMLElement;
        loginTab?.click();
        
      } else {
        throw new Error('Không thể đặt lại mật khẩu');
      }
      
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: "Lỗi đặt lại mật khẩu",
        description: error.message || "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">
            Chọn phương thức đăng nhập hoặc tạo tài khoản mới
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Đăng nhập</TabsTrigger>
              <TabsTrigger value="register">Đăng ký</TabsTrigger>
              <TabsTrigger value="forgot">Quên MK</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Nhập email của bạn"
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Nhập mật khẩu"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                  
                  <div className="text-center">
                    <Button 
                      type="button" 
                      variant="link" 
                      className="p-0 h-auto font-normal text-sm text-muted-foreground hover:text-primary"
                      onClick={() => {
                        // Switch to forgot password tab
                        const forgotTab = document.querySelector('[value="forgot"]') as HTMLElement;
                        forgotTab?.click();
                      }}
                    >
                      Quên mật khẩu?
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và tên</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type="text"
                              placeholder="Nhập họ và tên của bạn"
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Nhập email của bạn"
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Nhập mật khẩu"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Nhập lại mật khẩu"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              disabled={isLoading}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            {/* Forgot Password Tab */}
            <TabsContent value="forgot" className="space-y-4">
              {!showOtpStep && !showResetPasswordStep ? (
                // Step 1: Enter Email
                <Form {...forgotPasswordForm}>
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-4">
                    <div className="text-center space-y-2 mb-4">
                      <h3 className="text-lg font-medium">Quên mật khẩu?</h3>
                      <p className="text-sm text-muted-foreground">
                        Nhập email của bạn và chúng tôi sẽ gửi mã OTP 6 chữ số
                      </p>
                    </div>
                    
                    <FormField
                      control={forgotPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="pl-10"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Đang gửi OTP..." : "Gửi mã OTP"}
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Nhớ mật khẩu?{" "}
                        <Button 
                          type="button" 
                          variant="link" 
                          className="p-0 h-auto font-normal text-primary"
                          onClick={() => {
                            // Switch to login tab
                            const loginTab = document.querySelector('[value="login"]') as HTMLElement;
                            loginTab?.click();
                          }}
                        >
                          Đăng nhập ngay
                        </Button>
                      </p>
                    </div>
                  </form>
                </Form>
              ) : showOtpStep && !showResetPasswordStep ? (
                // Step 2: Enter OTP
                <div className="space-y-4">
                  <div className="text-center space-y-2 mb-4">
                    <h3 className="text-lg font-medium">Nhập mã OTP</h3>
                    <p className="text-sm text-muted-foreground">
                      Chúng tôi đã gửi mã OTP 6 chữ số đến email
                    </p>
                    <p className="text-sm font-medium text-primary">
                      {emailForOtp}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp-input">Mã OTP (6 chữ số)</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="otp-input"
                        type="text"
                        placeholder="123456"
                        className="pl-10 text-center text-lg tracking-widest"
                        maxLength={6}
                        disabled={isLoading}
                        value={otpValue}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, '');
                          setOtpValue(numericValue);
                        }}
                        autoFocus
                      />
                    </div>
                    {otpValue.length > 0 && otpValue.length < 6 && (
                      <p className="text-sm text-red-500">OTP phải có 6 chữ số</p>
                    )}
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full" 
                    disabled={isLoading || otpValue.length !== 6}
                    onClick={onVerifyOtp}
                  >
                    {isLoading ? "Đang xác thực..." : "Xác thực OTP"}
                  </Button>
                  
                  <div className="text-center space-y-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={handleBackToEmail}
                      disabled={isLoading}
                    >
                      ← Quay lại nhập email
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      Không nhận được mã?{" "}
                      <Button 
                        type="button" 
                        variant="link" 
                        className="p-0 h-auto font-normal text-primary"
                        onClick={() => {
                          // Resend OTP
                          forgotPasswordForm.handleSubmit(onForgotPassword)();
                        }}
                        disabled={isLoading}
                      >
                        Gửi lại
                      </Button>
                    </p>
                  </div>
                </div>
              ) : (
                // Step 3: Reset Password
                <Form {...resetPasswordForm}>
                  <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-4">
                    <div className="text-center space-y-2 mb-4">
                      <h3 className="text-lg font-medium">Đặt lại mật khẩu</h3>
                      <p className="text-sm text-muted-foreground">
                        Nhập mật khẩu mới cho tài khoản của bạn
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {emailForOtp}
                      </p>
                    </div>
                    
                    <FormField
                      control={resetPasswordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mật khẩu mới</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu mới"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1 h-8 w-8 px-0"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={resetPasswordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Xác nhận mật khẩu</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu mới"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1 h-8 w-8 px-0"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Đang cập nhật..." : "Đặt lại mật khẩu"}
                    </Button>
                    
                    <div className="text-center">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={handleBackToOtp}
                        disabled={isLoading}
                      >
                        ← Quay lại nhập OTP
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}