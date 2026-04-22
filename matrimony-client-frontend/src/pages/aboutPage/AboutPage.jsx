import React, { useState, useEffect } from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import { getUserCounts } from "../../api/axiosService/userAuthService";

const testimonialsData = [
  { id: 1, name: "John Smith", role: "IT Professional", img: "images/profiles/1.jpg", text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." },
  { id: 2, name: "Julia Ann", role: "Teacher", img: "images/profiles/6.jpg", text: "Finding my soulmate was so easy with Agape Vows. The platform is secure and the profiles are very genuine." },
  { id: 3, name: "William Son", role: "Govt Staff", img: "images/profiles/7.jpg", text: "The support team was amazing. They helped me navigate through the process and find the perfect match." },
  { id: 4, name: "Anita Roy", role: "Doctor", img: "images/profiles/2.jpg", text: "Professional service and very authentic profiles. I highly recommend Agape Vows to everyone seeking a partner." },
  { id: 5, name: "Sarah Khan", role: "Designer", img: "images/profiles/3.jpg", text: "A truly wonderful experience. The team was supportive at each stage. Very happy with the results!" },
];

const AboutPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [counts, setCounts] = useState({
    total: 0,
    male: 0,
    female: 0,
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure currentIndex is valid when screen size changes
  useEffect(() => {
    const itemsToShow = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;
    const maxIndex = Math.max(0, testimonialsData.length - itemsToShow);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [windowWidth, currentIndex]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getUserCounts();

        if (res.data.success) {
          setCounts({
            total: res.data.data.totalUsers,
            male: res.data.data.maleCount,
            female: res.data.data.femaleCount,
          });
        }
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);


  return (
    <div className="min-h-screen pt-[170px]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* WELCOME SECTION */}
      <section style={{ padding: '20px 0' }}>
        <div className="ab-wel pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3" />
                  <img src="images/about/1.jpg" alt="" className="ab-wel-1" />
                  <img src="images/about/2.jpg" alt="" className="ab-wel-2" />
                  <span className="ab-wel-4" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Welcome to <em>Wedding matrimony</em>
                    </h2>
                    <p>
                      Best wedding matrimony It is a long established fact that
                      a reader will be distracted by the readable content of a
                      page when looking at its layout.{" "}
                    </p>
                    <p>
                      {" "}
                      <a href="plans.html">Click here to</a> Start you matrimony
                      service now.
                    </p>
                  </div>
                  <div className="ab-wel-tit-1">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true" />
                          <h4>
                            Enquiry <em>+01 2242 3366</em>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div>
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          <h4>
                            Get Support <em>info@example.com</em>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      {/* START: COUNTERS SECTION AS A SEPARATE BLOCK */}
      <section className="py-16 my-10">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-purple-50/80 p-10 md:p-16 rounded-[4rem] shadow-sm border border-purple-100">
            <div className="row">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full list-none p-0 m-0">
                <li>
                  <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="bg-purple-100 p-4 rounded-full text-purple-600">
                      <i className="fa fa-heart-o text-4xl" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-4xl font-extrabold text-gray-800">5</h4>
                      <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Couples paired</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                      <i className="fa fa-users text-4xl" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-4xl font-extrabold text-gray-800">
                        {counts.total}+
                      </h4>
                      <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Registered users</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="bg-green-100 p-4 rounded-full text-green-600">
                      <i className="fa fa-male text-4xl" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-4xl font-extrabold text-gray-800">
                        {counts.male}+
                      </h4>
                      <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Groom</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po bg-white p-8 rounded-3xl shadow-md border border-purple-100 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="bg-pink-100 p-4 rounded-full text-pink-600">
                      <i className="fa fa-female text-4xl" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-4xl font-extrabold text-gray-800">
                        {counts.female}+
                      </h4>
                      <span className="text-gray-500 uppercase tracking-widest text-xs font-bold block mt-2">Bride</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* END */}
      {/* END */}
      {/* RECENT COUPLES */}
      {/* CUSTOM TESTIMONIALS SLIDER IN PREMIUM FLOATING BLOCK */}
      <section className="py-20 my-10">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-purple-50/80 p-6 sm:p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-sm border border-purple-100 relative group overflow-visible">
            {/* Background Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>

            <div className="row justify-center text-center mb-16">
              <div className="col-lg-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase mb-4">
                  <span className="text-[#af1684]">Customer</span> <span className="text-gray-900">Testimonials</span>
                </h2>
                <div className="w-20 h-1 bg-[#af1684] mx-auto rounded-full mb-6"></div>
                <p className="text-[#a17e54] uppercase tracking-[0.3em] text-xs font-bold font-serif">
                  Fusce imperdiet ullamcorper fringilla.
                </p>
              </div>
            </div>

            <div className="relative group/slider">
              {(() => {
                const testimonials = testimonialsData;
                const itemsToShow = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;
                const maxIndex = Math.max(0, testimonials.length - itemsToShow);
                const slideWidth = 100 / itemsToShow;

                return (
                  <div className="px-2 sm:px-4 lg:px-0">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
                      >
                        {testimonials.map((item) => (
                          <div
                            key={item.id}
                            className="flex-shrink-0 px-2 md:px-6"
                            style={{ width: `${slideWidth}%` }}
                          >
                            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-md border border-purple-50 flex flex-col h-full transition-all duration-300 hover:shadow-xl group">
                              <div className="flex text-orange-400 mb-6 space-x-1">
                                {[...Array(5)].map((_, i) => <i key={i} className="fa fa-star text-sm" />)}
                                <span className="text-gray-400 text-xs ml-2 font-medium">(50 Reviews)</span>
                              </div>
                              <p className="text-gray-600 italic flex-grow mb-6 md:mb-8 leading-relaxed text-sm md:text-base lg:text-lg">
                                {item.text}
                              </p>
                              <div className="flex items-center gap-3 md:gap-5 mt-auto pt-6 md:pt-8 border-t border-gray-50">
                                <img src={item.img} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-sm object-cover" />
                                <div className="text-left">
                                  <h4 className="font-bold text-gray-900 leading-tight text-lg md:text-xl">{item.name}</h4>
                                  <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest leading-loose">{item.role}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Absolute Side Arrows */}
                    <button
                      onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                      className={`absolute -left-2 sm:-left-4 lg:-left-20 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 z-10 ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed invisible lg:visible lg:opacity-20' : 'opacity-100'}`}
                      disabled={currentIndex === 0}
                    >
                      <i className="fa fa-chevron-left text-base md:text-xl" />
                    </button>
                    <button
                      onClick={() => setCurrentIndex(prev => Math.min(maxIndex, prev + 1))}
                      className={`absolute -right-2 sm:-right-4 lg:-right-20 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 z-10 ${currentIndex >= maxIndex ? 'opacity-30 cursor-not-allowed invisible lg:visible lg:opacity-20' : 'opacity-100'}`}
                      disabled={currentIndex >= maxIndex}
                    >
                      <i className="fa fa-chevron-right text-base md:text-xl" />
                    </button>

                    {/* Dots Pagination */}
                    {maxIndex > 0 && (
                      <div className="flex justify-center gap-3 mt-12">
                        {[...Array(maxIndex + 1)].map((_, dot) => (
                          <button
                            key={dot}
                            onClick={() => setCurrentIndex(dot)}
                            className={`transition-all duration-300 rounded-full h-3 shadow-inner ${currentIndex === dot ? 'w-10 bg-purple-600' : 'w-3 bg-purple-200 hover:bg-purple-300'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
