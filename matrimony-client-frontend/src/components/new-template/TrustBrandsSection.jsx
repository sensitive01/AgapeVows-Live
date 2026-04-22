import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import user1 from '../../assets/new-template/images/user/1.jpg';
import user2 from '../../assets/new-template/images/user/2.jpg';
import user3 from '../../assets/new-template/images/user/3.jpg';
import user5 from '../../assets/new-template/images/user/5.jpg';

export default function TrustBrandsSection() {
  const testimonials = [
    {
      img: user1,
      text: "Finding my life partner seemed impossible until I joined AgapeVows. The matches were incredibly accurate, and we instantly connected. We're now happily married for two years!",
      name: "Michael & Sarah",
      location: "London",
    },
    {
      img: user2,
      text: "We met on this platform and it was love at first sight. The secure verified profiles gave me the confidence to reach out. Thank you for making our dream wedding possible.",
      name: "David & Emily",
      location: "New York",
    },
    {
      img: user3,
      text: "AgapeVows made the journey of finding true love so seamless and safe. The premium features helped us filter through and find exactly who we were looking for.",
      name: "James & Jessica",
      location: "Sydney",
    },
    {
      img: user5,
      text: "I was skeptical about finding marriage online, but this platform proved me wrong. We highly recommend AgapeVows to anyone genuinely looking for a lifelong relationship.",
      name: "Robert & Olivia",
      location: "Toronto",
    },
  ];

  return (
    <section>
      <div
        className="hom-cus-revi"
        style={{
          padding: '0px 0 60px 0',  // 🔥 top padding removed
          marginTop: '10px',      
          background: 'var(--bg, #fdfcfb)'
        }}
      >
       <div className="container" style={{ maxWidth: '1350px' }}>
          <div className="row">
            <div className="home-tit" style={{ textAlign: 'center' }}>
              <p style={{ color: '#000000ff', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '500' }}>Trusted Brand</p>
              <h2 style={{ color: '#333', fontFamily: '"Playfair Display", serif', fontWeight: 'bold' }}>
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    color: '#a855f7'
                  }}
                >
                  Trust by <b className="num">1500</b>+ Couples
                </span>
              </h2>
              <span className="leaf1" />
              <span className="tit-ani-" />
            </div>

            <div className="swiper-premium-wrapper" style={{ position: 'relative', padding: '20px 0 50px 0' }}>
              <style>{`
                .swiper-premium-wrapper .swiper-button-next,
                .swiper-premium-wrapper .swiper-button-prev {
                  color: #d4af37 !important;
                  background: #fff;
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
                  transition: all 0.3s ease;
                }
                .swiper-premium-wrapper .swiper-button-next:hover,
                .swiper-premium-wrapper .swiper-button-prev:hover {
                  background: #d4af37;
                  color: #fff !important;
                  transform: scale(1.05);
                }
                .swiper-premium-wrapper .swiper-button-next:after,
                .swiper-premium-wrapper .swiper-button-prev:after {
                  font-size: 20px;
                  font-weight: bold;
                }
                .swiper-premium-wrapper .swiper-pagination-bullet {
                  background: #ccc;
                  opacity: 0.5;
                  width: 10px;
                  height: 10px;
                  transition: all 0.3s ease;
                }
                .swiper-premium-wrapper .swiper-pagination-bullet-active {
                  background: #d4af37;
                  opacity: 1;
                  width: 25px;
                  border-radius: 5px;
                }
                .premium-testi-card {
                  background: #ffffff;
                  border-radius: 20px;
                  padding: 40px 30px;
                  margin: 15px;
                  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
                  text-align: center;
                  position: relative;
                  border: 1px solid rgba(212, 175, 55, 0.1);
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                  overflow: hidden;
                }
                .premium-testi-card:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 15px 50px rgba(212, 175, 55, 0.1);
                }
                .premium-testi-card::before {
                  content: '\\201D';
                  font-size: 150px;
                  color: rgba(212, 175, 55, 0.05);
                  position: absolute;
                  top: -20px;
                  left: 20px;
                  font-family: serif;
                  line-height: 1;
                }
                .premium-testi-img {
                  width: 90px;
                  height: 90px;
                  border-radius: 50%;
                  object-fit: cover;
                  margin: 0 auto 20px auto;
                  border: 3px solid #d4af37;
                  padding: 3px;
                  background: #fff;
                  display: block;
                }
                .premium-testi-text {
                  font-size: 17px;
                  line-height: 1.8;
                  color: #666;
                  font-style: italic;
                  margin-bottom: 25px;
                  position: relative;
                  z-index: 2;
                }
                .premium-testi-name {
                  font-family: "Playfair Display", serif;
                  font-size: 24px;
                  color: #222;
                  margin: 0 0 5px 0;
                  font-weight: 600;
                }
                .premium-testi-loc {
                  color: #d4af37;
                  font-size: 15px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
                @media (max-width: 768px) {
                   .premium-testi-card { padding: 30px 20px; margin: 10px; }
                   .swiper-premium-wrapper .swiper-button-next,
                   .swiper-premium-wrapper .swiper-button-prev { display: none; }
                }
              `}</style>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={false}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="mySwiper"
                style={{ padding: '20px 10px 50px 10px' }}
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="premium-testi-card">
                      <img src={item.img} alt={item.name} className="premium-testi-img" />
                      <p className="premium-testi-text">"{item.text}"</p>
                      <h5 className="premium-testi-name">{item.name}</h5>
                      <span className="premium-testi-loc">{item.location}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="cta-full-wid" style={{ textAlign: 'center', marginTop: '20px' }}>
              <a href="#!" className="cta-dark" style={{
                background: '#222', color: '#fff', padding: '14px 34px', fontSize: '18px',
                borderRadius: '30px', display: 'inline-block', textDecoration: 'none',
                fontWeight: '500', transition: 'background 0.3s'
              }} onMouseOver={(e) => e.target.style.background = '#d4af37'} onMouseOut={(e) => e.target.style.background = '#222'}>
                More customer reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
