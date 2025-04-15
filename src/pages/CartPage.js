import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useEscrow } from '../context/EscrowContext';
import Button from '../components/ui/Button';
import { Form, TextField, TextareaField } from '../components/ui/Form';
import { FaShoppingCart, FaTrash, FaCreditCard, FaLock } from 'react-icons/fa';

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

const CartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CartItems = styled.div`
  flex: 2;
  min-width: 0;
`;

const CartSummary = styled.div`
  flex: 1;
  min-width: 300px;
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

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const CartItemList = styled.div`
  margin-bottom: 1.5rem;
`;

const CartItem = styled.div`
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
  width: 100px;
  height: 140px;
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
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Price = styled.span`
  font-weight: bold;
  color: #2c3e50;
  margin-left: 0.5rem;
`;

const DiscountBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  margin: 0 0.5rem;
  font-family: inherit;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
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

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 1.5rem;
`;

const StepIndicator = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  padding: 1rem;
  background-color: ${props => props.active ? '#3498db' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  border-radius: 4px;
  margin: 0 0.5rem;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -0.5rem;
    width: 1rem;
    height: 2px;
    background-color: #ddd;
  }
  
  @media (max-width: 576px) {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;

const PaymentMethodCard = styled.div`
  border: 1px solid ${props => props.selected ? '#3498db' : '#ddd'};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
  }
`;

const PaymentMethodHeader = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentMethodRadio = styled.input.attrs({ type: 'radio' })`
  margin-left: 1rem;
`;

const PaymentMethodTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  color: #2c3e50;
`;

