import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import couple3 from '../../assets/new-template/images/couples/3.jpg';
import couple4 from '../../assets/new-template/images/couples/4.jpg';
import couple5 from '../../assets/new-template/images/couples/5.jpg';
import couple6 from '../../assets/new-template/images/couples/6.jpg';
import couple7 from '../../assets/new-template/images/couples/7.jpg';
import couple8 from '../../assets/new-template/images/couples/8.jpg';
import couple9 from '../../assets/new-template/images/couples/9.jpg';
import couple10 from '../../assets/new-template/images/couples/10.jpg';

export default function RecentCouplesSection() {
  const couples = [
    { img: couple6, name: "Dany & July", location: "New York", link: "wedding-video.html" },
    { img: couple7, name: "Sarah & Mike", location: "London", link: "wedding-video.html" },
    { img: couple8, name: "Jessica & John", location: "Sydney", link: "wedding-video.html" },
    { img: couple9, name: "Emily & David", location: "Paris", link: "wedding-video.html" },
    { img: couple10, name: "Olivia & Robert", location: "Toronto", link: "wedding-video.html" },
    { img: couple3, name: "Anna & Leo", location: "Berlin", link: "wedding-video.html" },
    { img: couple4, name: "Emma & Chris", location: "Rome", link: "wedding-video.html" },
    { img: couple5, name: "Sophia & Liam", location: "Madrid", link: "wedding-video.html" }
  ];

  return (
    <section>
      <div 
        className="hom-couples-all" 
        style={{ 
          padding: '30px 0',
          marginTop: '-30px',
          background: 'var(--bg, #fdfcfb)', 
          position: 'relative' 
        }}
      >
      <div className="container" style={{ maxWidth: '1350px', width: '100%' }}>
          <div className="row">
            
            <div className="home-tit" style={{ textAlign: 'center' }}>
              
              {/* 🔥 Trusted Brand → BLACK */}
              <p style={{ 
                color: '#000000', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                fontWeight: '500'
              }}>
                Trusted Brand
              </p>

              {/* 🔥 Recent Couples → VIOLET */}
              <h2 style={{ 
                color: '#333', 
                fontFamily: '"Playfair Display", serif', 
                fontWeight: 'bold' 
              }}>
                <span style={{ position: 'relative', display: 'inline-block', color: '#7c3aed' }}>
                  Recent Couples
                </span>
              </h2>

              <span className="leaf1" />
              <span className="tit-ani-" />
            </div>
            
            <div className="swiper-premium-wrapper" style={{ position: 'relative', padding: '20px 0 50px 0', zIndex: 2 }}>
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
                .premium-couple-card {
                  background: #ffffff;
                  border-radius: 20px;
                  margin: 15px;
                  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
                  text-align: center;
                  position: relative;
                  border: 1px solid rgba(212, 175, 55, 0.05);
                  transition: transform 0.4s ease, box-shadow 0.4s ease;
                  overflow: hidden;
                }
                .premium-couple-card:hover {
                  transform: translateY(-8px);
                  box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15);
                }
                .premium-couple-img-wrap {
                  position: relative;
                  width: 100%;
                  height: 250px;
                  overflow: hidden;
                }
                .premium-couple-img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.5s ease;
                }
                .premium-couple-card:hover .premium-couple-img {
                  transform: scale(1.08);
                }
                .premium-couple-content {
                  padding: 25px 20px;
                  position: relative;
                  background: #fff;
                }
                .premium-couple-content:before {
                  content: '';
                  position: absolute;
                  top: 0; left: 0; width: 100%; height: 4px;
                  background: linear-gradient(90deg, #d4af37, #f3e5ab);
                }
                .premium-couple-title {
                  font-family: "Playfair Display", serif;
                  font-size: 22px;
                  color: #222;
                  margin: 0 0 5px 0;
                  font-weight: 600;
                }
                .premium-couple-loc {
                  color: #888;
                  font-size: 14px;
                  margin-bottom: 20px;
                  display: block;
                  letter-spacing: 0.5px;
                }

                /* 🔥 BUTTON → VIOLET */
                .premium-couple-link {
                  color: #fff;
                  background: #7c3aed;
                  font-weight: 500;
                  font-size: 13px;
                  text-decoration: none;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  display: inline-block;
                  padding: 8px 25px;
                  border-radius: 20px;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);
                }
                .premium-couple-link:hover {
                  background: #5b21b6;
                  transform: translateY(-2px);
                  box-shadow: 0 6px 15px rgba(124, 58, 237, 0.4);
                }

                @media (max-width: 768px) {
                   .premium-couple-card { margin: 10px; }
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
                autoplay={{ delay: 3800, disableOnInteraction: false }}
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
                {couples.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="premium-couple-card">
                      <div className="premium-couple-img-wrap">
                        <img src={item.img} alt={item.name} className="premium-couple-img" loading="lazy" />
                      </div>
                      <div className="premium-couple-content">
                        <h4 className="premium-couple-title">{item.name}</h4>
                        <span className="premium-couple-loc">{item.location}</span>
                        <a href={item.link} className="premium-couple-link">View Story</a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
