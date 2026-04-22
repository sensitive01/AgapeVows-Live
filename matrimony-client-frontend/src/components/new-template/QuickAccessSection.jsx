import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import iconUser from '../../assets/new-template/images/icon/user.png';
import iconGate from '../../assets/new-template/images/icon/gate.png';
import iconCouple from '../../assets/new-template/images/icon/couple.png';
import iconHall from '../../assets/new-template/images/icon/hall.png';
import iconPhotoCamera from '../../assets/new-template/images/icon/photo-camera.png';
import iconCake from '../../assets/new-template/images/icon/cake.png';

export default function QuickAccessSection() {
  const services = [
    {
      img: iconUser,
      title: "Browse Profiles",
      desc: "1200+ Profiles",
      link: "all-profiles.html",
    },
    {
      img: iconGate,
      title: "Wedding",
      desc: "Premium Venues",
      link: "wedding-video.html",
    },
    {
      img: iconCouple,
      title: "All Services",
      desc: "Complete Packages",
      link: "services.html",
    },
    {
      img: iconHall,
      title: "Join Now",
      desc: "Start for free",
      link: "plans.html",
    },
    {
      img: iconPhotoCamera,
      title: "Photo gallery",
      desc: "Captured Moments",
      link: "photo-gallery.html",
    },
    {
      img: iconCake,
      title: "Blog & Articles",
      desc: "Wedding Ideas",
      link: "blog.html",
    },
  ];

  return (
    <section>
      <div
        className="str home-acces-main"
        style={{
          padding: '25px 0',
          marginTop: '-120px',
          background: 'linear-gradient(135deg, #fffcf5 0%, #f7ebd5 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container-fluid">
          <div className="row">
            {/* BACKGROUND SHAPE */}
            <div className="wedd-shap">
              <span className="abo-shap-1" />
              <span className="abo-shap-4" />
            </div>
            {/* END BACKGROUND SHAPE */}

            <div className="home-tit" style={{ textAlign: 'center', marginBottom: '50px' }}>
              <p style={{ color: '#000000ff', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '500', fontSize: '20px', marginBottom: '10px' }}>Quick Access</p>
              <h2
                style={{
                  fontSize: '56px',
                  color: '#7c3aed',   // 🔥 violet color
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 'bold'
                }}
              >
                <span
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    color: '#a855f7'
                  }}
                >
                  Our Services
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
                .premium-service-card {
                  background: #ffffff;
                  border-radius: 20px;
                  padding: 40px 30px;
                  margin: 15px;
                  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
                  text-align: center;
                  position: relative;
                  border: 1px solid rgba(212, 175, 55, 0.05);
                  transition: transform 0.4s ease, box-shadow 0.4s ease;
                  overflow: hidden;
                  z-index: 1;
                }
                .premium-service-card:before {
                  content: '';
                  position: absolute;
                  top: 0; left: 0; width: 100%; height: 5px;
                  background: linear-gradient(90deg, #d4af37, #f3e5ab);
                  opacity: 0;
                  transition: opacity 0.4s ease;
                }
                .premium-service-card:hover {
                  transform: translateY(-8px);
                  box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15);
                }
                .premium-service-card:hover:before {
                  opacity: 1;
                }
                .premium-service-icon-wrap {
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  background: #fdfaf0;
                  margin: 0 auto 20px auto;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border: 2px dashed #d4af37;
                  padding: 10px;
                  transition: transform 0.4s ease;
                }
                .premium-service-card:hover .premium-service-icon-wrap {
                  transform: scale(1.1) rotate(5deg);
                  background: #f8f1de;
                }
                .premium-service-icon {
                  max-width: 40px;
                  height: auto;
                  transition: filter 0.3s ease;
                }
                .premium-service-title {
                  font-family: "Playfair Display", serif;
                  font-size: 26px;
                  color: #222;
                  margin: 0 0 10px 0;
                  font-weight: 600;
                }
                .premium-service-desc {
                  color: #777;
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                .premium-service-link {
                  color: #d4af37;
                  font-weight: 600;
                  font-size: 16px;
                  text-decoration: none;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  display: inline-block;
                  border-bottom: 1px solid transparent;
                  padding-bottom: 2px;
                  transition: all 0.3s ease;
                }
                .premium-service-link:hover {
                  color: #b39129;
                  border-bottom-color: #b39129;
                }
                @media (max-width: 768px) {
                   .premium-service-card { padding: 30px 20px; margin: 10px; }
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
                autoplay={{ delay: 3500, disableOnInteraction: false }}
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
                {services.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="premium-service-card">
                      <div className="premium-service-icon-wrap">
                        <img src={item.img} alt={item.title} className="premium-service-icon" loading="lazy" />
                      </div>
                      <h4 className="premium-service-title">{item.title}</h4>
                      <p className="premium-service-desc">{item.desc}</p>
                      <a href={item.link} className="premium-service-link">View Details &rarr;</a>
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
