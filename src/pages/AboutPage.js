import React from "react";
import styled from "styled-components";
import {
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
`;

const AboutSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 3px;
    background-color: #3498db;
  }
`;

const AboutContent = styled.div`
  line-height: 1.8;
  color: #333;
`;

const TeamSection = styled.section`
  margin-bottom: 3rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const MemberName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const MemberRole = styled.p`
  color: #3498db;
  margin-bottom: 0.5rem;
`;

const MemberBio = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const SocialSection = styled.section`
  margin-bottom: 3rem;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const SocialCard = styled.a`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const SocialName = styled.span`
  font-weight: bold;
`;

const ContactSection = styled.section`
  margin-bottom: 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ContactCard = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const ContactTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const ContactInfo = styled.p`
  color: #7f8c8d;
  margin: 0;
`;

const AboutPage = () => {
  const { t } = useTranslation();

  // داده‌های اعضای تیم
  const teamMembers = [
    {
      id: 1,
      name: "محمدرضا کاظمی",
      role: "مدیر عامل",
      bio: "محمدرضا بیش از 10 سال تجربه در صنعت نشر و کتاب دارد و با تأسیس این فروشگاه آنلاین، به دنبال گسترش دسترسی به کتاب برای همه است.",
      image: "https://via.placeholder.com/150?text=CEO",
    },
    {
      id: 2,
      name: "محمدرضا کاظمی",
      role: "مدیر فنی",
      bio: "محمدرضا با تخصص در توسعه وب و هوش مصنوعی، مسئول پیاده‌سازی فناوری‌های نوین در فروشگاه است.",
      image: "https://via.placeholder.com/150?text=CTO",
    },
    {
      id: 3,
      name: "محمدرضا کاظمی",
      role: "مدیر محتوا",
      bio: "محمدرضا با پیشینه ادبی قوی، مسئول انتخاب و معرفی کتاب‌های با کیفیت به کاربران است.",
      image: "https://via.placeholder.com/150?text=Editor",
    },
    {
      id: 4,
      name: "محمدرضا کاظمی",
      role: "مدیر بازاریابی",
      bio: "محمدرضا با تجربه در بازاریابی دیجیتال، مسئول استراتژی‌های بازاریابی و ارتباط با مشتریان است.",
      image: "https://via.placeholder.com/150?text=Marketing",
    },
  ];

  // داده‌های شبکه‌های اجتماعی
  const socialLinks = [
    {
      id: "twitter",
      name: "توییتر",
      url: "https://twitter.com/",
      icon: <FaTwitter />,
      color: "#1DA1F2",
    },
    {
      id: "instagram",
      name: "اینستاگرام",
      url: "https://instagram.com/mrezakazemi_",
      icon: <FaInstagram />,
      color: "#E1306C",
    },
    {
      id: "telegram",
      name: "تلگرام",
      url: "https://t.me/Mrezakazemivi",
      icon: <FaTelegram />,
      color: "#0088cc",
    },
  ];

  return (
    <PageContainer>
      <PageTitle>درباره ما</PageTitle>

      <AboutSection>
        <SectionTitle>داستان ما</SectionTitle>
        <AboutContent>
          <p>
            فروشگاه کتاب آنلاین ما در سال 1404 با هدف ایجاد پلتفرمی امن و
            کاربرپسند برای خرید و فروش کتاب تأسیس شد. ما معتقدیم که کتاب‌ها
            گنجینه‌های ارزشمندی هستند که باید در دسترس همه قرار گیرند.
          </p>
          <p>
            ما با ایجاد یک سیستم پرداخت امانی (Escrow) اطمینان حاصل می‌کنیم که
            هم خریداران و هم فروشندگان در یک محیط امن و قابل اعتماد به تبادل
            کتاب بپردازند. در این سیستم، وجه پرداختی خریدار تا زمان تأیید دریافت
            کتاب نزد ما به امانت نگهداری می‌شود و پس از تأیید، به فروشنده پرداخت
            می‌گردد.
          </p>
          <p>
            علاوه بر این، ما با استفاده از فناوری هوش مصنوعی، به کاربران خود کمک
            می‌کنیم تا کتاب‌های مورد علاقه خود را پیدا کنند و به سؤالات آن‌ها
            درباره کتاب‌ها پاسخ می‌دهیم. هدف ما ایجاد تجربه‌ای لذت‌بخش و آموزنده
            برای همه دوستداران کتاب است.
          </p>
        </AboutContent>
      </AboutSection>

      <TeamSection>
        <SectionTitle style={{ marginBottom: "30px" }}>تیم ما</SectionTitle>
        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamMember key={member.id}>
              <MemberImage src={member.image} alt={member.name} />
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
              <MemberBio>{member.bio}</MemberBio>
            </TeamMember>
          ))}
        </TeamGrid>
      </TeamSection>

      <SocialSection>
        <SectionTitle>ما را در شبکه‌های اجتماعی دنبال کنید</SectionTitle>
        <SocialGrid>
          {socialLinks.map((social) => (
            <SocialCard
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon color={social.color}>{social.icon}</SocialIcon>
              <SocialName>{social.name}</SocialName>
            </SocialCard>
          ))}
        </SocialGrid>
      </SocialSection>

      <ContactSection>
        <SectionTitle>تماس با ما</SectionTitle>
        <ContactGrid>
          <ContactCard>
            <ContactHeader>
              <ContactIcon>
                <FaEnvelope />
              </ContactIcon>
              <ContactTitle>ایمیل</ContactTitle>
            </ContactHeader>
            <ContactInfo>not available</ContactInfo>
          </ContactCard>

          <ContactCard>
            <ContactHeader>
              <ContactIcon>
                <FaPhone />
              </ContactIcon>
              <ContactTitle>تلفن</ContactTitle>
            </ContactHeader>
            <ContactInfo>not available</ContactInfo>
          </ContactCard>

          <ContactCard>
            <ContactHeader>
              <ContactIcon>
                <FaMapMarkerAlt />
              </ContactIcon>
              <ContactTitle>آدرس</ContactTitle>
            </ContactHeader>
            <ContactInfo>کرمان</ContactInfo>
          </ContactCard>
        </ContactGrid>
      </ContactSection>
    </PageContainer>
  );
};

export default AboutPage;
