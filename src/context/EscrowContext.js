import React, { createContext, useState, useContext } from 'react';

// ایجاد Context برای مدیریت سیستم پرداخت امانی
const EscrowContext = createContext();

// وضعیت‌های مختلف پرداخت امانی
const ESCROW_STATUS = {
  PENDING: 'pending',           // در انتظار پرداخت
  PAID: 'paid',                 // پرداخت شده (پول بلوکه شده)
  SHIPPED: 'shipped',           // ارسال شده توسط فروشنده
  DELIVERED: 'delivered',       // تحویل داده شده به خریدار
  COMPLETED: 'completed',       // تکمیل شده (پول به فروشنده منتقل شده)
  DISPUTED: 'disputed',         // اختلاف
  REFUNDED: 'refunded',         // بازگشت وجه
  CANCELLED: 'cancelled'        // لغو شده
};

// ایجاد Provider برای EscrowContext
export const EscrowProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ایجاد تراکنش جدید (بلوکه کردن پول)
  const createTransaction = (order) => {
    setLoading(true);
    setError(null);
    
    try {
      // ایجاد یک تراکنش جدید
      const newTransaction = {
        id: `tr-${Date.now()}`,
        orderId: order.id,
        buyerId: order.userId,
        sellerId: order.sellerId,
        amount: order.total,
        status: ESCROW_STATUS.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: order.items,
        history: [
          {
            status: ESCROW_STATUS.PENDING,
            timestamp: new Date().toISOString(),
            note: 'تراکنش ایجاد شد'
          }
        ]
      };
      
      setTransactions([...transactions, newTransaction]);
      setLoading(false);
      return newTransaction;
    } catch (err) {
      setError('خطا در ایجاد تراکنش');
      setLoading(false);
      return null;
    }
  };

  // پرداخت و بلوکه کردن پول
  const payAndHoldFunds = (transactionId) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId) {
          return {
            ...transaction,
            status: ESCROW_STATUS.PAID,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.PAID,
                timestamp: new Date().toISOString(),
                note: 'پرداخت انجام شد و وجه بلوکه شد'
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در پرداخت و بلوکه کردن وجه');
      setLoading(false);
      return false;
    }
  };

  // تأیید ارسال توسط فروشنده
  const confirmShipping = (transactionId) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId && transaction.status === ESCROW_STATUS.PAID) {
          return {
            ...transaction,
            status: ESCROW_STATUS.SHIPPED,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.SHIPPED,
                timestamp: new Date().toISOString(),
                note: 'ارسال توسط فروشنده تأیید شد'
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در تأیید ارسال');
      setLoading(false);
      return false;
    }
  };

  // تأیید دریافت توسط خریدار
  const confirmDelivery = (transactionId) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId && transaction.status === ESCROW_STATUS.SHIPPED) {
          return {
            ...transaction,
            status: ESCROW_STATUS.DELIVERED,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.DELIVERED,
                timestamp: new Date().toISOString(),
                note: 'دریافت توسط خریدار تأیید شد'
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در تأیید دریافت');
      setLoading(false);
      return false;
    }
  };

  // تکمیل تراکنش و انتقال وجه به فروشنده
  const completeTransaction = (transactionId) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId && transaction.status === ESCROW_STATUS.DELIVERED) {
          return {
            ...transaction,
            status: ESCROW_STATUS.COMPLETED,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.COMPLETED,
                timestamp: new Date().toISOString(),
                note: 'تراکنش تکمیل شد و وجه به فروشنده منتقل شد'
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در تکمیل تراکنش');
      setLoading(false);
      return false;
    }
  };

  // ثبت اختلاف
  const disputeTransaction = (transactionId, reason) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId && 
            [ESCROW_STATUS.PAID, ESCROW_STATUS.SHIPPED, ESCROW_STATUS.DELIVERED].includes(transaction.status)) {
          return {
            ...transaction,
            status: ESCROW_STATUS.DISPUTED,
            disputeReason: reason,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.DISPUTED,
                timestamp: new Date().toISOString(),
                note: `اختلاف ثبت شد: ${reason}`
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در ثبت اختلاف');
      setLoading(false);
      return false;
    }
  };

  // بازگشت وجه به خریدار
  const refundTransaction = (transactionId, reason) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId && 
            [ESCROW_STATUS.PAID, ESCROW_STATUS.SHIPPED, ESCROW_STATUS.DISPUTED].includes(transaction.status)) {
          return {
            ...transaction,
            status: ESCROW_STATUS.REFUNDED,
            refundReason: reason,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.REFUNDED,
                timestamp: new Date().toISOString(),
                note: `وجه به خریدار بازگردانده شد: ${reason}`
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در بازگشت وجه');
      setLoading(false);
      return false;
    }
  };

  // لغو تراکنش
  const cancelTransaction = (transactionId, reason) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedTransactions = transactions.map(transaction => {
        if (transaction.id === transactionId && transaction.status === ESCROW_STATUS.PENDING) {
          return {
            ...transaction,
            status: ESCROW_STATUS.CANCELLED,
            cancelReason: reason,
            updatedAt: new Date().toISOString(),
            history: [
              ...transaction.history,
              {
                status: ESCROW_STATUS.CANCELLED,
                timestamp: new Date().toISOString(),
                note: `تراکنش لغو شد: ${reason}`
              }
            ]
          };
        }
        return transaction;
      });
      
      setTransactions(updatedTransactions);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در لغو تراکنش');
      setLoading(false);
      return false;
    }
  };

  // دریافت تراکنش با شناسه
  const getTransaction = (transactionId) => {
    return transactions.find(transaction => transaction.id === transactionId) || null;
  };

  // دریافت تراکنش‌های کاربر
  const getUserTransactions = (userId) => {
    return transactions.filter(
      transaction => transaction.buyerId === userId || transaction.sellerId === userId
    );
  };

  return (
    <EscrowContext.Provider
      value={{
        transactions,
        loading,
        error,
        ESCROW_STATUS,
        createTransaction,
        payAndHoldFunds,
        confirmShipping,
        confirmDelivery,
        completeTransaction,
        disputeTransaction,
        refundTransaction,
        cancelTransaction,
        getTransaction,
        getUserTransactions
      }}
    >
      {children}
    </EscrowContext.Provider>
  );
};

// Hook برای استفاده از EscrowContext
export const useEscrow = () => {
  const context = useContext(EscrowContext);
  if (!context) {
    throw new Error('useEscrow باید درون EscrowProvider استفاده شود');
  }
  return context;
};
