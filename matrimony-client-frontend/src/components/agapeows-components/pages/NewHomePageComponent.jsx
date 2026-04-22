import React from "react";
// Import New Template CSS (only the ones not already in main.jsx)
import "../../../assets/new-template/css/jquery-ui.css";
import "../../../assets/new-template/css/style.css";
import "../../new-template/HomeMobileResponsive.css";

import MainLayout from "../layout/MainLayout";
import CountModal from "../../CountModal";

import HeroSearchSection from "../../new-template/HeroSearchSection";
import TrustBrandsSection from "../../new-template/TrustBrandsSection";
import QuickAccessSection from "../../new-template/QuickAccessSection";
import AboutWelcomeSection from "../../new-template/AboutWelcomeSection";
import WhyChooseUsSection from "../../new-template/WhyChooseUsSection";
import FeaturesSection from "../../new-template/FeaturesSection";
import HowItWorksSection from "../../new-template/HowItWorksSection";
import RecentCouplesSection from "../../new-template/RecentCouplesSection";
import TeamSection from "../../new-template/TeamSection";
import GallerySection from "../../new-template/GallerySection";
import BlogSection from "../../new-template/BlogSection";
import FindYourMatchCTASection from "../../new-template/FindYourMatchCTASection";
import FooterSection from "../../new-template/FooterSection";

// Import Leaf Images
import leaf5 from "../../../assets/new-template/images/leaf/5.png";
import leaf8 from "../../../assets/new-template/images/leaf/8.png";

const NewHomePageComponent = () => {
  return (
    <div className="min-h-screen relative" id="new-homepage-wrapper">
      {/* Fixed Leaf Decorations - Optimized to match Screenshot 1 */}
      <div className="fixed top-[80px] left-[-30px] pointer-events-none z-[50] w-[230px] md:w-[260px] lg:w-[290px] opacity-90">
        <img
          src={leaf5}
          className="w-full h-auto"
          alt=""
          style={{ transform: 'rotate(15deg)' }}
        />
      </div>
      <div className="fixed bottom-0 right-0 pointer-events-none z-[10] w-[100px] md:w-[120px] lg:w-[150px] opacity-90">
        <img
          src={leaf8}
          className="w-full h-auto"
          alt=""
          style={{ transform: 'rotate(-5deg) translate(5%, 5%)' }}
        />
      </div>

      <div className="fixed top-0 left-0 right-0 z-[101]">
        <MainLayout />
      </div>

      <div className="pt-16">
        <HeroSearchSection />

        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-hidden max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <TrustBrandsSection />
        </div>

        <QuickAccessSection />

        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-hidden max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <AboutWelcomeSection />
        </div>

        <WhyChooseUsSection />

        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-visible max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <FeaturesSection />

          {/* Retention: Keeping the original Count section as requested */}
          <CountModal />

          <HowItWorksSection />
          <RecentCouplesSection />
          <TeamSection />
        </div>

        <GallerySection />

        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-visible max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <BlogSection />
          <FindYourMatchCTASection />
        </div>

        <FooterSection />
      </div>
    </div>
  );
};

export default NewHomePageComponent;
