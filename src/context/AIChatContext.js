import React, { createContext, useState, useContext } from 'react';

// ایجاد Context برای چت هوش مصنوعی
const AIChatContext = createContext();

// ایجاد Provider برای AIChatContext
export const AIChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ایجاد مکالمه جدید
  const createConversation = (userId, bookId = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const newConversation = {
        id: `conv-${Date.now()}`,
        userId,
        bookId,
        title: bookId ? 'گفتگو درباره کتاب' : 'گفتگوی جدید',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setConversations([...conversations, newConversation]);
      setActiveConversation(newConversation.id);
      setLoading(false);
      return newConversation.id;
    } catch (err) {
      setError('خطا در ایجاد مکالمه جدید');
      setLoading(false);
      return null;
    }
  };

  // ارسال پیام به هوش مصنوعی
  const sendMessage = async (conversationId, message) => {
    setLoading(true);
    setError(null);
    
    try {
      // یافتن مکالمه مورد نظر
      const conversationIndex = conversations.findIndex(
        conv => conv.id === conversationId
      );
      
      if (conversationIndex === -1) {
        throw new Error('مکالمه یافت نشد');
      }
      
      // افزودن پیام کاربر به مکالمه
      const userMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      // در اینجا باید درخواست به API هوش مصنوعی ارسال شود
      // این یک پاسخ شبیه‌سازی شده است
      
      // شبیه‌سازی تأخیر پاسخ هوش مصنوعی
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // پاسخ شبیه‌سازی شده هوش مصنوعی
      let aiResponse;
      
      // بررسی محتوای پیام برای ارائه پاسخ مناسب
      if (message.includes('قیمت') || message.includes('چند')) {
        aiResponse = 'قیمت این کتاب بسته به نسخه و فروشنده متفاوت است. می‌توانید قیمت‌های مختلف را در صفحه کتاب مشاهده کنید.';
      } else if (message.includes('نویسنده') || message.includes('مؤلف')) {
        aiResponse = 'برای اطلاعات دقیق درباره نویسنده، لطفاً به صفحه جزئیات کتاب مراجعه کنید.';
      } else if (message.includes('خلاصه') || message.includes('درباره')) {
        aiResponse = 'این کتاب یکی از آثار برجسته در زمینه خود است. برای مطالعه خلاصه کامل، به صفحه جزئیات کتاب مراجعه کنید.';
      } else if (message.includes('نظر') || message.includes('امتیاز')) {
        aiResponse = 'نظرات کاربران درباره این کتاب عموماً مثبت بوده است. می‌توانید نظرات و امتیازها را در بخش نظرات صفحه کتاب مشاهده کنید.';
      } else if (message.includes('سلام') || message.includes('درود')) {
        aiResponse = 'سلام! چطور می‌توانم به شما کمک کنم؟';
      } else {
        aiResponse = 'متأسفانه نمی‌توانم به این سؤال پاسخ دهم. لطفاً سؤال دیگری بپرسید یا برای اطلاعات بیشتر به صفحه جزئیات کتاب مراجعه کنید.';
      }
      
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      
      // بروزرسانی مکالمه با پیام‌های جدید
      const updatedConversations = [...conversations];
      updatedConversations[conversationIndex] = {
        ...updatedConversations[conversationIndex],
        messages: [
          ...updatedConversations[conversationIndex].messages,
          userMessage,
          aiMessage
        ],
        updatedAt: new Date().toISOString()
      };
      
      setConversations(updatedConversations);
      setLoading(false);
      return aiMessage.content;
    } catch (err) {
      setError(err.message || 'خطا در ارسال پیام');
      setLoading(false);
      return null;
    }
  };

  // دریافت مکالمه با شناسه
  const getConversation = (conversationId) => {
    return conversations.find(conv => conv.id === conversationId) || null;
  };

  // دریافت مکالمه‌های کاربر
  const getUserConversations = (userId) => {
    return conversations.filter(conv => conv.userId === userId);
  };

  // دریافت مکالمه‌های مربوط به یک کتاب
  const getBookConversations = (bookId) => {
    return conversations.filter(conv => conv.bookId === bookId);
  };

  // حذف مکالمه
  const deleteConversation = (conversationId) => {
    setLoading(true);
    setError(null);
    
    try {
      setConversations(conversations.filter(conv => conv.id !== conversationId));
      
      if (activeConversation === conversationId) {
        setActiveConversation(null);
      }
      
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در حذف مکالمه');
      setLoading(false);
      return false;
    }
  };

  // تغییر عنوان مکالمه
  const updateConversationTitle = (conversationId, newTitle) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedConversations = conversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            title: newTitle,
            updatedAt: new Date().toISOString()
          };
        }
        return conv;
      });
      
      setConversations(updatedConversations);
      setLoading(false);
      return true;
    } catch (err) {
      setError('خطا در بروزرسانی عنوان مکالمه');
      setLoading(false);
      return false;
    }
  };

  return (
    <AIChatContext.Provider
      value={{
        conversations,
        activeConversation,
        loading,
        error,
        createConversation,
        sendMessage,
        getConversation,
        getUserConversations,
        getBookConversations,
        deleteConversation,
        updateConversationTitle,
        setActiveConversation
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

// Hook برای استفاده از AIChatContext
export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error('useAIChat باید درون AIChatProvider استفاده شود');
  }
  return context;
};
