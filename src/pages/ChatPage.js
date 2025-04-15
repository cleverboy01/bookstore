import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaRobot, FaUser, FaBook, FaQuestion, FaInfoCircle } from 'react-icons/fa';
import { useAIChat } from '../context/AIChatContext';
import Button from '../components/ui/Button';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #3498db;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const ChatTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  margin-right: 1rem;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f8f9fa;
`;

const MessageContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background-color: ${props => props.isUser ? '#3498db' : 'white'};
  color: ${props => props.isUser ? 'white' : '#333'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
  text-align: ${props => props.isUser ? 'left' : 'right'};
`;

const ChatFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  display: flex;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SendButton = styled(Button)`
  margin-right: 0.5rem;
  border-radius: 20px;
`;

const AIOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  margin-top : 20px
`;

const AIOption = styled.div`
  flex: 1;
  min-width: 250px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const AIOptionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const AIOptionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const AIOptionTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const AIOptionDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const ChatPage = () => {
  const { sendMessage, getConversation } = useAIChat();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeAI, setActiveAI] = useState(null);
  const messagesEndRef = useRef(null);
  
  // شبیه‌سازی هوش‌های مصنوعی مختلف
  const aiOptions = [
    {
      id: 'general',
      name: 'مشاور عمومی کتاب',
      description: 'پاسخگویی به سؤالات عمومی درباره کتاب‌ها، نویسندگان و ژانرهای مختلف',
      icon: <FaBook />
    },
    {
      id: 'recommendation',
      name: 'پیشنهاددهنده کتاب',
      description: 'پیشنهاد کتاب بر اساس علایق و سلیقه شما',
      icon: <FaRobot />
    },
    {
      id: 'support',
      name: 'پشتیبانی سایت',
      description: 'پاسخگویی به سؤالات درباره سفارش، پرداخت و ارسال کتاب',
      icon: <FaQuestion />
    },
    {
      id: 'expert',
      name: 'کارشناس ادبیات',
      description: 'تحلیل و بررسی تخصصی آثار ادبی و پاسخ به سؤالات تخصصی',
      icon: <FaInfoCircle />
    }
  ];
  
  // اسکرول به آخرین پیام
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // بارگذاری پیام‌های قبلی
  useEffect(() => {
    if (activeAI) {
      // شبیه‌سازی دریافت پیام‌های قبلی
      const conversation = getConversation(activeAI.id);
      
      if (conversation && conversation.messages) {
        setMessages(conversation.messages);
      } else {
        // پیام خوشامدگویی
        setMessages([
          {
            id: 1,
            text: `سلام! من ${activeAI.name} هستم. چطور می‌توانم به شما کمک کنم؟`,
            isUser: false,
            timestamp: new Date().toISOString()
          }
        ]);
      }
    }
  }, [activeAI, getConversation]);
  
  // اسکرول به پایین پس از تغییر پیام‌ها
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // ارسال پیام
  const handleSendMessage = async () => {
    if (!message.trim() || !activeAI) return;
    
    // افزودن پیام کاربر
    const userMessage = {
      id: Date.now(),
      text: message,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const userMessageText = message;
    setMessage('');
    setLoading(true);
    
    try {
      // شبیه‌سازی پاسخ هوش مصنوعی
      let aiResponse;
      
      // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
      setTimeout(async () => {
        switch (activeAI.id) {
          case 'general':
            aiResponse = `بله، من می‌توانم به سؤالات شما درباره "${userMessageText}" پاسخ دهم. این موضوع در بسیاری از کتاب‌های معاصر مورد بررسی قرار گرفته است. آیا کتاب خاصی مد نظر دارید؟`;
            break;
          case 'recommendation':
            aiResponse = `با توجه به علاقه شما به "${userMessageText}"، کتاب‌های زیر را پیشنهاد می‌کنم:\n1. صد سال تنهایی - گابریل گارسیا مارکز\n2. بوف کور - صادق هدایت\n3. جنگ و صلح - لئو تولستوی`;
            break;
          case 'support':
            aiResponse = `درباره "${userMessageText}" باید بگویم که سفارش‌های شما معمولاً بین 2 تا 5 روز کاری تحویل داده می‌شوند. برای پیگیری سفارش می‌توانید به بخش "سفارش‌های من" در پروفایل خود مراجعه کنید.`;
            break;
          case 'expert':
            aiResponse = `از دیدگاه تخصصی، "${userMessageText}" یکی از مفاهیم کلیدی در ادبیات پسامدرن است. این مفهوم در آثار نویسندگانی چون بورخس، کالوینو و پینچون به خوبی پرداخته شده است. آیا مایلید تحلیل عمیق‌تری ارائه دهم؟`;
            break;
          default:
            aiResponse = `متأسفانه نمی‌توانم به سؤال شما درباره "${userMessageText}" پاسخ دهم. لطفاً سؤال دیگری بپرسید.`;
        }
        
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: 'متأسفانه در ارتباط با سرور مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.',
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setLoading(false);
    }
  };
  
  // ارسال پیام با فشردن Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // فرمت زمان پیام
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };
  
  // انتخاب هوش مصنوعی
  const selectAI = (ai) => {
    setActiveAI(ai);
  };
  
  return (
    <PageContainer>
      <PageTitle>گفتگو با مشاور هوشمند</PageTitle>
      
      {!activeAI ? (
        <>
          <p className='pstyle'>لطفاً یکی از مشاوران هوشمند زیر را انتخاب کنید:</p>
          
          <AIOptions>
            {aiOptions.map(ai => (
              <AIOption key={ai.id} onClick={() => selectAI(ai)}>
                <AIOptionHeader>
                  <AIOptionIcon>{ai.icon}</AIOptionIcon>
                  <AIOptionTitle>{ai.name}</AIOptionTitle>
                </AIOptionHeader>
                <AIOptionDescription>{ai.description}</AIOptionDescription>
                <Button variant="outline" fullWidth>انتخاب مشاور</Button>
              </AIOption>
            ))}
          </AIOptions>
        </>
      ) : (
        <ChatContainer>
          <ChatHeader>
            <AIOptionIcon>{activeAI.icon}</AIOptionIcon>
            <ChatTitle>{activeAI.name}</ChatTitle>
            <Button 
              variant="outline" 
              size="small"
              onClick={() => setActiveAI(null)}
              style={{ marginRight: 'auto', color: 'white', borderColor: 'white' }}
            >
              تغییر مشاور
            </Button>
          </ChatHeader>
          
          <ChatBody>
            {messages.map(msg => (
              <MessageContainer key={msg.id} isUser={msg.isUser}>
                <MessageBubble isUser={msg.isUser}>
                  {msg.text}
                  <MessageTime isUser={msg.isUser}>
                    {formatTime(msg.timestamp)}
                  </MessageTime>
                </MessageBubble>
              </MessageContainer>
            ))}
            {loading && (
              <MessageContainer isUser={false}>
                <MessageBubble isUser={false}>
                  در حال تایپ...
                </MessageBubble>
              </MessageContainer>
            )}
            <div ref={messagesEndRef} />
          </ChatBody>
          
          <ChatFooter>
            <ChatInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="پیام خود را بنویسید..."
              disabled={loading}
            />
            <SendButton 
              variant="primary" 
              onClick={handleSendMessage}
              disabled={!message.trim() || loading}
            >
              ارسال
            </SendButton>
          </ChatFooter>
        </ChatContainer>
      )}
    </PageContainer>
  );
};

export default ChatPage;
