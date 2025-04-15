import React, { createContext, useState, useContext } from 'react';

// ایجاد Context برای مدیریت وضعیت احراز هویت
const AuthContext = createContext();

// ایجاد Provider برای AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // تابع ورود کاربر
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // در اینجا باید درخواست API برای احراز هویت ارسال شود
      // این یک نمونه ساده است
      if (email && password) {
        // شبیه‌سازی دریافت پاسخ از سرور
        const userData = {
          id: '1',
          name: 'کاربر نمونه',
          email: email,
          role: 'user'
        };
        
        // ذخیره اطلاعات کاربر و توکن
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', 'sample-token-12345');
        localStorage.setItem('user', JSON.stringify(userData));
        
        setLoading(false);
        return true;
      } else {
        throw new Error('لطفاً ایمیل و رمز عبور را وارد کنید');
      }
    } catch (err) {
      setError(err.message || 'خطا در ورود به سیستم');
      setLoading(false);
      return false;
    }
  };

  // تابع ثبت نام کاربر
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // در اینجا باید درخواست API برای ثبت نام ارسال شود
      // این یک نمونه ساده است
      if (name && email && password) {
        // شبیه‌سازی دریافت پاسخ از سرور
        const userData = {
          id: '1',
          name: name,
          email: email,
          role: 'user'
        };
        
        // ذخیره اطلاعات کاربر و توکن
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', 'sample-token-12345');
        localStorage.setItem('user', JSON.stringify(userData));
        
        setLoading(false);
        return true;
      } else {
        throw new Error('لطفاً تمام فیلدها را پر کنید');
      }
    } catch (err) {
      setError(err.message || 'خطا در ثبت نام');
      setLoading(false);
      return false;
    }
  };

  // تابع خروج کاربر
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // بررسی وضعیت احراز هویت در هنگام بارگذاری
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook برای استفاده از AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth باید درون AuthProvider استفاده شود');
  }
  return context;
};
