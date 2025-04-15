import React from 'react';
import styled from 'styled-components';

// استایل‌های پایه برای دکمه
const ButtonBase = styled.button`
  display: inline-block;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// دکمه اصلی
const PrimaryButton = styled(ButtonBase)`
  background-color: #3498db;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`;

// دکمه ثانویه
const SecondaryButton = styled(ButtonBase)`
  background-color: #2ecc71;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #27ae60;
  }
`;

// دکمه خطر
const DangerButton = styled(ButtonBase)`
  background-color: #e74c3c;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c0392b;
  }
`;

// دکمه کمرنگ
const OutlineButton = styled(ButtonBase)`
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;
  
  &:hover:not(:disabled) {
    background-color: rgba(52, 152, 219, 0.1);
  }
`;

// دکمه لینک
const LinkButton = styled(ButtonBase)`
  background-color: transparent;
  color: #3498db;
  padding: 0;
  
  &:hover:not(:disabled) {
    color: #2980b9;
    text-decoration: underline;
  }
`;

// کامپوننت دکمه
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  ...props 
}) => {
  // انتخاب نوع دکمه بر اساس variant
  const ButtonComponent = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    danger: DangerButton,
    outline: OutlineButton,
    link: LinkButton
  }[variant] || PrimaryButton;
  
  // تنظیم سایز دکمه
  const sizeStyles = {
    small: { padding: '0.25rem 0.5rem', fontSize: '0.875rem' },
    medium: { padding: '0.5rem 1rem', fontSize: '1rem' },
    large: { padding: '0.75rem 1.5rem', fontSize: '1.125rem' }
  }[size] || {};
  
  // تنظیم عرض دکمه
  const widthStyle = fullWidth ? { width: '100%' } : {};
  
  return (
    <ButtonComponent 
      style={{ ...sizeStyles, ...widthStyle }}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
