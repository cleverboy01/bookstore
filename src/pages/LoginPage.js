import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Form, TextField } from '../components/ui/Form';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
`;

const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FormLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FormDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  
  span {
    padding: 0 1rem;
    color: #7f8c8d;
  }
`;

const SocialLoginButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SocialButton = styled(Button)`
  flex: 1;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  text-align: center;
`;

const LoginPage = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        // در صورت موفقیت، هدایت به صفحه اصلی
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <PageTitle>ورود به حساب کاربری</PageTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="ایمیل"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل خود را وارد کنید"
            required
          />
          
          <TextField
            label="رمز عبور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          
          <FormFooter>
            <FormLink to="/forgot-password">فراموشی رمز عبور</FormLink>
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              {loading ? 'در حال ورود...' : 'ورود'}
              {!loading && <FaSignInAlt style={{ marginRight: '0.5rem' }} />}
            </Button>
          </FormFooter>
        </Form>
      </FormContainer>
      
      <FormDivider>
        <span>یا</span>
      </FormDivider>
      
      <SocialLoginButtons>
        <SocialButton variant="outline">
          ورود با گوگل
        </SocialButton>
        <SocialButton variant="outline">
          ورود با فیسبوک
        </SocialButton>
      </SocialLoginButtons>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        حساب کاربری ندارید؟{' '}
        <FormLink to="/register">ثبت نام کنید</FormLink>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
