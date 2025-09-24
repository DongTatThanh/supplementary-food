import { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { ProductService } from '@/services/product.service';

// Hook để test API connection
export const useApiTest = () => {
  const [isApiOnline, setIsApiOnline] = useState<boolean | null>(null);
  const [apiStatus, setApiStatus] = useState<string>('Checking...');

  useEffect(() => {
    const testApi = async () => {
      try {
        // Test API bằng cách gọi endpoint gốc đơn giản
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3201';
        const response = await fetch(API_BASE_URL);
        
        if (response.ok) {
          setIsApiOnline(true);
          setApiStatus('API is online');
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        setIsApiOnline(false);
        setApiStatus(`API is offline: ${error}`);
        console.error('API test failed:', error);
      }
    };

    testApi();
  }, []);

  return { isApiOnline, apiStatus };
};

// Hook để quản lý auth state
export const useAuth = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const response = await AuthService.register(data);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };
};