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

const UserHomePage = () => {
  return (
    <>
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
