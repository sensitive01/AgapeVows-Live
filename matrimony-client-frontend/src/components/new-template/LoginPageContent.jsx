import React from 'react';
import loginImg from '../../assets/new-template/images/login_content_img.png';
import { FaUsers, FaChurch, FaBible, FaShieldAlt, FaRegHandshake, FaHeadset, FaSearch, FaLock } from 'react-icons/fa';

const LoginPageContent = () => {
  return (
    <>
    {/* ORIGINAL TOP SECTION */}
    <section className="bg-slate-50 py-16 sm:py-24 overflow-hidden relative border-t border-purple-100">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-100 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Section */}
          <div className="order-1 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
              <FaChurch />
              <span>Welcome Back</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 font-inter">
              Continue Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Beautiful Story</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every beautiful Christian marriage starts with a single step of faith. Reconnect with a community that understands the importance of building a life centered around God's word.
            </p>
            
            <ul className="space-y-4">
              {[
                { icon: <FaUsers className="text-indigo-500" />, title: "Vibrant Community", desc: "Engage with thousands of Christian singles actively seeking marriage." },
                { icon: <FaBible className="text-indigo-500" />, title: "Christ-Centered", desc: "A safe platform designed exclusively for those who hold faith dear." },
                { icon: <FaChurch className="text-indigo-500" />, title: "Christian Matrimony, Built on Trust", desc: "Verified profiles, privacy-first features, and a shared foundation of faith." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
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

          {/* Image Section */}
          <div className="order-2 lg:order-2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-transparent rounded-2xl transform rotate-3 scale-105 z-0"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={loginImg} 
                alt="Continue Your Story" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* NEW WHY CHOOSE US SECTION (NO REVIEWS) */}
    <section className="bg-white py-20 sm:py-28 overflow-hidden relative">
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

export default LoginPageContent;
