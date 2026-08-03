import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import landingPageBg from '../../assets/images/landing-page1.png'; 
import SEOHelmet from "../../components/common/SEOHelmet";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-cormorant font-normal">
      <SEOHelmet 
        title="About Us | AgapeVows Christian Matrimony" 
        description="Learn about our mission to help you find your God-given match through trusted and verified profiles on AgapeVows." 
      />
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <LayoutComponent />
      </div>

      {/* --- PAGE HEADER --- */}
      <div className="pt-[160px] pb-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-cormorant font-semibold text-gray-900">
            About AgapeVows
          </h1>
          <div className="h-1 w-16 bg-[#5c2a9d] mt-4"></div>
        </div>
      </div>

      {/* --- MAIN CONTENT: FAITH & MISSION --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap -mx-6 items-start">
            <div className="w-full lg:w-1/2 px-6 mb-10 lg:mb-0">
              <img 
                src={landingPageBg} 
                alt="Our Faith" 
                className="rounded-xl shadow-lg w-full h-[400px] object-cover" 
              />
            </div>
            <div className="w-full lg:w-1/2 px-6">
              <div className="lg:pl-10">
                <h2 className="text-5xl lg:text-7xl font-cormorant font-semibold text-[#4a2580] mb-4 tracking-wide break-words">Built on Faith.<br/>Bound by Love.</h2>
                <h3 className="text-4xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-6">Our Sacred Covenant</h3>
                <p className="text-[22px] text-gray-700 font-source font-normal leading-relaxed mb-6">
                  At <strong className="text-[#4a2580]">AgapeVows</strong>, we believe that marriage is more than a legal contract, it is a sacred covenant. Our name is derived from the Greek word Agape, representing the highest, most selfless form of love: the love God has for us, and the love we are called to show one another.
                </p>
                <div className="p-8 bg-[#f8f5fd] rounded-xl relative mt-8">
                  <div className="absolute -top-4 -left-4 text-4xl text-[#4a2580]">
                    <i className="fa fa-quote-left"></i>
                  </div>
                  <p className="text-2xl text-gray-800 font-cormorant font-medium italic leading-relaxed">
                    "Our mission is simple: To help Indian Christian singles find a life partner who shares their faith, respects their heritage, and walks the same spiritual path."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR STORY --- */}
      <section className="py-16 bg-[#fdfcfb]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
               <h2 className="text-4xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-4">Our Story</h2>
               <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "25px" }}>
                 <div style={{ height: "1px", background: "#4a2580", width: "40px", opacity: 0.7 }}></div>
                 <i className="fa fa-heart" style={{ color: "#4a2580", fontSize: "12px", margin: "0 12px" }}></i>
                 <div style={{ height: "1px", background: "#4a2580", width: "40px", opacity: 0.7 }}></div>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                In a world of endless scrolling and superficial connections, we noticed a gap in the Christian community. Many felt that existing platforms were either too expensive, lacked privacy, or were crowded with unverified profiles.
              </p>
              <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                AgapeVows was born out of a desire to create a sanctuary for matchmaking. We wanted to build a platform where integrity comes first, where your privacy is respected, and where the focus remains on building Christ-centered homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (CLEAN CARDS) --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-12 text-center">Why Choose AgapeVows?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#f8f5fd] text-[#5c2a9d] rounded-md flex items-center justify-center text-sm shrink-0">
                  <i className="fa fa-shield"></i>
                </div>
                <h4 className="text-2xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-0">Integrity through Verification</h4>
              </div>
              <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                We manually review every profile and implement mandatory ID verification. When you see an "Verified" badge, you know you’re talking to someone real.
              </p>
            </div>
            
            <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#f8f5fd] text-[#5c2a9d] rounded-md flex items-center justify-center text-sm shrink-0">
                  <i className="fa fa-users"></i>
                </div>
                <h4 className="text-2xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-0">Accessibility for All</h4>
              </div>
              <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                Finding your soulmate shouldn't be a financial burden. We offer Free Premium features to ensure every member has the tools they need to connect.
              </p>
            </div>

            <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#f8f5fd] text-[#5c2a9d] rounded-md flex items-center justify-center text-sm shrink-0">
                  <i className="fa fa-lock"></i>
                </div>
                <h4 className="text-2xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-0">Privacy First</h4>
              </div>
              <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                Your journey is personal. Manage who sees your photos and contact details with advanced privacy controls. You are in total control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRADITIONS & VISION --- */}
      <section className="py-16 bg-[#fffcf5]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-4">One Faith, Many Traditions</h2>
                <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                  India’s Christian heritage is rich and diverse. Whether you belong to the Roman Catholic, CSI, CNI, Pentecostal, Orthodox, Evangelical, or Baptist traditions, AgapeVows is designed to honour your specific roots while celebrating our shared faith in Christ.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-cormorant font-semibold text-[#4a2580] tracking-wide mb-4">Our Vision</h2>
                <p className="text-[18px] text-gray-700 font-source font-normal leading-relaxed">
                  Our vision is to see a generation of Christian marriages that reflect the love of Christ—marriages built on prayer, shared values, and mutual respect. We provide the platform; we trust God to provide the blessing.
                </p>
              </div>
            </div>
            <div className="bg-[#5c2a9d] rounded-2xl p-10 text-white text-center">
               <h3 className="text-3xl font-cormorant font-semibold tracking-wide mb-4">Ready to find your partner?</h3>
                <p className="text-white/90 text-[18px] font-source font-normal mb-8">Join thousands of verified Christian singles today.</p>
               <a 
                href="/register-free" 
                className="inline-block bg-white text-[#5c2a9d] px-8 py-3 rounded-lg font-source font-semibold text-[18px] hover:bg-gray-50 transition-colors"
               >
                 Create Your Free Profile
               </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
