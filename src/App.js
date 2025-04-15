import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import AIChat from './components/chat/AIChat';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import RatingPage from './pages/RatingPage';
import LanguagePage from './pages/LanguagePage';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { EscrowProvider } from './context/EscrowContext';
import { RatingProvider } from './context/RatingContext';
import { AIChatProvider } from './context/AIChatContext';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: 1rem;
`;

const SidebarContainer = styled.aside`
  width: 250px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  
  &:hover {
    background-color: #2980b9;
  }
`;

function App() {
  const [showChat, setShowChat] = React.useState(false);
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  return (
    <AuthProvider>
      <CartProvider>
        <EscrowProvider>
          <RatingProvider>
            <AIChatProvider>
              <Router>
                <AppContainer>
                  <Header />
                  
                  <MainContainer>
                    <SidebarContainer>
                      <Sidebar />
                    </SidebarContainer>
                    
                    <ContentContainer>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/book/:id" element={<BookDetailPage />} />
                        <Route path="/category/:category" element={<BooksPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/order/:id" element={<OrderPage />} />
                        <Route path="/ratings" element={<RatingPage />} />
                        <Route path="/language" element={<LanguagePage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/about" element={<AboutPage />} />
                      </Routes>
                    </ContentContainer>
                  </MainContainer>
                  
                  <Footer />
                  
                  <ChatButton onClick={toggleChat}>
                    💬
                  </ChatButton>
                  
                  {showChat && (
                    <AIChat isOpen={showChat} toggleChat={toggleChat} />
                  )}
                </AppContainer>
              </Router>
            </AIChatProvider>
          </RatingProvider>
        </EscrowProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
