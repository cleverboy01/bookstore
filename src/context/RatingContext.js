import React, { createContext, useState, useContext } from 'react';

// ایجاد Context برای مدیریت نظرات و امتیازدهی
const RatingContext = createContext();

// ایجاد Provider برای RatingContext
export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // افزودن امتیاز و نظر جدید
  const addRating = (userId, bookId, rating, comment) => {
    setLoading(true);
    setError(null);
    
    try {
      // بررسی اعتبار امتیاز
      if (rating < 1 || rating > 5) {
        throw new Error('امتیاز باید بین 1 تا 5 باشد');
      }
      
      // بررسی اینکه آیا کاربر قبلاً به این کتاب امتیاز داده است
      const existingRatingIndex = ratings.findIndex(
        r => r.userId === userId && r.bookId === bookId
      );
      
      if (existingRatingIndex >= 0) {
        // بروزرسانی امتیاز موجود
        const updatedRatings = [...ratings];
        updatedRatings[existingRatingIndex] = {
          ...updatedRatings[existingRatingIndex],
          rating,
          comment,
          updatedAt: new Date().toISOString()
        };
        
        setRatings(updatedRatings);
      } else {
        // افزودن امتیاز جدید
        const newRating = {
          id: `rating-${Date.now()}`,
          userId,
          bookId,
          rating,
          comment,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setRatings([...ratings, newRating]);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'خطا در ثبت امتیاز');
      setLoading(false);
      return false;
    }
  };

  // حذف امتیاز
  const deleteRating = (ratingId) => {
    setLoading(true);
    setError(null);
    
    try {
      setRatings(ratings.filter(rating => rating.id !== ratingId));
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در حذف امتیاز');
      setLoading(false);
      return false;
    }
  };

  // دریافت امتیازهای یک کتاب
  const getBookRatings = (bookId) => {
    return ratings.filter(rating => rating.bookId === bookId);
  };

  // محاسبه میانگین امتیاز یک کتاب
  const getAverageRating = (bookId) => {
    const bookRatings = getBookRatings(bookId);
    
    if (bookRatings.length === 0) {
      return 0;
    }
    
    const sum = bookRatings.reduce((total, rating) => total + rating.rating, 0);
    return sum / bookRatings.length;
  };

  // دریافت امتیازهای یک کاربر
  const getUserRatings = (userId) => {
    return ratings.filter(rating => rating.userId === userId);
  };

  // دریافت امتیاز کاربر برای یک کتاب خاص
  const getUserRatingForBook = (userId, bookId) => {
    return ratings.find(
      rating => rating.userId === userId && rating.bookId === bookId
    ) || null;
  };

  return (
    <RatingContext.Provider
      value={{
        ratings,
        loading,
        error,
        addRating,
        deleteRating,
        getBookRatings,
        getAverageRating,
        getUserRatings,
        getUserRatingForBook
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

// Hook برای استفاده از RatingContext
export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error('useRating باید درون RatingProvider استفاده شود');
  }
  return context;
};
