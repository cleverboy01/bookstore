// This is a placeholder image for the homepage
// In a real project, this would be a screenshot of the actual homepage
const HomePageImage = () => {
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
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>فروشگاه کتاب آنلاین</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>ورود</div>
          <div>ثبت‌نام</div>
          <div>سبد خرید</div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', flex: 1 }}>
        <div style={{ 
          backgroundColor: '#e9ecef', 
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '1rem' }}>به فروشگاه کتاب آنلاین خوش آمدید</h1>
          <p>هزاران کتاب با بهترین قیمت و ارسال سریع</p>
          <button style={{ 
            backgroundColor: '#3498db', 
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            مشاهده کتاب‌ها
          </button>
        </div>
        
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
      
      <div style={{ 
        backgroundColor: '#2c3e50', 
        color: 'white', 
        padding: '1rem',
        textAlign: 'center'
      }}>
        تمامی حقوق محفوظ است © 1402
      </div>
    </div>
  );
};

export default HomePageImage;