const PaymentMethodDescription = styled.p`
  margin-top: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const CartPage = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { createTransaction, payAndHoldFunds } = useEscrow();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('escrow');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  
  // محاسبه قیمت با تخفیف
  const calculateDiscountedPrice = (price, discount) => {
    return Math.round(price * (1 - discount / 100));
  };
  
  // محاسبه هزینه ارسال
  const shippingCost = total > 0 ? 30000 : 0;
  
  // محاسبه مبلغ نهایی
  const finalTotal = total + shippingCost;
  
  // رفتن به مرحله بعد
  const goToNextStep = () => {
    if (step === 1 && items.length === 0) {
      alert('سبد خرید شما خالی است');
      return;
    }
    
    if (step === 2 && !isAuthenticated) {
      window.location.href = '/login?redirect=cart';
      return;
    }
    
    if (step === 2 && (!address.trim() || !phone.trim())) {
      alert('لطفاً آدرس و شماره تماس خود را وارد کنید');
      return;
    }
    
    setStep(step + 1);
  };
  
  // بازگشت به مرحله قبل
  const goToPreviousStep = () => {
    setStep(step - 1);
  };
  
  // پردازش پرداخت
  const processPayment = async () => {
    setLoading(true);
    
    try {
      // ایجاد تراکنش امانی
      const order = {
        id: `order-${Date.now()}`,
        userId: user?.id || 'guest',
        sellerId: 'seller-1',
        total: finalTotal,
        items: items,
        shippingAddress: address,
        phone: phone,
        note: note,
        paymentMethod: paymentMethod,
        status: 'pending'
      };
      
      // در یک پروژه واقعی، اینجا درخواست API ارسال می‌شود
      const transaction = createTransaction(order);
      
      if (transaction) {
        // پرداخت و بلوکه کردن وجه
        const paymentSuccess = await payAndHoldFunds(transaction.id);
        
        if (paymentSuccess) {
          // پاک کردن سبد خرید
          clearCart();
          
          // رفتن به مرحله تکمیل سفارش
          setStep(4);
        } else {
          alert('خطا در پردازش پرداخت. لطفاً دوباره تلاش کنید.');
        }
      } else {
        alert('خطا در ایجاد تراکنش. لطفاً دوباره تلاش کنید.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('خطا در پردازش پرداخت. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };
  
  // نمایش مرحله فعلی
  const renderStep = () => {
    switch (step) {
      case 1: // سبد خرید
        return (
          <>
            <CartItems>
              <Card>
                <CardTitle>سبد خرید</CardTitle>
                
                {items.length > 0 ? (
                  <CartItemList>
                    {items.map(item => (
                      <CartItem key={item.id}>
                        <ItemImage src={item.image} alt={item.title} />
                        
                        <ItemDetails>
                          <ItemTitle>{item.title}</ItemTitle>
                          <ItemAuthor>{item.author}</ItemAuthor>
                          
                          <ItemPrice>
                            {item.discount > 0 ? (
                              <>
                                <Price>
                                  {calculateDiscountedPrice(item.price, item.discount).toLocaleString()} تومان
                                </Price>
                                <DiscountBadge>{item.discount}٪ تخفیف</DiscountBadge>
                              </>
                            ) : (
                              <Price>{item.price.toLocaleString()} تومان</Price>
                            )}
                          </ItemPrice>
                          
                          <ItemActions>
                            <QuantityControl>
                              <QuantityButton 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </QuantityButton>
                              
                              <QuantityInput 
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value) && value > 0) {
                                    updateQuantity(item.id, value);
                                  }
                                }}
                              />
                              
                              <QuantityButton 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </QuantityButton>
                            </QuantityControl>
                            
                            <RemoveButton onClick={() => removeFromCart(item.id)}>
                              <FaTrash style={{ marginLeft: '0.5rem' }} />
                              حذف
                            </RemoveButton>
                          </ItemActions>
                        </ItemDetails>
                      </CartItem>
                    ))}
                  </CartItemList>
                ) : (
                  <EmptyCart>
                    <p>سبد خرید شما خالی است</p>
                    <Button 
                      as="a" 
                      href="/books" 
                      variant="primary"
                      style={{ marginTop: '1rem' }}
                    >
                      مشاهده کتاب‌ها
                    </Button>
                  </EmptyCart>
                )}
              </Card>
            </CartItems>
            
            <CartSummary>
              <Card>
                <CardTitle>خلاصه سفارش</CardTitle>
                
                <SummaryRow>
                  <SummaryLabel>مجموع قیمت کالاها</SummaryLabel>
                  <SummaryValue>{total.toLocaleString()} تومان</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>هزینه ارسال</SummaryLabel>
                  <SummaryValue>{shippingCost.toLocaleString()} تومان</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>مبلغ قابل پرداخت</SummaryLabel>
                  <TotalValue>{finalTotal.toLocaleString()} تومان</TotalValue>
                </SummaryRow>
                
                <CheckoutButton 
                  variant="primary" 
                  onClick={goToNextStep}
                  disabled={items.length === 0}
                >
                  ادامه فرآیند خرید
                </CheckoutButton>
              </Card>
            </CartSummary>
          </>
        );
        
      case 2: // اطلاعات ارسال
        return (
          <>
            <CartItems>
              <Card>
                <CardTitle>اطلاعات ارسال</CardTitle>
                
                <Form>
                  <TextField
                    label="نام و نام خانوادگی"
                    value={user?.name || ''}
                    disabled
                  />
                  
                  <TextField
                    label="ایمیل"
                    type="email"
                    value={user?.email || ''}
                    disabled
                  />
                  
                  <TextField
                    label="شماره تماس"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="شماره تماس خود را وارد کنید"
                    required
                  />
                  
                  <TextareaField
                    label="آدرس"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="آدرس دقیق خود را وارد کنید"
                    required
                  />
                  
                  <TextareaField
                    label="توضیحات سفارش (اختیاری)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="توضیحات اضافی برای سفارش خود را وارد کنید"
                  />
                </Form>
              </Card>
            </CartItems>
            
            <CartSummary>
              <Card>
                <CardTitle>خلاصه سفارش</CardTitle>
                
                <SummaryRow>
                  <SummaryLabel>مجموع قیمت کالاها</SummaryLabel>
                  <SummaryValue>{total.toLocaleString()} تومان</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>هزینه ارسال</SummaryLabel>
                  <SummaryValue>{shippingCost.toLocaleString()} تومان</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>مبلغ قابل پرداخت</SummaryLabel>
                  <TotalValue>{finalTotal.toLocaleString()} تومان</TotalValue>
                </SummaryRow>
                
                <CheckoutButton 
                  variant="primary" 
                  onClick={goToNextStep}
                >
                  ادامه فرآیند خرید
                </CheckoutButton>
                
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  بازگشت به سبد خرید
                </Button>
              </Card>
            </CartSummary>
          </>
        );
        
      case 3: // پرداخت
        return (
          <>
            <CartItems>
              <Card>
                <CardTitle>انتخاب روش پرداخت</CardTitle>
                
                <PaymentMethodCard 
                  selected={paymentMethod === 'escrow'}
                  onClick={() => setPaymentMethod('escrow')}
                >
                  <PaymentMethodHeader>
                    <PaymentMethodRadio 
                      checked={paymentMethod === 'escrow'} 
                      onChange={() => setPaymentMethod('escrow')}
                    />
                    <PaymentMethodTitle>پرداخت امانی (Escrow)</PaymentMethodTitle>
                  </PaymentMethodHeader>
                  <PaymentMethodDescription>
                    در این روش، مبلغ پرداختی شما تا زمان تأیید دریافت کالا نزد سیستم به امانت نگهداری می‌شود و پس از تأیید دریافت، به فروشنده پرداخت می‌شود.
                  </PaymentMethodDescription>
                </PaymentMethodCard>
                
                <PaymentMethodCard 
                  selected={paymentMethod === 'online'}
                  onClick={() => setPaymentMethod('online')}
                >
                  <PaymentMethodHeader>
                    <PaymentMethodRadio 
                      checked={paymentMethod === 'online'} 
                      onChange={() => setPaymentMethod('online')}
                    />
                    <PaymentMethodTitle>پرداخت آنلاین</PaymentMethodTitle>
                  </PaymentMethodHeader>
                  <PaymentMethodDescription>
                    پرداخت آنلاین از طریق درگاه بانکی با تمامی کارت‌های عضو شبکه شتاب.
                  </PaymentMethodDescription>
                </PaymentMethodCard>
                
                <PaymentMethodCard 
                  selected={paymentMethod === 'cod'}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <PaymentMethodHeader>
                    <PaymentMethodRadio 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <PaymentMethodTitle>پرداخت در محل</PaymentMethodTitle>
                  </PaymentMethodHeader>
                  <PaymentMethodDescription>
                    پرداخت وجه هنگام تحویل کالا به پیک یا مأمور پست.
                  </PaymentMethodDescription>
                </PaymentMethodCard>
              </Card>
            </CartItems>
            
            <CartSummary>
              <Card>
                <CardTitle>خلاصه سفارش</CardTitle>
                
                <SummaryRow>
                  <SummaryLabel>مجموع قیمت کالاها</SummaryLabel>
                  <SummaryValue>{total.toLocaleString()} تومان</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>هزینه ارسال</SummaryLabel>
                  <SummaryValue>{shippingCost.toLocaleString()} تومان</SummaryValue>
                </SummaryRow>
                
                <SummaryRow>
                  <SummaryLabel>مبلغ قابل پرداخت</SummaryLabel>
                  <TotalValue>{finalTotal.toLocaleString()} تومان</TotalValue>
                </SummaryRow>
                
                <CheckoutButton 
                  variant="primary" 
                  onClick={processPayment}
                  disabled={loading}
                >
                  {loading ? 'در حال پردازش...' : 'پرداخت و ثبت سفارش'}
                  {!loading && <FaCreditCard style={{ marginRight: '0.5rem' }} />}
                </CheckoutButton>
                
                <Button 
                  variant="outline" 
                  onClick={goToPreviousStep}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  disabled={loading}
                >
                  بازگشت به مرحله قبل
                </Button>
              </Card>
            </CartSummary>
          </>
        );
        
      case 4: // تکمیل سفارش
        return (
          <Card style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <div style={{ fontSize: '4rem', color: '#2ecc71', marginBottom: '1rem' }}>
              ✓
            </div>
            <CardTitle>سفارش شما با موفقیت ثبت شد</CardTitle>
            <p>
              سفارش شما با شماره <strong>ORD-{Date.now()}</strong> ثبت شد و در حال پردازش است.
            </p>
            <p>
              می‌توانید وضعیت سفارش خود را از طریق پنل کاربری پیگیری کنید.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Button 
                as="a" 
                href="/profile" 
                variant="primary"
                style={{ marginLeft: '1rem' }}
              >
                پیگیری سفارش
              </Button>
              <Button 
                as="a" 
                href="/" 
                variant="outline"
              >
                بازگشت به صفحه اصلی
              </Button>
            </div>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <PageContainer>
      <PageTitle>سبد خرید</PageTitle>
      
      {step < 4 && (
        <StepIndicator>
          <Step active={step === 1}>سبد خرید</Step>
          <Step active={step === 2}>اطلاعات ارسال</Step>
          <Step active={step === 3}>پرداخت</Step>
        </StepIndicator>
      )}
      
      <CartContainer>
        {renderStep()}
      </CartContainer>
    </PageContainer>
  );
};

export default CartPage;
