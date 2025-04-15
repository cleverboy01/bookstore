import React, { createContext, useState, useContext } from 'react';

// ایجاد Context برای مدیریت سبد خرید
const CartContext = createContext();

// ایجاد Provider برای CartContext
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // افزودن کتاب به سبد خرید
  const addToCart = (book) => {
    // بررسی اینکه آیا کتاب قبلاً در سبد خرید وجود دارد
    const existingItemIndex = items.findIndex(item => item.id === book.id);
    
    if (existingItemIndex >= 0) {
      // اگر کتاب در سبد خرید وجود دارد، تعداد آن را افزایش می‌دهیم
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      // اگر کتاب در سبد خرید وجود ندارد، آن را اضافه می‌کنیم
      setItems([...items, { ...book, quantity: 1 }]);
    }
    
    // بروزرسانی مجموع قیمت
    setTotal(prevTotal => prevTotal + book.price);
  };

  // حذف کتاب از سبد خرید
  const removeFromCart = (bookId) => {
    const bookToRemove = items.find(item => item.id === bookId);
    if (!bookToRemove) return;
    
    // کاهش مجموع قیمت
    setTotal(prevTotal => prevTotal - (bookToRemove.price * bookToRemove.quantity));
    
    // حذف کتاب از سبد خرید
    setItems(items.filter(item => item.id !== bookId));
  };

  // تغییر تعداد کتاب در سبد خرید
  const updateQuantity = (bookId, quantity) => {
    if (quantity < 1) return;
    
    const bookIndex = items.findIndex(item => item.id === bookId);
    if (bookIndex === -1) return;
    
    const book = items[bookIndex];
    const quantityDifference = quantity - book.quantity;
    
    // بروزرسانی تعداد کتاب
    const updatedItems = [...items];
    updatedItems[bookIndex].quantity = quantity;
    setItems(updatedItems);
    
    // بروزرسانی مجموع قیمت
    setTotal(prevTotal => prevTotal + (book.price * quantityDifference));
  };

  // خالی کردن سبد خرید
  const clearCart = () => {
    setItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount: items.reduce((count, item) => count + item.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook برای استفاده از CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart باید درون CartProvider استفاده شود');
  }
  return context;
};
