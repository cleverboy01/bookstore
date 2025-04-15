import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  margin-bottom: 1.5rem;
  min-width: 200px;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    right: 0;
    width: 50px;
    height: 2px;
    background-color: #3498db;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: #ecf0f1;
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    color: #3498db;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  margin-left: 1rem;

  &:hover {
    color: #3498db;
  }

  &:first-child {
    margin-left: 0;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ContactIcon = styled.span`
  margin-left: 0.5rem;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>کتاب‌فروشی آنلاین</FooterTitle>
          <p>بهترین مکان برای خرید و فروش کتاب‌های مورد علاقه شما</p>
          <SocialLinks style={{ display: "flex", gap: "5px" }}>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialLink>
            <SocialLink
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>دسترسی سریع</FooterTitle>
          <FooterLink to="/">{t("home")}</FooterLink>
          <FooterLink to="/books">{t("books")}</FooterLink>
          <FooterLink to="/about">{t("about")}</FooterLink>
          <FooterLink to="/contact">{t("contact")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>حساب کاربری</FooterTitle>
          <FooterLink to="/login">{t("login")}</FooterLink>
          <FooterLink to="/register">{t("register")}</FooterLink>
          <FooterLink to="/profile">{t("profile")}</FooterLink>
          <FooterLink to="/orders">{t("orders")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>تماس با ما</FooterTitle>
          <ContactItem>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            <span>not available</span>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            <span>not available</span>
          </ContactItem>
          <ContactItem>
            <span>not available</span>
          </ContactItem>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>
          © {new Date().getFullYear()} کتاب‌فروشی آنلاین. تمامی حقوق محفوظ است.
        </p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
