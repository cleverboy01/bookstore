import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useRating } from "../context/RatingContext";
import { Form, TextareaField } from "../components/ui/Form";
import AIChat from "../components/chat/AIChat";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 2rem;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  list-style: none;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  &:not(:last-child)::after {
    content: "/";
    margin: 0 0.5rem;
    color: #7f8c8d;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    color: #7f8c8d;
  }
`;

const BookDetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BookImageContainer = styled.div`
  flex: 0 0 300px;

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
  }
`;

const BookImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const BookInfo = styled.div`
  flex: 1;
  min-width: 300px;
`;

const BookTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const BookAuthor = styled.h2`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  font-weight: normal;
`;

const BookRating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Stars = styled.div`
  color: #f39c12;
  display: flex;
  margin-left: 0.5rem;
`;

const RatingCount = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const BookPrice = styled.div`
  margin-bottom: 1.5rem;
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => (props.hasDiscount ? "#7f8c8d" : "#2c3e50")};
  text-decoration: ${(props) => (props.hasDiscount ? "line-through" : "none")};
  margin-left: 1rem;
`;

const DiscountedPrice = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #e74c3c;
`;

const DiscountBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-right: 1rem;
`;

const BookDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const BookActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const BookMeta = styled.div`
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const MetaLabel = styled.span`
  font-weight: bold;
  margin-left: 0.5rem;
  min-width: 100px;
`;

const MetaValue = styled.span`
  color: #7f8c8d;
`;

const TabsContainer = styled.div`
  margin-top: 3rem;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#3498db" : "transparent")};
  color: ${(props) => (props.active ? "#3498db" : "#7f8c8d")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const TabContent = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
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
  color: ${(props) => (props.active ? "#f39c12" : "#ddd")};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12;
  }
`;

