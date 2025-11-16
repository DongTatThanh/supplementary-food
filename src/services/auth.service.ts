import { apiClient, ApiResponse, AuthResponse, RegisterData, LoginData, User } from '@/lib/api-client';

// Auth Service
export class AuthService {
  // Register new user
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{access_token: string}>('/auth/register', data);
      
      if (response.access_token) {
        // Store token
        localStorage.setItem('auth_token', response.access_token);
        
        // Decode JWT để lấy real user_id
        let userId = Date.now(); // Fallback
        try {
          const payload = JSON.parse(atob(response.access_token.split('.')[1]));
          userId = payload.sub || payload.id || payload.userId || Date.now();
        } catch (e) {
          // Ignore JWT decode errors
        }
        
        // Create user object với real user_id
        const user: User = { 
          email: data.email, 
          id: userId,
          username: data.email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          token: response.access_token,
          access_token: response.access_token,
          user: user
        };
      } else {
        throw new Error('Registration failed - no token received');
      }
    } catch (error) {
      throw error;
    }
  }

  // Login user
  static async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<{access_token: string}>('/auth/login', data);
      
      if (response.access_token) {
        // Store token
        localStorage.setItem('auth_token', response.access_token);
        
        // Decode JWT để lấy real user_id
        let userId = Date.now(); // Fallback
        try {
          const payload = JSON.parse(atob(response.access_token.split('.')[1]));
          userId = payload.sub || payload.id || payload.userId || Date.now();
        } catch (e) {
          // Ignore JWT decode errors
        }
        
        // Create user object với real user_id
        const user: User = { 
          email: data.email, 
          id: userId,
          username: data.email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          token: response.access_token,
          access_token: response.access_token,
          user: user
        };
      } else {
        throw new Error('Login failed - no token received');
      }
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        // Call logout API if available
        await apiClient.post('/auth/logout', {}, {
          'Authorization': `Bearer ${token}`
        }).catch(() => {
          // Ignore errors on logout API call
        });
      }
    } catch (error) {
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  // Get current user from localStorage
  static getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }

  // Get current token
  static getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Verify OTP for password reset
  static async verifyOtp(email: string, otp: string): Promise<boolean> {
    try {
      const response = await apiClient.post<{success: boolean, message?: string}>('/auth/verify-otp', {
        email,
        otp
      });
      
      // Handle different response formats from backend
      if (typeof response === 'boolean') {
        return response;
      }
      
      if (response && typeof response === 'object') {
        return response.success !== false; // If success is not explicitly false, consider it true
      }
      
      return true; // If we get here without errors, assume success
    } catch (error) {
      throw error;
    }
  }

  // Send forgot password OTP
  static async sendForgotPasswordOtp(email: string): Promise<boolean> {
    try {
      const response = await apiClient.post<{success: boolean, message?: string}>('/auth/forgot-password', {
        email
      });

      return response.success !== false; // If success is not explicitly false, consider it true
    } catch (error) {
      throw error;
    }
  }

  // Reset password with OTP token
  static async resetPassword(email: string, otpToken: string, newPassword: string): Promise<boolean> {
    try {
      const response = await apiClient.post<{success: boolean, message?: string}>('/auth/reset-password', {
        otp: otpToken,
        newPassword: newPassword
      });
      
      // Handle different response formats from backend
      if (typeof response === 'boolean') {
        return response;
      }
      
      if (response && typeof response === 'object') {
        return response.success !== false; // If success is not explicitly false, consider it true
      }
      
      return true; // If we get here without errors, assume success
    } catch (error) {
      throw error;
    }
  }
}