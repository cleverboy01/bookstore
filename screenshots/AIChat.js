// This is a placeholder image for the AI chat support feature
// In a real project, this would be a screenshot of the actual chat interface
const AIChatImage = () => {
  return (
    <div style={{ 
      width: '800px', 
      height: '600px', 
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: '10' }}>
        <button style={{ 
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
          💬
        </button>
      </div>
      
      <div style={{ 
        position: 'absolute',
        bottom: '90px',
        right: '20px',
        width: '350px',
        height: '450px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ 
          backgroundColor: '#3498db',
          color: 'white',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'white',
            color: '#3498db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            marginLeft: '1rem'
          }}>
            📚
          </div>
          <div>
            <h2 style={{ margin: '0', fontSize: '1.2rem' }}>مشاور عمومی کتاب</h2>
          </div>
          <button style={{ 
            marginRight: 'auto',
            background: 'none',
            border: '1px solid white',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem'
          }}>
            تغییر مشاور
          </button>
        </div>
        
        <div style={{ 
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ 
            alignSelf: 'flex-start',
            maxWidth: '70%',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            <div>سلام! من مشاور عمومی کتاب هستم. چطور می‌توانم به شما کمک کنم؟</div>
            <div style={{ fontSize: '0.7rem', color: '#7f8c8d', marginTop: '0.25rem', textAlign: 'right' }}>14:30</div>
          </div>
          
          <div style={{ 
            alignSelf: 'flex-end',
            maxWidth: '70%',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: '#3498db',
            color: 'white',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            <div>سلام! می‌خواهم درباره کتاب‌های گابریل گارسیا مارکز بدانم. کدام کتاب او را پیشنهاد می‌کنید؟</div>
            <div style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '0.25rem', textAlign: 'left' }}>14:31</div>
          </div>
          
          <div style={{ 
            alignSelf: 'flex-start',
            maxWidth: '70%',
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            <div>گابریل گارسیا مارکز یکی از بزرگترین نویسندگان قرن بیستم است. معروف‌ترین اثر او "صد سال تنهایی" است که شاهکار ادبیات جهان محسوب می‌شود. همچنین "عشق سال‌های وبا" و "پاییز پدرسالار" نیز از آثار برجسته او هستند. اگر تازه می‌خواهید با آثار مارکز آشنا شوید، پیشنهاد می‌کنم با "صد سال تنهایی" شروع کنید.</div>
            <div style={{ fontSize: '0.7rem', color: '#7f8c8d', marginTop: '0.25rem', textAlign: 'right' }}>14:32</div>
          </div>
        </div>
        
        <div style={{ 
          padding: '1rem',
          borderTop: '1px solid #e9ecef',
          display: 'flex'
        }}>
          <input style={{ 
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '20px',
            fontSize: '1rem'
          }} placeholder="پیام خود را بنویسید..." />
          <button style={{ 
            marginRight: '0.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            ارسال
          </button>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#3498db', 
        color: 'white', 
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>فروشگاه کتاب آنلاین</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>ورود</div>
          <div>ثبت‌نام</div>
          <div>سبد خرید</div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', flex: 1 }}>
        <h2 style={{ marginBottom: '1rem' }}>کتاب‌های پرفروش</h2>
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          overflowX: 'auto',
          padding: '0.5rem'
        }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ 
              width: '200px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                height: '250px', 
                backgroundColor: '#ddd',
                borderRadius: '4px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
              }}>
                تصویر کتاب
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>عنوان کتاب {i}</h3>
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>نویسنده کتاب</p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 'bold' }}>120,000 تومان</span>
                <button style={{ 
                  backgroundColor: '#3498db', 
                  color: 'white',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  افزودن به سبد
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIChatImage;
