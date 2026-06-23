import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import landingPageBg from '../../assets/images/landing-page1.png'; 

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-source font-normal">
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
                <h1 className="text-5xl lg:text-7xl font-cormorant font-bold text-[#5c2a9d] mb-4 uppercase tracking-wide break-words">Built on Faith. Bound by Love.</h1>
                <h3 className="text-4xl font-cormorant font-semibold text-gray-900 mb-6">Our Sacred Covenant</h3>
                <p className="text-2xl text-gray-600 mb-4">
                  At <strong>AgapeVows</strong>, we believe that marriage is more than a legal contract, it is a sacred covenant. Our name is derived from the Greek word <em>Agape</em>, representing the highest, most selfless form of love: the love God has for us, and the love we are called to show one another.
                </p>
                <div className="p-5 bg-[#f8f5fd] rounded-lg border-l-4 border-[#5c2a9d]">
                  <p className="text-2xl text-gray-800 font-cormorant font-medium italic">
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
               <h2 className="text-4xl font-cormorant font-semibold text-gray-900 mb-4">Our Story</h2>
               <div className="w-12 h-1 bg-[#5c2a9d] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-2xl text-gray-600 leading-snug">
                In a world of endless scrolling and superficial connections, we noticed a gap in the Christian community. Many felt that existing platforms were either too expensive, lacked privacy, or were crowded with unverified profiles.
              </p>
              <p className="text-2xl text-gray-600 leading-snug">
                AgapeVows was born out of a desire to create a sanctuary for matchmaking. We wanted to build a platform where integrity comes first, where your privacy is respected, and where the focus remains on building Christ-centered homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (CLEAN CARDS) --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-cormorant font-semibold text-gray-900 mb-12 text-center">Why Choose AgapeVows?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8f5fd] text-[#5c2a9d] rounded-lg flex items-center justify-center text-xl mb-6">
                <i className="fa fa-shield"></i>
              </div>
              <h4 className="text-xl font-cormorant font-semibold text-gray-900 mb-3">Integrity through Verification</h4>
              <p className="text-xl text-gray-600 leading-snug">
                We manually review every profile and implement mandatory ID verification. When you see an "Verified" badge, you know you’re talking to someone real.
              </p>
            </div>
            
            <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8f5fd] text-[#5c2a9d] rounded-lg flex items-center justify-center text-xl mb-6">
                <i className="fa fa-users"></i>
              </div>
              <h4 className="text-xl font-cormorant font-semibold text-gray-900 mb-3">Accessibility for All</h4>
              <p className="text-xl text-gray-600 leading-snug">
                Finding your soulmate shouldn't be a financial burden. We offer Free Premium features to ensure every member has the tools they need to connect.
              </p>
            </div>

            <div className="p-8 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#f8f5fd] text-[#5c2a9d] rounded-lg flex items-center justify-center text-xl mb-6">
                <i className="fa fa-lock"></i>
              </div>
              <h4 className="text-xl font-cormorant font-semibold text-gray-900 mb-3">Privacy First</h4>
              <p className="text-xl text-gray-600 leading-snug">
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
                <h2 className="text-2xl font-cormorant font-semibold text-gray-900 mb-4">One Faith, Many Traditions</h2>
                <p className="text-gray-600 leading-snug">
                  India’s Christian heritage is rich and diverse. Whether you belong to the Roman Catholic, CSI, CNI, Pentecostal, Orthodox, Evangelical, or Baptist traditions, AgapeVows is designed to honour your specific roots while celebrating our shared faith in Christ.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-cormorant font-semibold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-snug">
                  Our vision is to see a generation of Christian marriages that reflect the love of Christ—marriages built on prayer, shared values, and mutual respect. We provide the platform; we trust God to provide the blessing.
                </p>
              </div>
            </div>
            <div className="bg-[#5c2a9d] rounded-2xl p-10 text-white text-center">
               <h3 className="text-2xl font-bold mb-4">Ready to find your partner?</h3>
               <p className="text-white/90 mb-8">Join thousands of verified Christian singles today.</p>
               <a 
                href="/user/user-sign-up" 
                className="inline-block bg-white text-[#5c2a9d] px-8 py-3 rounded-lg font-source font-semibold hover:bg-gray-50 transition-colors"
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
