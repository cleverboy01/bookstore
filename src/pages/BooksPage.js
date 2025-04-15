import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookCard from '../components/book/BookCard';
import Pagination from '../components/ui/Pagination';
import { useCart } from '../context/CartContext';
import { FaFilter, FaSort } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

// داده‌های نمونه برای کتاب‌ها
const sampleBooks = [
  {
    id: 1,
    title: 'صد سال تنهایی',
    author: 'گابریل گارسیا مارکز',
    price: 120000,
    discount: 15,
    rating: 4.5,
    ratingCount: 120,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'fiction'
  },
  {
    id: 2,
    title: 'خشم و هیاهو',
    author: 'ویلیام فاکنر',
    price: 85000,
    discount: 0,
    rating: 4.2,
    ratingCount: 98,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'fiction'
  },
  {
    id: 3,
    title: 'تاریخ ایران باستان',
    author: 'حسن پیرنیا',
    price: 150000,
    discount: 10,
    rating: 4.7,
    ratingCount: 65,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'history'
  },
  {
    id: 4,
    title: 'روانشناسی شادی',
    author: 'مارتین سلیگمن',
    price: 95000,
    discount: 5,
    rating: 4.4,
    ratingCount: 112,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'psychology'
  },
  {
    id: 5,
    title: 'فیزیک کوانتوم برای مبتدیان',
    author: 'استیون هاوکینگ',
    price: 180000,
    discount: 20,
    rating: 4.8,
    ratingCount: 75,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'science'
  },
  {
    id: 6,
    title: 'ماجراهای تام سایر',
    author: 'مارک تواین',
    price: 75000,
    discount: 0,
    rating: 4.3,
    ratingCount: 88,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'children'
  },
  {
    id: 7,
    title: 'بوف کور',
    author: 'صادق هدایت',
    price: 65000,
    discount: 0,
    rating: 4.6,
    ratingCount: 145,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'fiction'
  },
  {
    id: 8,
    title: 'جنگ و صلح',
    author: 'لئو تولستوی',
    price: 210000,
    discount: 25,
    rating: 4.9,
    ratingCount: 132,
    image: 'https://via.placeholder.com/300x400?text=Book+Cover',
    category: 'fiction'
  }
];

const BooksPage = () => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // شبیه‌سازی دریافت داده‌ها از API
  useEffect(() => {
    // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
    setBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
  }, []);
  
  // فیلتر و مرتب‌سازی کتاب‌ها
  useEffect(() => {
    let result = [...books];
    
    // فیلتر بر اساس دسته‌بندی
    if (category !== 'all') {
      result = result.filter(book => book.category === category);
    }
    
    // مرتب‌سازی
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // در یک پروژه واقعی، مرتب‌سازی بر اساس تاریخ انجام می‌شود
        result.sort((a, b) => b.id - a.id);
        break;
    }
    
    setFilteredBooks(result);
    setCurrentPage(1); // بازگشت به صفحه اول پس از تغییر فیلترها
  }, [category, sortBy, books]);
  
  // محاسبه کتاب‌های صفحه فعلی
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  
  // تغییر صفحه
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // اسکرول به بالای صفحه
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <PageContainer>
      <PageTitle>کتاب‌ها</PageTitle>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterButton>
            <FaFilter />
            <span>فیلتر</span>
          </FilterButton>
          
          <FilterSelect 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">همه دسته‌بندی‌ها</option>
            <option value="fiction">داستان و رمان</option>
            <option value="science">علمی</option>
            <option value="history">تاریخی</option>
            <option value="psychology">روانشناسی</option>
            <option value="children">کودک و نوجوان</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterButton>
            <FaSort />
            <span>مرتب‌سازی</span>
          </FilterButton>
          
          <FilterSelect 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">جدیدترین</option>
            <option value="price-low">قیمت: کم به زیاد</option>
            <option value="price-high">قیمت: زیاد به کم</option>
            <option value="rating">بیشترین امتیاز</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      {currentBooks.length > 0 ? (
        <BooksGrid>
          {currentBooks.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              onAddToCart={addToCart} 
            />
          ))}
        </BooksGrid>
      ) : (
        <NoResults>
          <p>کتابی یافت نشد!</p>
        </NoResults>
      )}
      
      {filteredBooks.length > booksPerPage && (
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(filteredBooks.length / booksPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </PageContainer>
  );
};

export default BooksPage;
