import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #ecf0f1;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0.5rem;
  width: 40%;
  
  @media (max-width: 768px) {
    width: 50%;
  }
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  padding-right: 0.5rem;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  
  &:hover {
    color: #2c3e50;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #ecf0f1;
  }
  
  &:last-child {
    margin-right: 0;
  }
  
  @media (max-width: 576px) {
    margin-right: 1rem;
  }
`;

const CartBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.1rem 0.4rem;
  font-size: 0.7rem;
  margin-right: 0.5rem;
`;

const IconText = styled.span`
  margin-right: 0.5rem;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const { itemCount } = useCart();
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">کتاب‌فروشی آنلاین</Logo>
        
        <SearchBar>
          <SearchInput placeholder={t('search')} />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchBar>
        
        <NavLinks>
          {isAuthenticated ? (
            <NavLink to="/profile">
              <FaUser />
              <IconText>{user?.name || t('profile')}</IconText>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <FaUser />
              <IconText>{t('login')}</IconText>
            </NavLink>
          )}
          
          <NavLink to="/cart">
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
            <FaShoppingCart />
            <IconText>{t('cart')}</IconText>
          </NavLink>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
