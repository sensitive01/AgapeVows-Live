import React from "react";

import LayoutComponent from "../components/layouts/LayoutComponent";
import BannerAndSearch from "../components/BannerAndSearch";
import BannerSlider from "../components/BannerSlider";
import QuickAccess from "../components/QuickAccess";
import TrustBrands from "../components/TrustBrands";
import WhyChooseUs from "../components/WhyChooseUs";
import WelcomeTo from "../components/WelcomeTo";
import CountModal from "../components/CountModal";
import Moments from "../components/Moments";
import RecentCouples from "../components/RecentCouples";
import OurProfessionals from "../components/OurProfessionals";
import GallaryStart from "../components/GallaryStart";
import BlogPostStart from "../components/BlogPostStart";
import FindYourPerfectMatchNow from "../components/FindYourPerfectMatchNow";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import SEOHelmet from "../components/common/SEOHelmet";
import bannerBg from "../assets/images/ban-bg.jpg";

const UserHomePage = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AgapeVows",
    "url": "https://agapevows.com",
    "logo": "https://agapevows.com/logo.png",
    "description": "India's Trusted Christian Matrimony",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9345244503",
      "contactType": "customer service",
      "email": "SUPPORT@AGAPEVOWS.COM"
    },
    "sameAs": [
      "https://www.facebook.com/AgapeVows/",
      "https://www.instagram.com/agapevows_matrimony",
      "https://www.youtube.com/@AgapeVowsMatrimony"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AgapeVows",
    "url": "https://agapevows.com"
  };

  return (
    <>
      <SEOHelmet 
        title="AgapeVows - India's Trusted Christian Matrimony" 
        description="Find your God-given match on AgapeVows, the trusted Christian matrimony platform with verified profiles and secure matchmaking." 
        canonicalUrl="/"
        schemaData={[orgSchema, websiteSchema]}
        preloadImage={bannerBg}
      />
      <LayoutComponent />
      <BannerAndSearch />
      <BannerSlider />
      <QuickAccess />
      <TrustBrands />
      <WhyChooseUs />
      <WelcomeTo />
      <CountModal />
      <Moments />
      <RecentCouples />
      <OurProfessionals />
      <GallaryStart />
      <BlogPostStart />
      <FindYourPerfectMatchNow />
      <Footer />
      <CopyRights />
    </>
  );
};

export default UserHomePage;
