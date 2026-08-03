import React from "react";
import "../../../assets/new-template/css/jquery-ui.css";
import "../../../assets/new-template/css/style.css";
import "../../new-template/HomeMobileResponsive.css";
import MainLayout from "../layout/MainLayout";
import HeroSearchSection from "../../new-template/HeroSearchSection";

import FindYourMatchCTASection from "../../new-template/FindYourMatchCTASection";
import HighlightedProfilesSection from "../../new-template/HighlightedProfilesSection";
import HowItWorksSection from "../../new-template/HowItWorksSection";
import BlogSection from "../../new-template/BlogSection";
import FooterSection from "../../new-template/FooterSection";
import SEOHelmet from "../../common/SEOHelmet";
import KeywordsSection from "../../new-template/KeywordsSection";

const NewHomePageComponent = () => {
  return (
    <div className="min-h-screen relative" id="new-homepage-wrapper">
      <SEOHelmet 
        title="AgapeVows - India's Trusted Christian Matrimony" 
        description="Find your God-given match on AgapeVows, the trusted Christian matrimony platform with verified profiles and secure matchmaking." 
      />
      <div className="fixed top-0 left-0 right-0 z-[101]">
        <MainLayout />
      </div>

      <div className="pt-12">
        {/* SEO Copy Section - Matching Screenshot */}
        <HeroSearchSection />
        <div className="w-full relative overflow-hidden bg-[#faf8fc] pt-14 pb-6 sm:pt-16 sm:pb-8 border-b border-purple-100 mt-8">
          {/* Subtle wavy decorative background using SVG data URI for the left and right edges */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-100,50 Q150,150 200,0 T500,50' fill='none' stroke='%2358219f' stroke-width='0.5' stroke-opacity='0.5'/%3E%3Cpath d='M-100,80 Q150,180 200,30 T500,80' fill='none' stroke='%2358219f' stroke-width='0.5' stroke-opacity='0.4'/%3E%3Cpath d='M-100,110 Q150,210 200,60 T500,110' fill='none' stroke='%2358219f' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Cpath d='M100%25,50 Qcalc(100%25 - 250px),150 calc(100%25 - 300px),0 Tcalc(100%25 - 600px),50' fill='none' stroke='%2358219f' stroke-width='0.5' stroke-opacity='0.5' transform='scale(-1, 1) translate(-100%25, 0)'/%3E%3Cpath d='M100%25,80 Qcalc(100%25 - 250px),180 calc(100%25 - 300px),30 Tcalc(100%25 - 600px),80' fill='none' stroke='%2358219f' stroke-width='0.5' stroke-opacity='0.4' transform='scale(-1, 1) translate(-100%25, 0)'/%3E%3Cpath d='M100%25,110 Qcalc(100%25 - 250px),210 calc(100%25 - 300px),60 Tcalc(100%25 - 600px),110' fill='none' stroke='%2358219f' stroke-width='0.5' stroke-opacity='0.3' transform='scale(-1, 1) translate(-100%25, 0)'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
          
          <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 text-center">
            <p className="text-[#333333] text-[15px] sm:text-[16px] leading-[1.7] font-source">
              <strong style={{ color: '#4b1e7a', fontWeight: '700' }}>AgapeVows</strong> is one of India's trusted Christian matrimony websites, dedicated exclusively to helping <strong style={{ color: '#4b1e7a', fontWeight: '700' }}>Christian grooms</strong> find a Christ-centered 
              life partner. Whether you are looking for <strong style={{ color: '#4b1e7a', fontWeight: '700' }}>Roman Catholic, Syrian Catholic, Pentecostal, CSI, CNI, Marthoma, Orthodox, 
              Born Again, Baptist, Evangelical, or Protestant Christian matrimony, AgapeVows</strong> offers verified profiles, secure matchmaking, and 
              a faith-based matrimonial experience for Christians across India.
            </p>
          </div>
        </div>

        <HighlightedProfilesSection />


        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-visible max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        </div>

        <HowItWorksSection />
        <BlogSection />

        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-visible max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <FindYourMatchCTASection />
        </div>

        <FooterSection />
        <KeywordsSection />
      </div>
    </div>
  );
};

export default NewHomePageComponent;

