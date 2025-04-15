import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// استایل‌های پایه برای کامپوننت Pagination
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const PageButton = styled.button`
  background-color: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ddd;
  padding: 0.5rem 0.75rem;
  margin: 0 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#f8f9fa'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageEllipsis = styled.span`
  padding: 0.5rem 0.75rem;
  margin: 0 0.25rem;
`;

// کامپوننت Pagination
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1
}) => {
  // تولید آرایه‌ای از شماره صفحات برای نمایش
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; // تعداد دکمه‌های صفحه + دکمه‌های اول و آخر
    const totalBlocks = totalNumbers + 2; // با احتساب دو علامت ...
    
    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      return [
        ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
        'DOTS',
        totalPages
      ];
    }
    
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      return [
        1,
        'DOTS',
        ...Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1
        )
      ];
    }
    
    if (shouldShowLeftDots && shouldShowRightDots) {
      return [
        1,
        'DOTS',
        ...Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => leftSiblingIndex + i
        ),
        'DOTS',
        totalPages
      ];
    }
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        قبلی
      </PageButton>
      
      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return <PageEllipsis key={`dots-${index}`}>...</PageEllipsis>;
        }
        
        return (
          <PageButton
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        );
      })}
      
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        بعدی
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
