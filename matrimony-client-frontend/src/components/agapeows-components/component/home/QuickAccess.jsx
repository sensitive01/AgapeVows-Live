import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Camera,
  BookOpen,
  Heart,
  Home,
  UserPlus,
} from "lucide-react";

const QuickAccess = () => {
  // Service data matching the design
  const services = [
    {
      id: 1,
      title: "All Services",
      subtitle: "1200+ Profiles",
      icon: Users,
      bgImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isSpecial: false,
    },
    {
      id: 2,
      title: "Join Now",
      subtitle: "Start for free",
      icon: Home,
      bgImage:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hasButton: true,
    },
    {
      id: 3,
      title: "Photo gallery",
      subtitle: "1200+ Profiles",
      icon: Camera,
      bgImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Blog & Articles",
      subtitle: "Start for free",
      icon: BookOpen,
      bgImage:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Browse Profiles",
      subtitle: "1200+ Profiles",
      icon: Users,
      bgImage:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Wedding",
      subtitle: "1200+ Profiles",
      icon: Heart,
      bgImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    // Additional cards for carousel effect
    {
      id: 7,
      title: "Events",
      subtitle: "500+ Events",
      icon: Heart,
      bgImage:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      title: "Community",
      subtitle: "Join Community",
      icon: Users,
      bgImage:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 6; // Show 6 cards at once as in the design
  const totalSlides = Math.max(1, services.length - cardsPerView + 1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const ServiceCard = ({ service }) => {
    const IconComponent = service.icon;

    return (
      <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer transition-all duration-300 mx-2">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.bgImage})` }}
        />

        {/* Overlay - subtle dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Icon */}
        <div className="absolute top-6 left-6 z-10">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
          <h3 className="text-2xl font-bold mb-2 font-serif">
            {service.title}
          </h3>
          <p className="text-lg opacity-90 mb-4">{service.subtitle}</p>

          {service.hasButton && (
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium text-sm">
              Start Now
            </button>
          )}
        </div>
      </div>
    );
  };

  // Decorative Leaf Component
  const DecorativeLeaf = ({ className, rotation = 0 }) => (
    <div
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <svg
        width="60"
        height="120"
        viewBox="0 0 60 120"
        className="text-green-500 opacity-60"
      >
        <path
          d="M30 5 C40 20, 50 40, 45 60 C40 80, 35 90, 30 115 C25 90, 20 80, 15 60 C10 40, 20 20, 30 5 Z"
          fill="currentColor"
        />
        <path
          d="M30 115 C28 110, 26 105, 24 100 M30 115 C32 110, 34 105, 36 100"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );

  return (
    <section className="bg-black py-16 px-4 relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-full mx-auto relative w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold mb-4">
            <span className="text-amber-400 font-serif">Our Services</span>
          </h2>
          {/* Decorative floral element */}
          <div className="flex items-center justify-center">
            <svg
              width="200"
              height="40"
              viewBox="0 0 200 40"
              className="text-purple-400"
            >
              <path
                d="M50 20 C60 10, 80 15, 100 20 C120 15, 140 10, 150 20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="80" cy="18" r="3" fill="currentColor" />
              <circle cx="100" cy="15" r="4" fill="currentColor" />
              <circle cx="120" cy="18" r="3" fill="currentColor" />
              {/* Small leaves */}
              <path
                d="M70 25 C72 23, 75 24, 74 27 C73 25, 71 26, 70 25"
                fill="currentColor"
              />
              <path
                d="M130 25 C128 23, 125 24, 126 27 C127 25, 129 26, 130 25"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-transparent hover:bg-white/10 rounded-full p-3 transition-all duration-300"
            style={{ marginLeft: "-80px" }}
          >
            <ChevronLeft
              className="w-8 h-8 text-white/70 hover:text-white"
              strokeWidth={1}
            />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-transparent hover:bg-white/10 rounded-full p-3 transition-all duration-300"
            style={{ marginRight: "-80px" }}
          >
            <ChevronRight
              className="w-8 h-8 text-white/70 hover:text-white"
              strokeWidth={1}
            />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / cardsPerView)
                }%)`,
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border ${
                  index === currentSlide
                    ? "bg-pink-500 border-pink-500"
                    : "bg-transparent border-white/50 hover:border-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
