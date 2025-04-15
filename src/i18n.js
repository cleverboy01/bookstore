import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// تنظیمات اولیه i18next برای پشتیبانی چندزبانه
i18n
  .use(initReactI18next)
  .init({
    resources: {
      fa: {
        translation: {
          // ترجمه‌های فارسی
          welcome: 'به فروشگاه کتاب خوش آمدید',
          search: 'جستجو',
          login: 'ورود',
          register: 'ثبت نام',
          cart: 'سبد خرید',
          profile: 'پروفایل',
          orders: 'سفارش‌ها',
          about: 'درباره ما',
          contact: 'تماس با ما',
        }
      },
      en: {
        translation: {
          // ترجمه‌های انگلیسی
          welcome: 'Welcome to the Bookstore',
          search: 'Search',
          login: 'Login',
          register: 'Register',
          cart: 'Cart',
          profile: 'Profile',
          orders: 'Orders',
          about: 'About Us',
          contact: 'Contact Us',
        }
      }
    },
    lng: 'fa', // زبان پیش‌فرض
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false // React خودش HTML را escape می‌کند
    }
  });

export default i18n;
