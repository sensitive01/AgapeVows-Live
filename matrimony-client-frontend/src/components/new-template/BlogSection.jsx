import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import blog1 from '../../assets/new-template/images/blog/1.jpg';
import blog2 from '../../assets/new-template/images/blog/2.jpg';
import blog3 from '../../assets/new-template/images/blog/3.jpg';

const blogs = [
  { img: blog1, tag: 'Wedding - Johnny', title: 'Wedding arrangements', desc: 'It is a long established fact that a reader will be distracted by the readable content.' },
  { img: blog2, tag: 'Wedding - Emily', title: 'Bridal preparations', desc: 'It is a long established fact that a reader will be distracted by the readable content.' },
  { img: blog3, tag: 'Wedding - Chris', title: 'Invitation cards', desc: 'It is a long established fact that a reader will be distracted by the readable content.' },
];

export default function BlogSection() {
  return (
    <section>
      <div
        className="hom-blog"
        style={{
          padding: '10px 0',
          marginTop: '0px',
        }}
      >
        <div className="container" style={{ maxWidth: '1350px', width: '100%' }}>
          <div className="row">
            <div className="home-tit">
              <p style={{ color: '#000000' }}>Blog posts</p>
              <h2>
                <span style={{ color: '#7c3aed' }}>Blog &amp; Articles</span>
              </h2>
              <span className="leaf1" />
              <span className="tit-ani-" />
            </div>

            <div className="swiper-blog-wrapper" style={{ position: 'relative', padding: '10px 0 50px 0' }}>
              <style>{`
                .swiper-blog-wrapper .swiper-button-next,
                .swiper-blog-wrapper .swiper-button-prev {
                  color: #d4af37 !important;
                  background: #fff;
                  width: 44px; height: 44px;
                  border-radius: 50%;
                  box-shadow: 0 4px 12px rgba(212,175,55,0.2);
                  transition: all 0.3s ease;
                }
                .swiper-blog-wrapper .swiper-button-next:hover,
                .swiper-blog-wrapper .swiper-button-prev:hover {
                  background: #d4af37; color: #fff !important;
                }
                .swiper-blog-wrapper .swiper-button-next:after,
                .swiper-blog-wrapper .swiper-button-prev:after { font-size: 18px; font-weight: bold; }
                .swiper-blog-wrapper .swiper-pagination-bullet { background: #ccc; opacity: 0.5; }
                .swiper-blog-wrapper .swiper-pagination-bullet-active { background: #d4af37; opacity: 1; width: 22px; border-radius: 5px; }

                .blog-swiper-card {
                  background: #fff;
                  border-radius: 20px;
                  overflow: hidden;
                  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
                  border: 1px solid rgba(212,175,55,0.08);
                  transition: transform 0.3s ease, box-shadow 0.3s ease;
                  margin: 10px;
                }
                .blog-swiper-card:hover { transform: translateY(-6px); box-shadow: 0 15px 40px rgba(124,58,237,0.12); }
                .blog-swiper-card img {
                  width: 100%;
                  height: 400px;
                  object-fit: cover;
                  display: block;
                }
                .blog-swiper-body { padding: 20px; }
                .blog-swiper-tag { color: #e53e3e; font-size: 13px; font-weight: 500; margin-bottom: 8px; display: block; }
                .blog-swiper-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #7c3aed; margin: 0 0 10px 0; font-weight: 600; }
                .blog-swiper-desc { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 16px; }
                .blog-swiper-btn {
                  display: inline-block;
                  background: #7c3aed;
                  color: #fff;
                  padding: 8px 20px;
                  border-radius: 20px;
                  font-size: 13px;
                  font-weight: 500;
                  text-decoration: none;
                  transition: background 0.3s;
                }
                .blog-swiper-btn:hover { background: #5b21b6; color: #fff; }

                @media (max-width: 768px) {
                  .swiper-blog-wrapper .swiper-button-next,
                  .swiper-blog-wrapper .swiper-button-prev { display: none; }
                }
              `}</style>

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop={false}
                breakpoints={{
                  576: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 24 },
                }}
                style={{ padding: '10px 10px 50px 10px' }}
              >
                {blogs.map((blog, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="blog-swiper-card">
                      <img src={blog.img} alt={blog.title} loading="lazy" />
                      <div className="blog-swiper-body">
                        <span className="blog-swiper-tag">{blog.tag}</span>
                        <h2 className="blog-swiper-title">{blog.title}</h2>
                        <p className="blog-swiper-desc">{blog.desc}</p>
                        <a href="blog-details.html" className="blog-swiper-btn">Read more</a>
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
