import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { Form, TextField } from '../components/ui/Form';
import Button from '../components/ui/Button';

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

const SuccessMessage = styled.div`
  color: #2ecc71;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: 4px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
  text-align: center;
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
      // شبیه‌سازی تأخیر ارسال ایمیل
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err) {
      setError('خطا در ارسال ایمیل بازیابی رمز عبور. لطفاً دوباره تلاش کنید.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer>
      <PageTitle>بازیابی رمز عبور</PageTitle>
      
      {success && (
        <SuccessMessage>
          لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً ایمیل خود را بررسی کنید.
        </SuccessMessage>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormContainer>
        {!success ? (
          <Form onSubmit={handleSubmit}>
            <TextField
              label="ایمیل"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              helperText="لینک بازیابی رمز عبور به این ایمیل ارسال خواهد شد"
              required
            />
            
            <FormFooter>
              <FormLink to="/login">بازگشت به صفحه ورود</FormLink>
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading}
              >
                {loading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
              </Button>
            </FormFooter>
          </Form>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button 
              as={Link} 
              to="/login" 
              variant="primary"
            >
              بازگشت به صفحه ورود
            </Button>
          </div>
        )}
      </FormContainer>
    </PageContainer>
  );
};

export default ForgotPasswordPage;
