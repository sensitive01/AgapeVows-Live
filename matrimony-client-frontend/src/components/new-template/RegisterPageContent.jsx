import React from 'react';
import registerImg from '../../assets/new-template/images/register_content_img.png';
import { FaHeart, FaCross, FaPrayingHands, FaUserPlus, FaUserFriends, FaRing, FaShieldAlt, FaBible, FaLock, FaUsers } from 'react-icons/fa';

const RegisterPageContent = () => {
  return (
    <>
    <section className="bg-white py-16 sm:py-24 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-100 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-transparent rounded-2xl transform -rotate-3 scale-105 z-0"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={registerImg} 
                alt="Begin Your Journey" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-purple-50 z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FaCross className="text-purple-600 text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Built on</p>
                <p className="text-sm font-bold text-gray-900">Faith & Trust</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-semibold mb-6">
              <FaPrayingHands />
              <span>Begin Your Journey</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 font-inter">
              Find a Life Partner Who <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Shares Your Values</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Marriage is a sacred bond, established by God. We believe that a strong foundation in Christ is the key to a joyful and enduring marriage. Connect with like-minded believers who are seeking a Christ-centered relationship.
            </p>
            
            <ul className="space-y-4">
              {[
                { icon: <FaHeart className="text-purple-500" />, title: "Faith-Aligned Matches", desc: "Connect with individuals who prioritize their relationship with God." },
                { icon: <FaCross className="text-purple-500" />, title: "Shared Values", desc: "Build your future on mutual spiritual beliefs and traditions." },
                { icon: <FaPrayingHands className="text-purple-500" />, title: "Prayerfully Supported", desc: "A community that encourages spiritual growth together." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>

    {/* NEW SECTION: How It Works */}
    <section className="bg-purple-50 py-16 sm:py-24 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-extrabold text-gray-900 font-inter mb-4">Your Journey in 3 Simple Steps</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've made it simple to find a life partner who shares your Christian faith and values.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-purple-600 text-3xl mb-6 border-4 border-purple-50">
              <FaUserPlus />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">1. Create Profile</h4>
            <p className="text-gray-600">Sign up and build a detailed profile highlighting your faith, lifestyle, and what you seek in a partner.</p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-purple-600 text-3xl mb-6 border-4 border-purple-50">
              <FaUserFriends />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">2. Discover Matches</h4>
            <p className="text-gray-600">Browse through verified profiles and let our faith-aligned matching system connect you with compatible singles.</p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-purple-600 text-3xl mb-6 border-4 border-purple-50">
              <FaRing />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">3. Begin Forever</h4>
            <p className="text-gray-600">Connect, communicate safely, and take the first steps toward a Christ-centered marriage.</p>
          </div>
        </div>
      </div>
    </section>

    {/* WHY CHOOSE US SECTION */}
    <section className="bg-white py-20 sm:py-28 overflow-hidden relative border-t border-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 font-inter text-[#2d1b6b]">
            Why Choose AgapeVows?
          </h2>
          
          {/* Heart Separator */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "15px 0 20px" }}>
            <div style={{ height: "1px", background: "#d4af37", width: "40px", opacity: 0.5 }}></div>
            <i className="fa fa-heart" style={{ color: "#d4af37", fontSize: "12px", margin: "0 10px" }}></i>
            <div style={{ height: "1px", background: "#d4af37", width: "40px", opacity: 0.5 }}></div>
          </div>
          
          <p className="text-lg text-gray-600">
            A premium matchmaking experience built exclusively on the foundation of Christian values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Feature 1 */}
          <div className="flex gap-6 p-8 rounded-2xl bg-[#f8f7ff] border border-[#f0ebff] hover:shadow-md transition-shadow">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-600 text-3xl">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#2d1b6b] mb-2">100% Verified Profiles</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Every profile is manually verified through mobile OTP verification and government ID verification to help create a trusted Christian matrimony community.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-6 p-8 rounded-2xl bg-[#f4f8ff] border border-[#ebf2ff] hover:shadow-md transition-shadow">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-500 text-3xl">
              <FaBible />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#2d1b6b] mb-2">Faith-Based Matching</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Connect with Christian singles who share your faith, denomination, values, and desire for a Christ-centered marriage.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-6 p-8 rounded-2xl bg-[#fff5f8] border border-[#ffeaf0] hover:shadow-md transition-shadow">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-pink-500 text-3xl">
              <FaLock />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#2d1b6b] mb-2">Privacy First</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                You're in control of your profile. Manage who can view your photos, contact details, and personal information with advanced privacy settings.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-6 p-8 rounded-2xl bg-[#f2fbf5] border border-[#e5f7eb] hover:shadow-md transition-shadow">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-green-500 text-3xl">
              <FaUsers />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#2d1b6b] mb-2">One Platform. Many Denominations.</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Find profiles from various Christian denominations.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
    </>
  );
};

export default RegisterPageContent;
