import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
const FaqPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        {/* SECTION 1: HEADER BANNER */}
        <section className="str">
          <div className="ban-inn ab-ban mb-0">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] bg-[#ffc107] text-black uppercase rounded-sm shadow-sm">
                      #1 Wedding Website
                    </span>
                    <h1>FAQ</h1>
                    <p>
                      Find answers to frequently asked questions about our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FAQ CONTENT */}
        <section className="bg-gray-50 flex-grow pt-12 pb-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Premium Search Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-indigo-600 uppercase bg-indigo-100 rounded-full">Support Center</span>
              <h2 className="text-4xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Everything you need to know about finding your perfect life partner on AgapeVows Matrimony.</p>

              <div className="relative mt-12 max-w-2xl mx-auto group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <svg className="h-6 w-6 text-indigo-500 transition-transform group-focus-within:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="block w-full pl-16 pr-8 py-6 border-0 rounded-[32px] bg-white shadow-2xl focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg font-semibold placeholder-gray-400"
                />
              </div>
            </div>

            <div id="accordion" className="space-y-6">
                {/* 1. Works */}
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="card-header border-0 bg-transparent p-0">
                    <a
                      className="flex items-center justify-between w-full p-8 text-left font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors"
                      data-toggle="collapse"
                      href="#collapse1"
                    >
                      <span className="text-xl md:text-2xl tracking-tight">How does AgapeVows Matrimony work?</span>
                      <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                        <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div id="collapse1" className="collapse show" data-parent="#accordion">
                    <div className="p-8 pt-0 mt-2">
                       <div className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-50 text-gray-800 text-lg leading-relaxed font-medium">
                        Finding your partner is simple: First, register and complete your profile. Set your preferences for religion, education, and lifestyle. Browse verified matches daily and express interest. Once you find a match, you can start safe and secure communication.
                       </div>
                    </div>
                  </div>
                </div>

                {/* 2. Security */}
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="card-header border-0 bg-transparent p-0">
                    <a
                      className="collapsed flex items-center justify-between w-full p-8 text-left font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors"
                      data-toggle="collapse"
                      href="#collapse2"
                    >
                      <span className="text-xl md:text-2xl tracking-tight">How safe is my personal data on this platform?</span>
                      <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                        <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div id="collapse2" className="collapse" data-parent="#accordion">
                    <div className="p-8 pt-0 mt-2">
                       <div className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-50 text-gray-800 text-lg leading-relaxed font-medium">
                        Safety is our top priority. We use military-grade SSL encryption for all transactions and communications. Every single profile is manually reviewed by our team, and we offer robust privacy controls that allow you to choose exactly who can view your photo and contact information.
                       </div>
                    </div>
                  </div>
                </div>

                {/* 3. Verification */}
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="card-header border-0 bg-transparent p-0">
                    <a
                      className="collapsed flex items-center justify-between w-full p-8 text-left font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors"
                      data-toggle="collapse"
                      href="#collapse3"
                    >
                      <span className="text-xl md:text-2xl tracking-tight">How do I verify my profile for more trust?</span>
                      <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                        <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div id="collapse3" className="collapse" data-parent="#accordion">
                    <div className="p-8 pt-0 mt-2">
                       <div className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-50 text-gray-800 text-lg leading-relaxed font-medium">
                        You can earn a 'Verified' badge by uploading a government-issued photo ID (Aadhar, Voter ID, or Passport). Once our team confirms the details match your profile, your account will show the verification tick, which significantly increases interest from other serious members.
                       </div>
                    </div>
                  </div>
                </div>

                {/* 4. Contact Info */}
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="card-header border-0 bg-transparent p-0">
                    <a
                      className="collapsed flex items-center justify-between w-full p-8 text-left font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors"
                      data-toggle="collapse"
                      href="#collapse4"
                    >
                      <span className="text-xl md:text-2xl tracking-tight">Who can see my mobile number and email?</span>
                      <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                        <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div id="collapse4" className="collapse" data-parent="#accordion">
                    <div className="p-8 pt-0 mt-2">
                       <div className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-50 text-gray-800 text-lg leading-relaxed font-medium">
                        By default, your contact information is hidden. You can choose to show it only to Premium members, or only to profiles that have expressed mutual interest. You have full control over these visibility settings in your Account Privacy dashboard.
                       </div>
                    </div>
                  </div>
                </div>

                {/* 5. Payments */}
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="card-header border-0 bg-transparent p-0">
                    <a
                      className="collapsed flex items-center justify-between w-full p-8 text-left font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors"
                      data-toggle="collapse"
                      href="#collapse5"
                    >
                      <span className="text-xl md:text-2xl tracking-tight">What are the different membership plans available?</span>
                      <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                        <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div id="collapse5" className="collapse" data-parent="#accordion">
                    <div className="p-8 pt-0 mt-2">
                       <div className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-50 text-gray-800 text-lg leading-relaxed font-medium">
                        We offer a Free plan for basic browsing and interests. Our Premium plans (Silver, Gold, and Platinum) offer advanced benefits like viewing contact numbers, unlimited direct messaging, profile booster features, and access to a dedicated Relationship Manager for customized matching.
                       </div>
                    </div>
                  </div>
                </div>

                {/* 6. Success Stories */}
                <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
                  <div className="card-header border-0 bg-transparent p-0">
                    <a
                      className="collapsed flex items-center justify-between w-full p-8 text-left font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors"
                      data-toggle="collapse"
                      href="#collapse6"
                    >
                      <span className="text-xl md:text-2xl tracking-tight">How do I delete my profile once I find a match?</span>
                      <div className="bg-gray-50 p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                        <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                  <div id="collapse6" className="collapse" data-parent="#accordion">
                    <div className="p-8 pt-0 mt-2">
                       <div className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-50 text-gray-800 text-lg leading-relaxed font-medium">
                        Congratulations! You can either 'Deactivate' your profile temporarily or 'Delete' it permanently via the Settings menu. We would love for you to share your success story with us, which might inspire other members on their journey to finding love.
                       </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
