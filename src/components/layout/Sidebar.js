import React from 'react';
import styled from 'styled-components';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FaHome, FaBook, FaShoppingBag, FaInfoCircle, FaComments } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SidebarContainer = styled.div`
  background-color: #f8f9fa;
  width: 250px;
  min-height: calc(100vh - 60px);
  border-left: 1px solid #e9ecef;
  padding: 1.5rem 0;
  position: sticky;
  top: 60px;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    position: static;
    border-left: none;
    border-bottom: 1px solid #e9ecef;
    padding: 1rem 0;
  }
`;

const NavLink = styled(RouterNavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #495057;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e9ecef;
    color: #212529;
  }
  
  &.active {
    background-color: #e9ecef;
    color: #3498db;
    border-right: 3px solid #3498db;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const NavIcon = styled.span`
  margin-left: 0.75rem;
  font-size: 1.2rem;
`;

const NavText = styled.span`
  font-size: 1rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1rem;
  color: #6c757d;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Sidebar = () => {
  const { t } = useTranslation();
  
  return (
    <SidebarContainer>
      <NavLink to="/" end>
        <NavIcon><FaHome /></NavIcon>
        <NavText>صفحه اصلی</NavText>
      </NavLink>
      
      <NavLink to="/books">
        <NavIcon><FaBook /></NavIcon>
        <NavText>کتاب‌ها</NavText>
      </NavLink>
      
      <CategoryTitle>دسته‌بندی‌ها</CategoryTitle>
      
      <NavLink to="/category/fiction">
        <NavText>داستان و رمان</NavText>
      </NavLink>
      
      <NavLink to="/category/science">
        <NavText>علمی</NavText>
      </NavLink>
      
      <NavLink to="/category/history">
        <NavText>تاریخی</NavText>
      </NavLink>
      
      <NavLink to="/category/psychology">
        <NavText>روانشناسی</NavText>
      </NavLink>
      
      <NavLink to="/category/children">
        <NavText>کودک و نوجوان</NavText>
      </NavLink>
      
      <CategoryTitle>حساب کاربری</CategoryTitle>
      
      <NavLink to="/orders">
        <NavIcon><FaShoppingBag /></NavIcon>
        <NavText>سفارش‌های من</NavText>
      </NavLink>
      
      <NavLink to="/about">
        <NavIcon><FaInfoCircle /></NavIcon>
        <NavText>درباره ما</NavText>
      </NavLink>
      
      <NavLink to="/chat">
        <NavIcon><FaComments /></NavIcon>
        <NavText>گفتگو با مشاور</NavText>
      </NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;
