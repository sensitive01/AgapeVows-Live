import React, { useState } from "react";
import MainLayout from "../agapeows-components/layout/MainLayout";

// Hide scrollbar CSS
const scrollbarStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  html {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const HeroSection = () => {
  const [ageValue, setAgeValue] = useState(25);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images array
  const backgroundImages = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  ];

  // Auto-change background images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleAgeChange = (e) => {
    setAgeValue(parseInt(e.target.value));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-orange-800">
      {/* Background Images with Transition */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentBgIndex ? "opacity-30" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side - Hero Text */}
          <div className="text-center lg:text-left lg:flex-1">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-gray-300">#1</span> MATRIMONY
            </h1>
            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
              Find your
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="text-purple-400">Right Match</span>{" "}
              <span className="text-white">here</span>
            </h2>

            <p className="text-white text-lg md:text-xl mb-12">
              Most trusted Matrimony Brand in the World.
            </p>
          </div>

          {/* Right Side - Search Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 md:p-8 max-w-md w-full">
            <div className="space-y-4">
              <select className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Men</option>
                <option>Women</option>
              </select>

              <div className="relative">
                <label className="block text-white text-sm font-medium mb-2">
                  Age: {ageValue}
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={ageValue}
                    onChange={handleAgeChange}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #9333ea 0%, #9333ea ${
                        ((ageValue - 18) / (70 - 18)) * 100
                      }%, #e5e7eb ${
                        ((ageValue - 18) / (70 - 18)) * 100
                      }%, #e5e7eb 100%)`,
                    }}
                  />
                  {/* Tooltip */}
                  <div
                    className="absolute -top-10 bg-black text-white px-2 py-1 rounded text-sm pointer-events-none"
                    style={{
                      left: `${((ageValue - 18) / (70 - 18)) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {ageValue}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>

                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #9333ea;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                  .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #9333ea;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                `}</style>
              </div>

              <select className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Choose your Christ...</option>
                <option>Christian</option>
                <option>Hindu</option>
                <option>Muslim</option>
              </select>

              <select className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Select State</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </select>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const AgapeVowsApp = () => {
  return (
    <div className="min-h-screen">
      {/* Add the scrollbar hiding styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />

      <div className="fixed top-0 left-0 right-0 z-50">
        <MainLayout />
      </div>
      <div className="pt-16">
        {" "}
        <HeroSection />
      </div>
    </div>
  );
};

export default AgapeVowsApp;
