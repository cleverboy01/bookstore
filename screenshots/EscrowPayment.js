// This is a placeholder image for the escrow payment system
// In a real project, this would be a screenshot of the actual payment flow
const EscrowPaymentImage = () => {
  return (
    <div style={{ 
      width: '800px', 
      height: '600px', 
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ 
        backgroundColor: '#3498db', 
        color: 'white', 
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>سبد خرید</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>بازگشت به فروشگاه</div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', flex: 1 }}>
        <div style={{ 
          display: 'flex',
          marginBottom: '1.5rem',
          gap: '1rem'
        }}>
          <div style={{ 
            flex: 1,
            backgroundColor: '#3498db',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            سبد خرید
          </div>
          <div style={{ 
            flex: 1,
            backgroundColor: '#f0f0f0',
            padding: '0.75rem',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            اطلاعات ارسال
          </div>
          <div style={{ 
            flex: 1,
            backgroundColor: '#f0f0f0',
            padding: '0.75rem',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            پرداخت
          </div>
        </div>
        
        <div style={{ 
          display: 'flex',
          gap: '1.5rem'
        }}>
          <div style={{ 
            flex: 2,
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #eee'
            }}>
              سبد خرید
            </h2>
            
            {[1, 2].map(i => (
              <div key={i} style={{ 
                display: 'flex',
                padding: '1rem 0',
                borderBottom: '1px solid #eee'
              }}>
                <div style={{ 
                  width: '100px',
                  height: '140px',
                  backgroundColor: '#ddd',
                  borderRadius: '4px',
                  marginLeft: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666'
                }}>
                  تصویر کتاب
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>عنوان کتاب {i}</h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>نویسنده کتاب</p>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>
                      {i === 1 ? '102,000' : '85,000'} تومان
                    </span>
                    {i === 1 && (
                      <span style={{ 
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        15٪ تخفیف
                      </span>
                    )}
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button style={{ 
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>-</button>
                      
                      <input style={{ 
                        width: '40px',
                        height: '30px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        textAlign: 'center',
                        margin: '0 0.5rem'
                      }} value="1" readOnly />
                      
                      <button style={{ 
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>+</button>
                    </div>
                    
                    <button style={{ 
                      background: 'none',
                      border: 'none',
                      color: '#e74c3c',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            flex: 1,
            minWidth: '300px'
          }}>
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ 
                marginBottom: '1.5rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #eee'
              }}>
                خلاصه سفارش
              </h2>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{ color: '#7f8c8d' }}>مجموع قیمت کالاها</span>
                <span>187,000 تومان</span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{ color: '#7f8c8d' }}>هزینه ارسال</span>
                <span>30,000 تومان</span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #eee',
                fontWeight: 'bold'
              }}>
                <span style={{ color: '#7f8c8d' }}>مبلغ قابل پرداخت</span>
                <span style={{ color: '#e74c3c', fontSize: '1.2rem' }}>217,000 تومان</span>
              </div>
              
              <button style={{ 
                width: '100%',
                marginTop: '1.5rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '0.75rem',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                ادامه فرآیند خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowPaymentImage;
