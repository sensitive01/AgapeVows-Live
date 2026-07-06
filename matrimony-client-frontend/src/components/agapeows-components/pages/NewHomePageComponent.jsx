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

const NewHomePageComponent = () => {
  return (
    <div className="min-h-screen relative" id="new-homepage-wrapper">

      <div className="fixed top-0 left-0 right-0 z-[101]">
        <MainLayout />
      </div>

      <div className="pt-12">
        <HeroSearchSection />
        <HighlightedProfilesSection />



        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-visible max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        </div>

        <HowItWorksSection />
        <BlogSection />

        <div className="flex flex-col gap-2 lg:gap-4 py-2 sm:py-4 overflow-visible max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <FindYourMatchCTASection />
        </div>

        <FooterSection />
      </div>
    </div>
  );
};

export default NewHomePageComponent;

