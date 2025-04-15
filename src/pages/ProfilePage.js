import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaShoppingBag, FaHeart, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Form, TextField } from '../components/ui/Form';

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

const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileSidebar = styled.div`
  flex: 0 0 250px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ProfileContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ProfileInfo = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1rem auto;
`;

const ProfileName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ProfileEmail = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const ProfileMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProfileMenuItem = styled.li`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ProfileMenuLink = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  width: 100%;
  background-color: ${props => props.active ? '#f0f7ff' : 'transparent'};
  color: ${props => props.active ? '#3498db' : '#2c3e50'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: right;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f0f7ff;
    color: #3498db;
  }
`;

const MenuIcon = styled.span`
  margin-left: 0.75rem;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // شبیه‌سازی دریافت اطلاعات کاربر
  useEffect(() => {
    if (user) {
      setName(user.name || 'کاربر نمونه');
      setEmail(user.email || 'user@example.com');
      setPhone('09123456789');
      setAddress('تهران، خیابان انقلاب');
    }
  }, [user]);
  
  // خروج از حساب کاربری
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  // بروزرسانی پروفایل
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
    alert('پروفایل با موفقیت بروزرسانی شد');
  };
  
  // نمایش محتوای تب فعال
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileCard>
            <CardTitle>اطلاعات شخصی</CardTitle>
            <Form onSubmit={handleUpdateProfile}>
              <TextField
                label="نام و نام خانوادگی"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              
              <TextField
                label="ایمیل"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              
              <TextField
                label="شماره تماس"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              
              <TextField
                label="آدرس"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              
              <FormActions>
                <Button type="submit" variant="primary">
                  بروزرسانی اطلاعات
                </Button>
              </FormActions>
            </Form>
          </ProfileCard>
        );
        
      case 'orders':
        return (
          <ProfileCard>
            <CardTitle>سفارش‌های من</CardTitle>
            <p>شما هنوز سفارشی ثبت نکرده‌اید.</p>
          </ProfileCard>
        );
        
      case 'wishlist':
        return (
          <ProfileCard>
            <CardTitle>علاقه‌مندی‌های من</CardTitle>
            <p>شما هنوز کتابی به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
          </ProfileCard>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <PageContainer>
      <PageTitle>حساب کاربری</PageTitle>
      
      <ProfileContainer>
        <ProfileSidebar>
          <ProfileCard>
            <ProfileInfo>
              <ProfileAvatar>
                <FaUser />
              </ProfileAvatar>
              <ProfileName>{name}</ProfileName>
              <ProfileEmail>{email}</ProfileEmail>
            </ProfileInfo>
            
            <ProfileMenu>
              <ProfileMenuItem>
                <ProfileMenuLink 
                  active={activeTab === 'profile'} 
                  onClick={() => setActiveTab('profile')}
                >
                  <MenuIcon><FaUser /></MenuIcon>
                  اطلاعات شخصی
                </ProfileMenuLink>
              </ProfileMenuItem>
              
              <ProfileMenuItem>
                <ProfileMenuLink 
                  active={activeTab === 'orders'} 
                  onClick={() => setActiveTab('orders')}
                >
                  <MenuIcon><FaShoppingBag /></MenuIcon>
                  سفارش‌های من
                </ProfileMenuLink>
              </ProfileMenuItem>
              
              <ProfileMenuItem>
                <ProfileMenuLink 
                  active={activeTab === 'wishlist'} 
                  onClick={() => setActiveTab('wishlist')}
                >
                  <MenuIcon><FaHeart /></MenuIcon>
                  علاقه‌مندی‌ها
                </ProfileMenuLink>
              </ProfileMenuItem>
              
              <ProfileMenuItem>
                <ProfileMenuLink onClick={handleLogout}>
                  <MenuIcon><FaSignOutAlt /></MenuIcon>
                  خروج از حساب کاربری
                </ProfileMenuLink>
              </ProfileMenuItem>
            </ProfileMenu>
          </ProfileCard>
        </ProfileSidebar>
        
        <ProfileContent>
          {renderTabContent()}
        </ProfileContent>
      </ProfileContainer>
    </PageContainer>
  );
};

export default ProfilePage;
