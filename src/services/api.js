import axios from 'axios';

// تنظیمات پایه برای axios
const API = axios.create({
  baseURL: 'https://api.example.com', // در محیط واقعی باید آدرس API واقعی قرار گیرد
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// افزودن interceptor برای ارسال توکن احراز هویت در هر درخواست
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// افزودن interceptor برای مدیریت خطاها
API.interceptors.response.use(
  response => response,
  error => {
    // مدیریت خطاهای 401 (عدم احراز هویت)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // می‌توان کاربر را به صفحه ورود هدایت کرد
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
