import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAIChat } from '../../context/AIChatContext';

// استایل‌های پایه برای کامپوننت AIChat
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-width: calc(100vw - 40px);
  height: 500px;
  max-height: calc(100vh - 100px);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(calc(100% - 50px))'};
`;

const ChatHeader = styled.div`
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
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
  max-width: 80%;
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
  padding: 0.75rem;
  border-top: 1px solid #e9ecef;
  display: flex;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-family: inherit;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const SendButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #2980b9;
  }
`;

// کامپوننت AIChat
const AIChat = ({ isOpen, toggleChat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'سلام! چطور می‌توانم به شما کمک کنم؟',
      isUser: false,
      timestamp: new Date().toISOString()
    }
  ]);
  const messagesEndRef = React.useRef(null);
  const { sendMessage } = useAIChat();
  
  // اسکرول به آخرین پیام
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // ارسال پیام
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
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
    
    // شبیه‌سازی پاسخ هوش مصنوعی
    setTimeout(async () => {
      try {
        // استفاده از context برای ارسال پیام به هوش مصنوعی
        const aiResponse = await sendMessage('conv-123', userMessageText) || 
          'متأسفانه نمی‌توانم به این سؤال پاسخ دهم. لطفاً سؤال دیگری بپرسید.';
        
        const aiMessage = {
          id: Date.now() + 1,
          text: aiResponse,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        
        const errorMessage = {
          id: Date.now() + 1,
          text: 'متأسفانه در ارتباط با سرور مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.',
          isUser: false,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    }, 1000);
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
  
  return (
    <ChatContainer isOpen={isOpen}>
      <ChatHeader onClick={toggleChat}>
        <ChatTitle>گفتگو با مشاور هوشمند</ChatTitle>
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
        <div ref={messagesEndRef} />
      </ChatBody>
      
      <ChatFooter>
        <ChatInput
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="پیام خود را بنویسید..."
        />
        <SendButton onClick={handleSendMessage}>
          ↑
        </SendButton>
      </ChatFooter>
    </ChatContainer>
  );
};

export default AIChat;
