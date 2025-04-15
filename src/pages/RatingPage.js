import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useRating } from '../context/RatingContext';
import Button from '../components/ui/Button';
import { Form, TextareaField } from '../components/ui/Form';

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

const ReviewsContainer = styled.div`
  margin-bottom: 2rem;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 1.5rem 0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ReviewAuthor = styled.span`
  font-weight: bold;
`;

const ReviewDate = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ReviewRating = styled.div`
  color: #f39c12;
  margin-bottom: 0.5rem;
`;

const ReviewContent = styled.p`
  line-height: 1.6;
`;

const WriteReviewContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const RatingInput = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const RatingButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.active ? '#f39c12' : '#ddd'};
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f39c12;
  }
`;

const NoReviews = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
`;

const BookRatingStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RatingSummary = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AverageRating = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const TotalRatings = styled.div`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  color: #f39c12;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const RatingDistribution = styled.div`
  flex: 2;
  min-width: 300px;
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const RatingLabel = styled.div`
  width: 60px;
  text-align: right;
  margin-left: 1rem;
`;

const RatingBarOuter = styled.div`
  flex: 1;
  height: 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
`;

const RatingBarInner = styled.div`
  height: 100%;
  background-color: #f39c12;
  width: ${props => props.percentage}%;
`;

