import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { FaGlobe } from 'react-icons/fa';

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

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const LanguageCard = styled.div`
  border: 1px solid ${props => props.active ? '#3498db' : '#ddd'};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.active ? '#f0f7ff' : 'white'};
  
  &:hover {
    border-color: #3498db;
    background-color: ${props => props.active ? '#f0f7ff' : '#f8f9fa'};
  }
`;

const LanguageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const LanguageFlag = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 1rem;
  object-fit: cover;
`;

const LanguageName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #2c3e50;
`;

const LanguageNativeName = styled.p`
  margin: 0;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
`;

const SettingItem = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SettingTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const SettingDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  margin-left: 0.5rem;
`;

const LanguagePage = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [textDirection, setTextDirection] = useState(document.dir || 'rtl');
  const [dateFormat, setDateFormat] = useState('persian');
  
  // تغییر زبان
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    
    // تنظیم جهت متن بر اساس زبان
    if (language === 'fa' || language === 'ar') {
      document.dir = 'rtl';
      setTextDirection('rtl');
    } else {
      document.dir = 'ltr';
      setTextDirection('ltr');
    }
  };
  
  // لیست زبان‌های پشتیبانی شده
  const languages = [
    {
      code: 'fa',
      name: 'Persian',
      nativeName: 'فارسی',
      flag: 'https://via.placeholder.com/64?text=IR',
      direction: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: 'https://via.placeholder.com/64?text=EN',
      direction: 'ltr'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: 'https://via.placeholder.com/64?text=AR',
      direction: 'rtl'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: 'https://via.placeholder.com/64?text=FR',
      direction: 'ltr'
    }
  ];
  
  return (
    <PageContainer>
      <PageTitle>{t('language.title')}</PageTitle>
      
      <Card>
        <CardTitle>{t('language.select')}</CardTitle>
        
        <LanguageGrid>
          {languages.map(language => (
            <LanguageCard 
              key={language.code}
              active={currentLanguage === language.code}
              onClick={() => changeLanguage(language.code)}
            >
              <LanguageHeader>
                <LanguageFlag src={language.flag} alt={language.name} />
                <div>
                  <LanguageName>{language.name}</LanguageName>
                  <LanguageNativeName>{language.nativeName}</LanguageNativeName>
                </div>
              </LanguageHeader>
              <div>
                {t('language.direction')}: {language.direction === 'rtl' ? t('language.rtl') : t('language.ltr')}
              </div>
            </LanguageCard>
          ))}
        </LanguageGrid>
      </Card>
      
      <Card>
        <CardTitle>{t('language.settings')}</CardTitle>
        
        <SettingsSection>
          <SettingItem>
            <SettingTitle>{t('language.text_direction')}</SettingTitle>
            <SettingDescription>
              {t('language.text_direction_description')}
            </SettingDescription>
            
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  checked={textDirection === 'rtl'} 
                  onChange={() => {
                    document.dir = 'rtl';
                    setTextDirection('rtl');
                  }} 
                />
                {t('language.rtl')}
              </RadioLabel>
              
              <RadioLabel>
                <RadioInput 
                  checked={textDirection === 'ltr'} 
                  onChange={() => {
                    document.dir = 'ltr';
                    setTextDirection('ltr');
                  }} 
                />
                {t('language.ltr')}
              </RadioLabel>
            </RadioGroup>
          </SettingItem>
          
          <SettingItem>
            <SettingTitle>{t('language.date_format')}</SettingTitle>
            <SettingDescription>
              {t('language.date_format_description')}
            </SettingDescription>
            
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  checked={dateFormat === 'persian'} 
                  onChange={() => setDateFormat('persian')} 
                />
                {t('language.persian_date')}
              </RadioLabel>
              
              <RadioLabel>
                <RadioInput 
                  checked={dateFormat === 'gregorian'} 
                  onChange={() => setDateFormat('gregorian')} 
                />
                {t('language.gregorian_date')}
              </RadioLabel>
            </RadioGroup>
          </SettingItem>
        </SettingsSection>
      </Card>
      
      <Card>
        <CardTitle>{t('language.preview')}</CardTitle>
        
        <div>
          <p>{t('language.preview_text')}</p>
          <p>{t('language.current_language')}: {currentLanguage}</p>
          <p>{t('language.current_direction')}: {textDirection}</p>
          <p>
            {t('language.current_date')}: {
              dateFormat === 'persian' 
                ? new Date().toLocaleDateString('fa-IR') 
                : new Date().toLocaleDateString('en-US')
            }
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default LanguagePage;
