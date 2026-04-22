import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import couple6 from "../assets/images/couples/6.jpg"
import couple7 from "../assets/images/couples/7.jpg"
import couple8 from "../assets/images/couples/8.jpg"
import couple9 from "../assets/images/couples/9.jpg"
import couple10 from "../assets/images/couples/10.jpg"

const RecentCouples = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Couples data with original structure
  const couples = [
    {
      image: couple6,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple7,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple8,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple9,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple10,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple6,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple9,
      names: "Dany & July",
      location: "New York"
    },
    {
      image: couple8,
      names: "Dany & July",
      location: "New York"
    }
  ];

  // Calculate responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else if (window.innerWidth < 1200) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(couples.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // return (
  //   <section>
  //     <div className="hom-couples-all">
  //       <div className="container">
  //         <div className="row">
  //           <div className="home-tit">
  //             <p style={{ color: "black" }}>trusted brand</p>
  //             <h2>
  //               <span>Recent Couples</span>
  //             </h2>
  //             <span className="leaf1" />
  //             <span className="tit-ani-" />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="hom-coup-test" style={{ position: 'relative' }}>
  //         {/* Navigation Arrows */}
  //         <button 
  //           onClick={prevSlide}
  //           className="slider-nav-btn slider-prev"
  //           style={{
  //             position: 'absolute',
  //             left: '20px',
  //             top: '50%',
  //             transform: 'translateY(-50%)',
  //             zIndex: 10,
  //             background: 'rgba(0, 0, 0, 0.5)',
  //             border: 'none',
  //             borderRadius: '50%',
  //             width: '50px',
  //             height: '50px',
  //             cursor: 'pointer',
  //             color: 'white',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center'
  //           }}
  //         >
  //           <ChevronLeft size={24} />
  //         </button>

  //         <button 
  //           onClick={nextSlide}
  //           className="slider-nav-btn slider-next"
  //           style={{
  //             position: 'absolute',
  //             right: '20px',
  //             top: '50%',
  //             transform: 'translateY(-50%)',
  //             zIndex: 10,
  //             background: 'rgba(0, 0, 0, 0.5)',
  //             border: 'none',
  //             borderRadius: '50%',
  //             width: '50px',
  //             height: '50px',
  //             cursor: 'pointer',
  //             color: 'white',
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center'
  //           }}
  //         >
  //           <ChevronRight size={24} />
  //         </button>

  //         {/* Slider Container */}
  //         <div className="slider-container" style={{ overflow: 'hidden' }}>
  //           <ul 
  //             className="couple-sli"
  //             style={{
  //               display: 'flex',
  //               transition: 'transform 0.5s ease-in-out',
  //               transform: `translateX(-${currentSlide * 100}%)`,
  //               margin: 0,
  //               padding: 0,
  //               listStyle: 'none'
  //             }}
  //           >
  //             {Array.from({ length: totalSlides }).map((_, slideIndex) => (
  //               <div key={slideIndex} className="slide-group" style={{ 
  //                 display: 'flex', 
  //                 minWidth: '100%'
  //               }}>
  //                 {couples
  //                   .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
  //                   .map((couple, index) => (
  //                     <li key={slideIndex * itemsPerSlide + index} style={{ 
  //                       flex: `0 0 ${100 / itemsPerSlide}%`
  //                     }}>
  //                       <div className="hom-coup-box">
  //                         <span className="leaf" />
  //                         <img src={couple.image} alt="" loading="lazy" />
  //                         <div className="bx">
  //                           <h4>
  //                             {couple.names} <span>{couple.location}</span>
  //                           </h4>
  //                           <a href="#" className="sml-cta cta-dark">
  //                             View more
  //                           </a>
  //                         </div>
  //                       </div>
  //                     </li>
  //                   ))}
  //               </div>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* Pagination Dots */}
  //         <div className="slider-dots" style={{ 
  //           display: 'flex', 
  //           justifyContent: 'center', 
  //           marginTop: '30px',
  //           gap: '10px'
  //         }}>
  //           {Array.from({ length: totalSlides }).map((_, index) => (
  //             <button
  //               key={index}
  //               onClick={() => goToSlide(index)}
  //               className={`slider-dot ${currentSlide === index ? 'active' : ''}`}
  //               style={{
  //                 width: currentSlide === index ? '30px' : '12px',
  //                 height: '12px',
  //                 borderRadius: '6px',
  //                 border: 'none',
  //                 background: currentSlide === index ? '#D4AF37' : 'rgba(0, 0, 0, 0.3)',
  //                 cursor: 'pointer',
  //                 transition: 'all 0.3s ease'
  //               }}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};

export default RecentCouples;