const RatingPercentage = styled.div`
  width: 60px;
  text-align: left;
  margin-right: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const RatingPage = () => {
  const { getBookRatings, addRating } = useRating();
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0]
  });
  
  // شبیه‌سازی دریافت نظرات و امتیازات
  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      
      try {
        // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
        const bookRatings = getBookRatings('book-1');
        
        // شبیه‌سازی تأخیر دریافت داده‌ها
        setTimeout(() => {
          const sampleRatings = [
            {
              id: 1,
              userId: 'user-1',
              userName: 'محمدرضا کاظمی',
              rating: 5,
              review: 'یکی از بهترین کتاب‌هایی که تا به حال خوانده‌ام. ترجمه روان و داستان جذاب.',
              date: '1400/03/12'
            },
            {
              id: 2,
              userId: 'user-2',
              userName: 'محمدرضا کاظمی',
              rating: 4,
              review: 'کتاب خوبی است اما گاهی پیچیدگی‌های داستان باعث سردرگمی می‌شود.',
              date: '1400/02/05'
            },
            {
              id: 3,
              userId: 'user-3',
              userName: 'محمدرضا کاظمی',
              rating: 5,
              review: 'شاهکار ادبیات جهان. خواندن این کتاب را به همه توصیه می‌کنم.',
              date: '1399/11/20'
            },
            {
              id: 4,
              userId: 'user-4',
              userName: 'محمدرضا کاظمی',
              rating: 3,
              review: 'کتاب متوسطی است. انتظار بیشتری داشتم.',
              date: '1399/10/15'
            },
            {
              id: 5,
              userId: 'user-5',
              userName: 'محمد رضایی',
              rating: 5,
              review: 'فوق‌العاده بود. یکی از بهترین آثار ادبیات جهان.',
              date: '1399/09/08'
            }
          ];
          
          setRatings(sampleRatings);
          
          // محاسبه آمار امتیازات
          const total = sampleRatings.length;
          const sum = sampleRatings.reduce((acc, curr) => acc + curr.rating, 0);
          const average = total > 0 ? sum / total : 0;
          
          // محاسبه توزیع امتیازات
          const distribution = [0, 0, 0, 0, 0];
          sampleRatings.forEach(rating => {
            distribution[rating.rating - 1]++;
          });
          
          setStats({
            average: average.toFixed(1),
            total,
            distribution: distribution.map(count => (count / total) * 100)
          });
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching ratings:', err);
        setLoading(false);
      }
    };
    
    fetchRatings();
  }, [getBookRatings]);
  
  // نمایش ستاره‌های امتیاز
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={`full-${i}`} />);
      } else {
        stars.push(<FaRegStar key={`empty-${i}`} />);
      }
    }
    
    return stars;
  };
  
  // ارسال نظر
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (userRating === 0) {
      alert('لطفاً امتیاز خود را انتخاب کنید');
      return;
    }
    
    if (!reviewText.trim()) {
      alert('لطفاً نظر خود را بنویسید');
      return;
    }
    
    setLoading(true);
    
    try {
      // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
      const success = await addRating('user-1', 'book-1', userRating, reviewText);
      
      if (success) {
        // افزودن نظر جدید به لیست نظرات
        const newRating = {
          id: Date.now(),
          userId: 'user-1',
          userName: 'کاربر فعلی',
          rating: userRating,
          review: reviewText,
          date: new Date().toLocaleDateString('fa-IR')
        };
        
        setRatings([newRating, ...ratings]);
        
        // بروزرسانی آمار امتیازات
        const newTotal = stats.total + 1;
        const newSum = ratings.reduce((acc, curr) => acc + curr.rating, 0) + userRating;
        const newAverage = newSum / newTotal;
        
        // بروزرسانی توزیع امتیازات
        const newDistribution = [...stats.distribution];
        newDistribution[userRating - 1] = ((newDistribution[userRating - 1] * stats.total / 100) + 1) / newTotal * 100;
        
        setStats({
          average: newAverage.toFixed(1),
          total: newTotal,
          distribution: newDistribution
        });
        
        // پاک کردن فرم
        setUserRating(0);
        setReviewText('');
        
        alert('نظر شما با موفقیت ثبت شد');
      } else {
        alert('خطا در ثبت نظر. لطفاً دوباره تلاش کنید.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('خطا در ثبت نظر. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };
  
  // نمایش لودینگ
  if (loading && ratings.length === 0) {
    return (
      <PageContainer>
        <p>در حال بارگذاری...</p>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageTitle>نظرات و امتیازات</PageTitle>
      
      <Card>
        <CardTitle>امتیازات کتاب "صد سال تنهایی"</CardTitle>
        
        <BookRatingStats>
          <RatingSummary>
            <AverageRating>{stats.average}</AverageRating>
            <RatingStars>{renderStars(parseFloat(stats.average))}</RatingStars>
            <TotalRatings>از مجموع {stats.total} امتیاز</TotalRatings>
          </RatingSummary>
          
          <RatingDistribution>
            {[5, 4, 3, 2, 1].map(star => (
              <RatingBar key={star}>
                <RatingLabel>{star} ستاره</RatingLabel>
                <RatingBarOuter>
                  <RatingBarInner percentage={stats.distribution[star - 1]} />
                </RatingBarOuter>
                <RatingPercentage>{Math.round(stats.distribution[star - 1])}%</RatingPercentage>
              </RatingBar>
            ))}
          </RatingDistribution>
        </BookRatingStats>
        
        <WriteReviewContainer>
          <h3>نظر خود را بنویسید</h3>
          <Form onSubmit={handleSubmitReview}>
            <RatingInput>
              {[1, 2, 3, 4, 5].map(star => (
                <RatingButton
                  key={star}
                  type="button"
                  active={star <= userRating}
                  onClick={() => setUserRating(star)}
                >
                  <FaStar />
                </RatingButton>
              ))}
            </RatingInput>
            
            <TextareaField
              label="نظر شما"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="نظر خود را درباره این کتاب بنویسید..."
            />
            
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >
              {loading ? 'در حال ثبت...' : 'ثبت نظر'}
            </Button>
          </Form>
        </WriteReviewContainer>
      </Card>
      
      <Card>
        <CardTitle>نظرات کاربران</CardTitle>
        
        <ReviewsContainer>
          {ratings.length > 0 ? (
            ratings.map(review => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewAuthor>{review.userName}</ReviewAuthor>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewHeader>
                <ReviewRating>
                  {renderStars(review.rating)}
                </ReviewRating>
                <ReviewContent>{review.review}</ReviewContent>
              </ReviewItem>
            ))
          ) : (
            <NoReviews>
              <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهد!</p>
            </NoReviews>
          )}
        </ReviewsContainer>
      </Card>
    </PageContainer>
  );
};

export default RatingPage;
