// This is a placeholder image for the multilingual support feature
// In a real project, this would be a screenshot of the actual language selection page
const MultilingualSupportImage = () => {
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
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>تنظیمات زبان</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div>بازگشت به فروشگاه</div>
        </div>
      </div>
      
      <div style={{ padding: '1rem', flex: 1 }}>
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#2c3e50',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #eee'
          }}>
            انتخاب زبان
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: 'IR', active: true },
              { code: 'en', name: 'English', nativeName: 'English', flag: 'EN', active: false },
              { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'AR', active: false },
              { code: 'fr', name: 'French', nativeName: 'Français', flag: 'FR', active: false }
            ].map(lang => (
              <div key={lang.code} style={{ 
                border: `1px solid ${lang.active ? '#3498db' : '#ddd'}`,
                borderRadius: '8px',
                padding: '1.5rem',
                cursor: 'pointer',
                backgroundColor: lang.active ? '#f0f7ff' : 'white'
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {lang.flag}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.2rem',
                      margin: 0,
                      color: '#2c3e50'
                    }}>
                      {lang.name}
                    </h3>
                    <p style={{ 
                      margin: 0,
                      color: '#7f8c8d',
                      fontSize: '0.9rem'
                    }}>
                      {lang.nativeName}
                    </p>
                  </div>
                </div>
                <div>
                  جهت متن: {lang.code === 'fa' || lang.code === 'ar' ? 'راست به چپ' : 'چپ به راست'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: '#2c3e50',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #eee'
          }}>
            تنظیمات
          </h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              color: '#2c3e50'
            }}>
              جهت متن
            </h3>
            <p style={{ 
              color: '#7f8c8d',
              marginBottom: '1rem'
            }}>
              جهت نمایش متن در سایت را انتخاب کنید
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={true} 
                  style={{ marginLeft: '0.5rem' }}
                  readOnly
                />
                راست به چپ (RTL)
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={false} 
                  style={{ marginLeft: '0.5rem' }}
                  readOnly
                />
                چپ به راست (LTR)
              </label>
            </div>
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              color: '#2c3e50'
            }}>
              فرمت تاریخ
            </h3>
            <p style={{ 
              color: '#7f8c8d',
              marginBottom: '1rem'
            }}>
              فرمت نمایش تاریخ در سایت را انتخاب کنید
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={true} 
                  style={{ marginLeft: '0.5rem' }}
                  readOnly
                />
                تاریخ شمسی
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={false} 
                  style={{ marginLeft: '0.5rem' }}
                  readOnly
                />
                تاریخ میلادی
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultilingualSupportImage;
