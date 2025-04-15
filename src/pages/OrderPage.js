import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEscrow } from '../context/EscrowContext';
import Button from '../components/ui/Button';
import { FaBox, FaCheck, FaTimes, FaTruck, FaMoneyBillWave } from 'react-icons/fa';

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

const OrderDetails = styled.div`
  margin-bottom: 2rem;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const OrderInfoColumn = styled.div`
  flex: 1;
  min-width: 250px;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  margin-left: 0.5rem;
`;

const InfoValue = styled.span`
  color: #7f8c8d;
`;

const OrderItemList = styled.div`
  margin-bottom: 2rem;
`;

const OrderItem = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 1rem;
  
  @media (max-width: 576px) {
    margin-bottom: 1rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ItemAuthor = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #2c3e50;
`;

const ItemQuantity = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const OrderSummary = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
    font-weight: bold;
  }
`;

const SummaryLabel = styled.span`
  color: #7f8c8d;
`;

const SummaryValue = styled.span`
  color: #2c3e50;
`;

const TotalValue = styled.span`
  color: #e74c3c;
  font-size: 1.2rem;
`;

const OrderStatus = styled.div`
  margin-bottom: 2rem;
`;

const StatusTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const StatusSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 24px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #ddd;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    
    &::before {
      display: none;
    }
  }
`;

const StatusStep = styled.div`
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    text-align: right;
  }
`;

const StepIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#3498db' : props.completed ? '#2ecc71' : '#f8f9fa'};
  color: ${props => props.active || props.completed ? 'white' : '#7f8c8d'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 0.5rem auto;
  
  @media (max-width: 768px) {
    margin: 0 1rem 0 0;
  }
`;

const StepLabel = styled.div`
  color: ${props => props.active ? '#3498db' : props.completed ? '#2ecc71' : '#7f8c8d'};
  font-weight: ${props => props.active || props.completed ? 'bold' : 'normal'};
`;

const StepDate = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getTransaction, confirmDelivery, releaseFunds } = useEscrow();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // شبیه‌سازی دریافت اطلاعات سفارش
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      
      try {
        // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
        const transaction = getTransaction(id);
        
        if (transaction) {
          // شبیه‌سازی تأخیر دریافت داده‌ها
          setTimeout(() => {
            setOrder({
              id: 'ORD-123456',
              date: '1402/01/15',
              status: 'processing',
              paymentMethod: 'escrow',
              paymentStatus: 'paid',
              escrowStatus: 'held',
              items: [
                {
                  id: 1,
                  title: 'صد سال تنهایی',
                  author: 'گابریل گارسیا مارکز',
                  price: 120000,
                  discount: 15,
                  quantity: 1,
                  image: 'https://via.placeholder.com/300x400?text=Book+Cover'
                },
                {
                  id: 2,
                  title: 'خشم و هیاهو',
                  author: 'ویلیام فاکنر',
                  price: 85000,
                  discount: 0,
                  quantity: 2,
                  image: 'https://via.placeholder.com/300x400?text=Book+Cover'
                }
              ],
              total: 246500,
              shippingCost: 30000,
              finalTotal: 276500,
              shippingAddress: 'تهران، خیابان انقلاب، کوچه بهار، پلاک 12، واحد 3',
              phone: '09123456789',
              note: 'لطفاً با پیک هماهنگ شود',
              buyer: {
                id: 'user-1',
                name: 'محمدرضا کاظمی',
                email: 'ali@example.com'
              },
              seller: {
                id: 'seller-1',
                name: 'کتابفروشی دانش',
                email: 'info@danesh.com'
              },
              timeline: [
                {
                  status: 'ordered',
                  date: '1402/01/15',
                  time: '14:30',
                  completed: true
                },
                {
                  status: 'processing',
                  date: '1402/01/16',
                  time: '10:15',
                  completed: true
                },
                {
                  status: 'shipped',
                  date: '1402/01/18',
                  time: '09:45',
                  completed: false
                },
                {
                  status: 'delivered',
                  date: '',
                  time: '',
                  completed: false
                }
              ]
            });
            setLoading(false);
          }, 1000);
        } else {
          setOrder(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id, getTransaction]);
  
  // محاسبه قیمت با تخفیف
  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  
  // تأیید دریافت سفارش
  const handleConfirmDelivery = async () => {
    if (window.confirm('آیا از دریافت سفارش اطمینان دارید؟')) {
      try {
        // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
        const success = await confirmDelivery(order.id);
        
        if (success) {
          // بروزرسانی وضعیت سفارش
          setOrder(prevOrder => ({
            ...prevOrder,
            status: 'delivered',
            timeline: prevOrder.timeline.map(item => 
              item.status === 'delivered' 
                ? { ...item, completed: true, date: new Date().toLocaleDateString('fa-IR'), time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) }
                : item
            )
          }));
          
          alert('دریافت سفارش با موفقیت تأیید شد');
        } else {
          alert('خطا در تأیید دریافت سفارش. لطفاً دوباره تلاش کنید.');
        }
      } catch (err) {
        console.error('Error confirming delivery:', err);
        alert('خطا در تأیید دریافت سفارش. لطفاً دوباره تلاش کنید.');
      }
    }
  };
  
  // آزادسازی وجه
  const handleReleaseFunds = async () => {
    if (window.confirm('آیا از آزادسازی وجه اطمینان دارید؟')) {
      try {
        // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
        const success = await releaseFunds(order.id);
        
        if (success) {
          // بروزرسانی وضعیت سفارش
          setOrder(prevOrder => ({
            ...prevOrder,
            escrowStatus: 'released'
          }));
          
          alert('وجه با موفقیت آزاد شد');
        } else {
          alert('خطا در آزادسازی وجه. لطفاً دوباره تلاش کنید.');
        }
      } catch (err) {
        console.error('Error releasing funds:', err);
        alert('خطا در آزادسازی وجه. لطفاً دوباره تلاش کنید.');
      }
    }
  };
  
  // نمایش وضعیت فعلی سفارش
  const getStatusStep = () => {
    switch (order?.status) {
      case 'ordered':
        return 0;
      case 'processing':
        return 1;
      case 'shipped':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };
  
  // نمایش لودینگ
  if (loading) {
    return (
      <PageContainer>
        <p>در حال بارگذاری...</p>
      </PageContainer>
    );
  }
  
  // نمایش پیام خطا اگر سفارش یافت نشد
  if (!order) {
    return (
      <PageContainer>
        <p>سفارش مورد نظر یافت نشد!</p>
      </PageContainer>
    );
  }
  
  const currentStep = getStatusStep();
  
  return (
    <PageContainer>
      <PageTitle>جزئیات سفارش</PageTitle>
      
      <Card>
        <CardTitle>وضعیت سفارش #{order.id}</CardTitle>
        
        <OrderStatus>
          <StatusTitle>پیگیری سفارش</StatusTitle>
          
          <StatusSteps>
            <StatusStep>
              <StepIcon completed={currentStep >= 0}>
                <FaBox />
              </StepIcon>
              <StepLabel completed={currentStep >= 0}>ثبت سفارش</StepLabel>
              <StepDate>{order.timeline[0].date} {order.timeline[0].time}</StepDate>
            </StatusStep>
            
            <StatusStep>
              <StepIcon active={currentStep === 1} completed={currentStep > 1}>
                <FaCheck />
              </StepIcon>
              <StepLabel active={currentStep === 1} completed={currentStep > 1}>پردازش سفارش</StepLabel>
              <StepDate>{order.timeline[1].date} {order.timeline[1].time}</StepDate>
            </StatusStep>
            
            <StatusStep>
              <StepIcon active={currentStep === 2} completed={currentStep > 2}>
                <FaTruck />
              </StepIcon>
              <StepLabel active={currentStep === 2} completed={currentStep > 2}>ارسال سفارش</StepLabel>
              <StepDate>{order.timeline[2].date} {order.timeline[2].time}</StepDate>
            </StatusStep>
            
            <StatusStep>
              <StepIcon active={currentStep === 3} completed={currentStep > 3}>
                <FaCheck />
              </StepIcon>
              <StepLabel active={currentStep === 3} completed={currentStep > 3}>تحویل سفارش</StepLabel>
              <StepDate>{order.timeline[3].date} {order.timeline[3].time}</StepDate>
            </StatusStep>
          </StatusSteps>
          
          {order.paymentMethod === 'escrow' && (
            <div>
              <StatusTitle>وضعیت پرداخت امانی</StatusTitle>
              <p>
                {order.escrowStatus === 'held' 
                  ? 'مبلغ پرداختی شما نزد سیستم به امانت نگهداری می‌شود و پس از تأیید دریافت کالا، به فروشنده پرداخت خواهد شد.' 
                  : 'مبلغ پرداختی به فروشنده پرداخت شده است.'}
              </p>
            </div>
          )}
        </OrderStatus>
        
        <OrderDetails>
          <OrderInfo>
            <OrderInfoColumn>
              <InfoTitle>اطلاعات سفارش</InfoTitle>
              <InfoItem>
                <InfoLabel>شماره سفارش:</InfoLabel>
                <InfoValue>{order.id}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>تاریخ سفارش:</InfoLabel>
                <InfoValue>{order.date}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>وضعیت سفارش:</InfoLabel>
                <InfoValue>
                  {order.status === 'ordered' ? 'ثبت شده' :
                   order.status === 'processing' ? 'در حال پردازش' :
                   order.status === 'shipped' ? 'ارسال شده' :
                   order.status === 'delivered' ? 'تحویل داده شده' : 'نامشخص'}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>روش پرداخت:</InfoLabel>
                <InfoValue>
                  {order.paymentMethod === 'escrow' ? 'پرداخت امانی' :
                   order.paymentMethod === 'online' ? 'پرداخت آنلاین' :
                   order.paymentMethod === 'cod' ? 'پرداخت در محل' : 'نامشخص'}
                </InfoValue>
              </InfoItem>
            </OrderInfoColumn>
            
            <OrderInfoColumn>
              <InfoTitle>اطلاعات ارسال</InfoTitle>
              <InfoItem>
                <InfoLabel>نام گیرنده:</InfoLabel>
                <InfoValue>{order.buyer.name}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>آدرس:</InfoLabel>
                <InfoValue>{order.shippingAddress}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>شماره تماس:</InfoLabel>
                <InfoValue>{order.phone}</InfoValue>
              </InfoItem>
              {order.note && (
                <InfoItem>
                  <InfoLabel>توضیحات:</InfoLabel>
                  <InfoValue>{order.note}</InfoValue>
                </InfoItem>
              )}
            </OrderInfoColumn>
          </OrderInfo>
          
          <OrderItemList>
            <InfoTitle>اقلام سفارش</InfoTitle>
            
            {order.items.map(item => (
              <OrderItem key={item.id}>
                <ItemImage src={item.image} alt={item.title} />
                
                <ItemDetails>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemAuthor>{item.author}</ItemAuthor>
                  
                  <ItemPrice>
                    {item.discount > 0 
                      ? calculateDiscountedPrice(item.price, item.discount).toLocaleString() 
                      : item.price.toLocaleString()} تومان
                    <ItemQuantity> × {item.quantity}</ItemQuantity>
                  </ItemPrice>
                </ItemDetails>
              </OrderItem>
            ))}
          </OrderItemList>
          
          <OrderSummary>
            <SummaryRow>
              <SummaryLabel>مجموع قیمت کالاها</SummaryLabel>
              <SummaryValue>{order.total.toLocaleString()} تومان</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>هزینه ارسال</SummaryLabel>
              <SummaryValue>{order.shippingCost.toLocaleString()} تومان</SummaryValue>
            </SummaryRow>
            
            <SummaryRow>
              <SummaryLabel>مبلغ کل</SummaryLabel>
              <TotalValue>{order.finalTotal.toLocaleString()} تومان</TotalValue>
            </SummaryRow>
          </OrderSummary>
        </OrderDetails>
        
        <ActionButtons>
          {order.status === 'shipped' && user?.id === order.buyer.id && (
            <Button 
              variant="primary" 
              onClick={handleConfirmDelivery}
            >
              تأیید دریافت سفارش
            </Button>
          )}
          
          {order.status === 'delivered' && 
           order.paymentMethod === 'escrow' && 
           order.escrowStatus === 'held' && 
           user?.id === order.seller.id && (
            <Button 
              variant="primary" 
              onClick={handleReleaseFunds}
            >
              <FaMoneyBillWave style={{ marginLeft: '0.5rem' }} />
              آزادسازی وجه
            </Button>
          )}
          
          <Button 
            as="a" 
            href="/profile" 
            variant="outline"
          >
            بازگشت به پروفایل
          </Button>
        </ActionButtons>
      </Card>
    </PageContainer>
  );
};

export default OrderPage;
