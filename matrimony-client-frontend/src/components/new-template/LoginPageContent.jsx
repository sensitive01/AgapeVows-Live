import React from 'react';
import loginImg from '../../assets/new-template/images/login_content_img.png';
import { FaUsers, FaChurch, FaBible, FaShieldAlt, FaRegHandshake, FaHeadset, FaSearch } from 'react-icons/fa';

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
                { icon: <FaChurch className="text-indigo-500" />, title: "Blessed Unions", desc: "Countless couples have found their eternal partners through our network." }
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
    <section className="bg-white py-20 sm:py-28 overflow-hidden relative border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 font-inter">
            Why Choose AgapeVows?
          </h2>
          <p className="text-lg text-gray-600">
            A premium matchmaking experience built exclusively on the foundation of Christian values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Feature 1 */}
          <div className="flex gap-6 p-8 rounded-3xl bg-purple-50/50 hover:bg-purple-50 transition-colors border border-purple-100/50">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-md flex items-center justify-center text-purple-600 text-2xl">
              <FaShieldAlt />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Uncompromised Privacy</h4>
              <p className="text-gray-600 leading-relaxed">
                We utilize enterprise-grade security protocols. You maintain full control over who views your photos, contact details, and sensitive information.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex gap-6 p-8 rounded-3xl bg-indigo-50/50 hover:bg-indigo-50 transition-colors border border-indigo-100/50">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-md flex items-center justify-center text-indigo-600 text-2xl">
              <FaSearch />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Advanced Faith Filters</h4>
              <p className="text-gray-600 leading-relaxed">
                Filter potential matches not just by age and location, but by denomination, church attendance, and core spiritual beliefs to ensure deep alignment.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex gap-6 p-8 rounded-3xl bg-pink-50/50 hover:bg-pink-50 transition-colors border border-pink-100/50">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-md flex items-center justify-center text-pink-600 text-2xl">
              <FaRegHandshake />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">100% Verified Members</h4>
              <p className="text-gray-600 leading-relaxed">
                Every single profile on our platform undergoes a rigorous manual verification process to ensure authenticity and keep our community pure.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex gap-6 p-8 rounded-3xl bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100/50">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-600 text-2xl">
              <FaHeadset />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Dedicated Support</h4>
              <p className="text-gray-600 leading-relaxed">
                Our support team is available 24/7 to assist you with any questions or concerns you might have throughout your matchmaking journey.
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
