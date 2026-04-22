// Import CSS files
import '../../assets/new-template/css/animate.min.css';
import '../../assets/new-template/css/bootstrap.css';
import '../../assets/new-template/css/font-awesome.min.css';
import '../../assets/new-template/css/jquery-ui.css';
import '../../assets/new-template/css/style.css';

// Import all section components
import Preloader from './Preloader';
import PopupSearch from './PopupSearch';
import TopMenu from './TopMenu';
import MainMenu from './MainMenu';
import HeroSearchSection from './HeroSearchSection';
import QuickAccessSection from './QuickAccessSection';
import TrustBrandsSection from './TrustBrandsSection';

import AboutWelcomeSection from './AboutWelcomeSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import FeaturesSection from './FeaturesSection';

import StatsSection from './StatsSection';
import HowItWorksSection from './HowItWorksSection';
import RecentCouplesSection from './RecentCouplesSection';
import TeamSection from './TeamSection';
import GallerySection from './GallerySection';
import BlogSection from './BlogSection';
import FindYourMatchCTASection from './FindYourMatchCTASection';
import FooterSection from './FooterSection';

export default function UserHomePage() {
  return (
    <>
      {/* Header & Navigation Components */}
      <Preloader />
      <PopupSearch />
      <TopMenu />
      <MainMenu />
      
      {/* Hero Section */}
      <HeroSearchSection />
      
      
      {/* Social Proof & Reviews */}
      <TrustBrandsSection />

      {/* Quick Access & Services */}
      <QuickAccessSection />
      
      {/* About Us Section */}
      <AboutWelcomeSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />
      
      {/* Features/Benefits */}
      <FeaturesSection />
      
      {/* Statistics */}
      <StatsSection />
      
      {/* How It Works Timeline */}
      <HowItWorksSection />
      
      {/* Recent Couples Showcase */}
      <RecentCouplesSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Photo Gallery */}
      <GallerySection />
      
      {/* Blog & Articles */}
      <BlogSection />
      
      {/* Final CTA */}
      <FindYourMatchCTASection />
      
      {/* Footer */}
      <FooterSection />
    </>
  );
}
