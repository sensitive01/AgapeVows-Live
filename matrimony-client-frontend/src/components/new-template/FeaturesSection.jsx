import React from 'react';
import iconPrize from '../../assets/new-template/images/icon/prize.png';
import iconTrust from '../../assets/new-template/images/icon/trust.png';
import iconRings from '../../assets/new-template/images/icon/rings.png';

export default function FeaturesSection() {
  const features = [
    {
      img: iconPrize,
      title: "Genuine profiles",
      desc: "Contact genuine profiles with 100% verified mobile",
      delay: "0.1"
    },
    {
      img: iconTrust,
      title: "Most trusted",
      desc: "The most trusted wedding matrimony brand lorem",
      delay: "0.3"
    },
    {
      img: iconRings,
      title: "2000+ weddings",
      desc: "Lakhs of peoples have found their life partner",
      delay: "0.6"
    }
  ];

  return (
   <section 
  className="ab-sec2" 
  style={{ 
    paddingBottom: '70px',
    marginTop: '-70px',
    position: 'relative',
    zIndex: 50
  }}
>
      <div className="container">
      <div className="row justify-content-center" style={{ gap: '25px' }}>
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div 
                className="animate animate__animated animate__slower" 
                data-ani="animate__flipInX" 
                data-dely={feature.delay}
                style={{
                  background: '#fff',
                  padding: '25px 20px',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.5s ease'
                }}
              >
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <img 
                    src={feature.img} 
                    alt={feature.title} 
                    loading="lazy" 
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
                  />
                </div>
                <h4 style={{ 
                  color: '#7c3aed', 
                  fontSize: '22px', 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  fontFamily: '"Playfair Display", serif'
                }}>
                  {feature.title}
                </h4>
                <p style={{ 
                  color: '#444', 
                  fontSize: '15px', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