// داده‌های نمونه برای کتاب
const sampleBook = {
  id: 1,
  title: "صد سال تنهایی",
  author: "گابریل گارسیا مارکز",
  price: 120000,
  discount: 15,
  rating: 4.5,
  ratingCount: 120,
  image: "images/sad.jpg",
  category: "fiction",
  description:
    "رمان «صد سال تنهایی» اثر گابریل گارسیا مارکز، نویسنده کلمبیایی و برنده جایزه نوبل ادبیات، یکی از شاهکارهای ادبیات جهان و از آثار برجسته سبک رئالیسم جادویی است. این رمان داستان خاندان بوئندیا را در طول هفت نسل در شهر خیالی ماکوندو روایت می‌کند. مارکز در این اثر، تاریخ، اسطوره و واقعیت را در هم می‌آمیزد و تصویری جادویی از زندگی و سرنوشت انسان ارائه می‌دهد.",
  publisher: "نشر چشمه",
  publishDate: "1399/02/15",
  pages: 432,
  language: "فارسی",
  isbn: "978-964-448-349-2",
  reviews: [
    {
      id: 1,
      author: "محمدرضا کاظمی",
      rating: 5,
      date: "1400/03/12",
      content:
        "یکی از بهترین کتاب‌هایی که تا به حال خوانده‌ام. ترجمه روان و داستان جذاب.",
    },
    {
      id: 2,
      author: "محمدرضا کاظمی",
      rating: 4,
      date: "1400/02/05",
      content: "کتاب خوبی است اما گاهی پیچیدگی‌های داستان باعث سردرگمی می‌شود.",
    },
    {
      id: 3,
      author: "محمدرضا کاظمی",
      rating: 5,
      date: "1399/11/20",
      content: "شاهکار ادبیات جهان. خواندن این کتاب را به همه توصیه می‌کنم.",
    },
  ],
};

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addRating } = useRating();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showChat, setShowChat] = useState(false);

  // شبیه‌سازی دریافت داده‌ها از API
  useEffect(() => {
    // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
    setLoading(true);

    // شبیه‌سازی تأخیر دریافت داده‌ها
    const timer = setTimeout(() => {
      setBook(sampleBook);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  // محاسبه قیمت با تخفیف
  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };

  // نمایش ستاره‌های امتیاز
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }

    return stars;
  };

  // ارسال نظر
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (userRating === 0) {
      alert("لطفاً امتیاز خود را انتخاب کنید");
      return;
    }

    if (!reviewText.trim()) {
      alert("لطفاً نظر خود را بنویسید");
      return;
    }

    // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
    addRating("user-1", book.id, userRating, reviewText);

    // پاک کردن فرم
    setUserRating(0);
    setReviewText("");

    // نمایش پیام موفقیت
    alert("نظر شما با موفقیت ثبت شد");
  };

  // نمایش لودینگ
  if (loading) {
    return (
      <PageContainer>
        <p>در حال بارگذاری...</p>
      </PageContainer>
    );
  }

  // نمایش پیام خطا اگر کتاب یافت نشد
  if (!book) {
    return (
      <PageContainer>
        <p>کتاب مورد نظر یافت نشد!</p>
        <Button onClick={() => navigate("/books")}>
          بازگشت به صفحه کتاب‌ها
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BreadcrumbNav>
        <BreadcrumbList>
          <BreadcrumbItem>
            <a href="/">صفحه اصلی</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href="/books">کتاب‌ها</a>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <a href={`/category/${book.category}`}>
              {book.category === "fiction"
                ? "داستان و رمان"
                : book.category === "science"
                ? "علمی"
                : book.category === "history"
                ? "تاریخی"
                : book.category === "psychology"
                ? "روانشناسی"
                : book.category === "children"
                ? "کودک و نوجوان"
                : book.category}
            </a>
          </BreadcrumbItem>
          <BreadcrumbItem>{book.title}</BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbNav>

      <BookDetailsContainer>
        <BookImageContainer>
          <BookImage src={book.image} alt={book.title} />
        </BookImageContainer>

        <BookInfo>
          <BookTitle>{book.title}</BookTitle>
          <BookAuthor>نویسنده: {book.author}</BookAuthor>

          <BookRating>
            <Stars>{renderStars(book.rating)}</Stars>
            <RatingCount>({book.ratingCount} نظر)</RatingCount>
          </BookRating>

          <BookPrice>
            {book.discount > 0 ? (
              <>
                <DiscountedPrice>
                  {calculateDiscountedPrice(
                    book.price,
                    book.discount
                  ).toLocaleString()}{" "}
                  تومان
                </DiscountedPrice>
                <OriginalPrice hasDiscount={true}>
                  {book.price.toLocaleString()} تومان
                </OriginalPrice>
                <DiscountBadge>{book.discount}٪ تخفیف</DiscountBadge>
              </>
            ) : (
              <OriginalPrice hasDiscount={false}>
                {book.price.toLocaleString()} تومان
              </OriginalPrice>
            )}
          </BookPrice>

          <BookDescription>
            <p>{book.description}</p>
          </BookDescription>

          <BookActions>
            <Button
              variant="primary"
              size="large"
              onClick={() => addToCart(book)}
            >
              <FaShoppingCart style={{ marginLeft: "0.5rem" }} />
              افزودن به سبد خرید
            </Button>

            <Button variant="outline" size="large">
              <FaHeart style={{ marginLeft: "0.5rem" }} />
              افزودن به علاقه‌مندی‌ها
            </Button>

            <Button variant="outline" size="large">
              <FaShare style={{ marginLeft: "0.5rem" }} />
              اشتراک‌گذاری
            </Button>
          </BookActions>

          <BookMeta>
            <MetaItem>
              <MetaLabel>ناشر:</MetaLabel>
              <MetaValue>{book.publisher}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>تاریخ انتشار:</MetaLabel>
              <MetaValue>{book.publishDate}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>تعداد صفحات:</MetaLabel>
              <MetaValue>{book.pages}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>زبان:</MetaLabel>
              <MetaValue>{book.language}</MetaValue>
            </MetaItem>
            <MetaItem>
              <MetaLabel>شابک:</MetaLabel>
              <MetaValue>{book.isbn}</MetaValue>
            </MetaItem>
          </BookMeta>

          <Button variant="secondary" onClick={() => setShowChat(!showChat)}>
            گفتگو با مشاور هوشمند درباره این کتاب
          </Button>
        </BookInfo>
      </BookDetailsContainer>

      <TabsContainer>
        <TabsHeader>
          <TabButton
            active={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          >
            توضیحات
          </TabButton>
          <TabButton
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            نظرات ({book.reviews.length})
          </TabButton>
        </TabsHeader>

        <TabContent active={activeTab === "description"}>
          <p>{book.description}</p>
        </TabContent>

        <TabContent active={activeTab === "reviews"}>
          <ReviewsContainer>
            {book.reviews.map((review) => (
              <ReviewItem key={review.id}>
                <ReviewHeader>
                  <ReviewAuthor>{review.author}</ReviewAuthor>
                  <ReviewDate>{review.date}</ReviewDate>
                </ReviewHeader>
                <ReviewRating>{renderStars(review.rating)}</ReviewRating>
                <ReviewContent>{review.content}</ReviewContent>
              </ReviewItem>
            ))}
          </ReviewsContainer>

          <WriteReviewContainer>
            <h3>نظر خود را بنویسید</h3>
            <Form onSubmit={handleSubmitReview}>
              <RatingInput>
                {[1, 2, 3, 4, 5].map((star) => (
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

              <Button type="submit" variant="primary">
                ثبت نظر
              </Button>
            </Form>
          </WriteReviewContainer>
        </TabContent>
      </TabsContainer>

      {showChat && (
        <AIChat isOpen={showChat} toggleChat={() => setShowChat(!showChat)} />
      )}
    </PageContainer>
  );
};

export default BookDetailPage;
