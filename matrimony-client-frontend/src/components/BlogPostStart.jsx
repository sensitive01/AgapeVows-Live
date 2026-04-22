import React, { useState, useEffect } from "react";
import blog1 from "../assets/images/blog/1.jpg"
import blog2 from "../assets/images/blog/2.jpg"
import blog3 from "../assets/images/blog/3.jpg"

const BlogPostStart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Expanded blog data for testing slider
  const allBlogs = [
    {
      id: 1,
      image: blog1,
      tag: "Wedding - Johnny",
      title: "Wedding arrangements",
      desc: "It is a long established fact that a reader will be distracted by the readable content."
    },
    {
      id: 2,
      image: blog2,
      tag: "Wedding - Johnny",
      title: "Wedding arrangements",
      desc: "It is a long established fact that a reader will be distracted by the readable content."
    },
    {
      id: 3,
      image: blog3,
      tag: "Wedding - Johnny",
      title: "Invitation cards",
      desc: "It is a long established fact that a reader will be distracted by the readable content."
    },
    {
      id: 4,
      image: blog1,
      tag: "Wedding - Rose",
      title: "Floral Decoration",
      desc: "Captivating floral arrangements that make your special day even more beautiful."
    },
    {
      id: 5,
      image: blog2,
      tag: "Wedding - Smith",
      title: "Venue Selection",
      desc: "Finding the perfect venue is the first step towards a dream wedding."
    }
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const maxIndex = Math.max(0, allBlogs.length - itemsPerView);
  const slideWidth = 100 / itemsPerView;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <section className="py-8">
      <div className="px-4 lg:px-12">
        <div className="hom-blog rounded-3xl overflow-visible shadow-sm border border-gray-50 pb-16 pt-10 bg-white relative group">
          <div className="container mx-auto px-6 md:px-10">
            <div className="row">
              <div className="home-tit mb-12">
                <p className="text-gray-900 font-medium uppercase tracking-widest text-sm mb-2">Blog posts</p>
                <h2 className="text-4xl font-black tracking-tight uppercase">
                  <span className="text-[#af1684]">Blog</span> <span className="text-gray-900">& Articles</span>
                </h2>
                <div className="w-20 h-1 bg-[#af1684] mt-4 rounded-full" />
              </div>

              {/* Slider Wrapper */}
              <div className="relative px-2">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
                  >
                    {allBlogs.map((blog) => (
                      <div 
                        key={blog.id} 
                        className="flex-shrink-0 px-4"
                        style={{ width: `${slideWidth}%` }}
                      >
                        <div className="blog-box m-0 w-full bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full flex flex-col group/card">
                          <div className="relative overflow-hidden h-56">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-[#af1684]">{blog.tag}</span>
                            </div>
                          </div>
                          <div className="p-8 flex flex-col flex-grow">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 line-clamp-1 group-hover/card:text-[#af1684] transition-colors">{blog.title}</h2>
                            <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed flex-grow">
                              {blog.desc}
                            </p>
                            <a
                              href="#"
                              className="cta-dark inline-block text-center w-full py-4 rounded-xl font-bold tracking-wide transition-all translate-y-0 hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
                              style={{ background: "#af1684" }}
                            >
                              <span>Read more</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows - Inside the block but absolutely positioned */}
                {maxIndex > 0 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className={`absolute -left-6 lg:-left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center z-10 transition-all border border-gray-100 text-[#af1684] hover:bg-[#af1684] hover:text-white
                        ${currentIndex === 0 ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 animate-in fade-in zoom-in'}`}
                    >
                      <i className="fa fa-chevron-left text-lg" />
                    </button>

                    <button
                      onClick={nextSlide}
                      className={`absolute -right-6 lg:-right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center z-10 transition-all border border-gray-100 text-[#af1684] hover:bg-[#af1684] hover:text-white
                        ${currentIndex >= maxIndex ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 animate-in fade-in zoom-in'}`}
                    >
                      <i className="fa fa-chevron-right text-lg" />
                    </button>
                  </>
                )}
              </div>

              {/* Dots Pagination */}
              {maxIndex > 0 && (
                <div className="flex justify-center gap-3 mt-12 pb-2">
                  {[...Array(maxIndex + 1)].map((_, dot) => (
                    <button 
                      key={dot}
                      onClick={() => setCurrentIndex(dot)}
                      className={`transition-all duration-300 rounded-full h-2 shadow-inner ${currentIndex === dot ? 'w-8 bg-[#af1684]' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostStart;
