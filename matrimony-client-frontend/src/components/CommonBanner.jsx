import React from "react";

const CommonBanner = ({ title, subtitle, badgeText = "#1 Wedding Website" }) => {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/common-banner-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(0.6)"
        }}
      ></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="animate-fadeIn">
          {badgeText && (
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.2em] text-[#ffc107] uppercase bg-black/20 backdrop-blur-sm rounded-full">
              {badgeText}
            </span>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white drop-shadow-2xl">
            {title}
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-[#17D1AC] to-[#56CCF2] mx-auto mb-8 rounded-full"></div>
          
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white max-w-2xl mx-auto font-medium opacity-90 leading-relaxed drop-shadow-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Decorative Gradient Overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-1"></div>
      
      {/* CSS for animation if not present */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default CommonBanner;
