import React from 'react';
import howItWorksImg from '../../assets/images/how-it-works.png';

const HowItWorksSection = () => {
  return (
    <div className="w-full bg-[#fdfaf6] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex justify-center">
        <img 
          src={howItWorksImg} 
          alt="How It Works - 1. Register, 2. Submit Government Verified ID, 3. Search, 4. Connect" 
          className="w-full max-w-[800px] h-auto object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
};

export default HowItWorksSection;
