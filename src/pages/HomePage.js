import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBook, FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const HeroSection = styled.section`
  background-color: #3498db;
  color: white;
  padding: 4rem 1rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 576px) {
    border-radius: 4px 4px 0 0;
  }
`;

const SearchButton = styled(Button)`
  border-radius: 0 4px 4px 0;
  
  @media (max-width: 576px) {
    border-radius: 0 0 4px 4px;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 1rem;
  background-color: #f8f9fa;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const FeatureDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
`;

const CategoriesSection = styled.section`
  padding: 4rem 1rem;
`;

const CategoriesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
    z-index: 1;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const CategoryTitle = styled.h3`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: white;
  font-size: 1.2rem;
  z-index: 2;
`;

const NewBooksSection = styled.section`
  padding: 4rem 1rem;
  background-color: #f8f9fa;
`;

const NewBooksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const NewBooksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ViewAllLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NewBooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const BookCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  padding: 1rem;
`;

const BookTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const BookAuthor = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const BookPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

const DiscountBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const HomePage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // داده‌های نمونه برای کتاب‌های جدید
  const newBooks = [
    {
      id: 1,
      title: 'صد سال تنهایی',
      author: 'گابریل گارسیا مارکز',
      price: 120000,
      discount: 15,
      image: 'https://via.placeholder.com/300x400?text=Book+Cover'
    },
    {
      id: 2,
      title: 'خشم و هیاهو',
      author: 'ویلیام فاکنر',
      price: 85000,
      discount: 0,
      image: 'https://via.placeholder.com/300x400?text=Book+Cover'
    },
    {
      id: 3,
      title: 'تاریخ ایران باستان',
      author: 'حسن پیرنیا',
      price: 150000,
      discount: 10,
      image: 'https://via.placeholder.com/300x400?text=Book+Cover'
    },
    {
      id: 4,
      title: 'روانشناسی شادی',
      author: 'مارتین سلیگمن',
      price: 95000,
      discount: 5,
      image: 'https://via.placeholder.com/300x400?text=Book+Cover'
    }
  ];
  
  // داده‌های نمونه برای دسته‌بندی‌ها
  const categories = [
    {
      id: 'fiction',
      title: 'داستان و رمان',
      image: 'https://via.placeholder.com/400x200?text=Fiction'
    },
    {
      id: 'science',
      title: 'علمی',
      image: 'https://via.placeholder.com/400x200?text=Science'
    },
    {
      id: 'history',
      title: 'تاریخی',
      image: 'https://via.placeholder.com/400x200?text=History'
    },
    {
      id: 'psychology',
      title: 'روانشناسی',
      image: 'https://via.placeholder.com/400x200?text=Psychology'
    },
    {
      id: 'children',
      title: 'کودک و نوجوان',
      image: 'https://via.placeholder.com/400x200?text=Children'
    }
  ];
  
  // محاسبه قیمت با تخفیف
  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  
  // جستجوی کتاب
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/books?search=${searchQuery}`;
    }
  };
  
  return (
    <div>
      <HeroSection>
        <HeroContent>
          <HeroTitle>به کتاب‌فروشی آنلاین خوش آمدید</HeroTitle>
          <HeroSubtitle>
            بهترین مکان برای خرید و فروش کتاب‌های مورد علاقه شما
          </HeroSubtitle>
          
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="جستجوی کتاب، نویسنده یا ناشر..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton 
              variant="secondary" 
              onClick={handleSearch}
            >
              <FaSearch style={{ marginLeft: '0.5rem' }} />
              جستجو
            </SearchButton>
          </SearchContainer>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>ویژگی‌های ما</SectionTitle>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <FaBook />
              </FeatureIcon>
              <FeatureTitle>کتاب‌های متنوع</FeatureTitle>
              <FeatureDescription>
                دسترسی به هزاران کتاب در موضوعات مختلف با بهترین کیفیت و قیمت مناسب
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaShoppingBag />
              </FeatureIcon>
              <FeatureTitle>خرید امن</FeatureTitle>
              <FeatureDescription>
                سیستم پرداخت امانی برای اطمینان از رضایت خریدار و فروشنده
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaUser />
              </FeatureIcon>
              <FeatureTitle>مشاور هوشمند</FeatureTitle>
              <FeatureDescription>
                استفاده از هوش مصنوعی برای پاسخگویی به سؤالات شما درباره کتاب‌ها
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
      
      <CategoriesSection>
        <CategoriesContainer>
          <SectionTitle>دسته‌بندی‌ها</SectionTitle>
          
          <CategoriesGrid>
            {categories.map(category => (
              <CategoryCard key={category.id} to={`/category/${category.id}`}>
                <CategoryImage src={category.image} alt={category.title} />
                <CategoryTitle>{category.title}</CategoryTitle>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesContainer>
      </CategoriesSection>
      
      <NewBooksSection>
        <NewBooksContainer>
          <NewBooksHeader>
            <SectionTitle style={{ margin: 0 }}>تازه‌ترین کتاب‌ها</SectionTitle>
            <ViewAllLink to="/books">مشاهده همه</ViewAllLink>
          </NewBooksHeader>
          
          <NewBooksGrid>
            {newBooks.map(book => (
              <BookCard key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <BookImage src={book.image} alt={book.title} />
                </Link>
                <BookInfo>
                  <BookTitle>
                    <Link to={`/book/${book.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {book.title}
                    </Link>
                  </BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                  <BookPrice>
                    <Price>
                      {book.discount > 0 
                        ? calculateDiscountedPrice(book.price, book.discount).toLocaleString() 
                        : book.price.toLocaleString()} تومان
                    </Price>
                    {book.discount > 0 && (
                      <DiscountBadge>{book.discount}٪</DiscountBadge>
                    )}
                  </BookPrice>
                </BookInfo>
              </BookCard>
            ))}
          </NewBooksGrid>
        </NewBooksContainer>
      </NewBooksSection>
    </div>
  );
};

export default HomePage;
