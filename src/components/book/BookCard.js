import React from 'react';
import styled from 'styled-components';

// استایل‌های پایه برای کارت کتاب
const CardContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const CardAuthor = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const CardPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const Price = styled.span`
  font-size: 1.1rem;
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

const CardButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const RatingStars = styled.div`
  color: #f39c12;
  margin-left: 0.5rem;
`;

const RatingCount = styled.span`
  font-size: 0.8rem;
  color: #7f8c8d;
`;

// کامپوننت کارت کتاب
const BookCard = ({ book, onAddToCart }) => {
  // محاسبه قیمت با تخفیف
  const discountedPrice = book.discount 
    ? Math.round(book.price * (1 - book.discount / 100)) 
    : book.price;
  
  // نمایش ستاره‌های امتیاز
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    
    if (hasHalfStar) {
      stars.push('⯨');
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }
    
    return stars.join('');
  };
  
  return (
    <CardContainer>
      <CardImage src={book.image} alt={book.title} />
      <CardBody>
        <CardTitle>{book.title}</CardTitle>
        <CardAuthor>{book.author}</CardAuthor>
        
        <RatingContainer>
          <RatingStars>{renderStars(book.rating)}</RatingStars>
          <RatingCount>({book.ratingCount})</RatingCount>
        </RatingContainer>
        
        <CardPrice>
          <Price>{discountedPrice.toLocaleString()} تومان</Price>
          {book.discount > 0 && (
            <DiscountBadge>{book.discount}٪ تخفیف</DiscountBadge>
          )}
        </CardPrice>
        
        <CardButton onClick={() => onAddToCart(book)}>
          افزودن به سبد خرید
        </CardButton>
      </CardBody>
    </CardContainer>
  );
};

export default BookCard;
