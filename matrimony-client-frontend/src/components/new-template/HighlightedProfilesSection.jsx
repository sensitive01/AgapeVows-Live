import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUserProfilesHome } from "../../api/axiosService/userAuthService";

const HighlightedProfilesSection = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const res = await fetchAllUserProfilesHome();
        if (res?.data?.success) {
          // Shuffle and take top 6
          const shuffled = res.data.data.sort(() => 0.5 - Math.random());
          setProfiles(shuffled.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching highlighted profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfiles();
  }, []);

  const handleCardClick = () => {
    window.scrollTo(0, 0);
    navigate("/user/user-login");
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference).getUTCFullYear() - 1970;
    return age;
  };

  return (
    <section className="py-12 bg-gray-50 overflow-hidden" id="highlighted-profiles-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Info */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
              Stand Out <br />
              and Let Your <br />
              <span className="italic font-serif text-teal-500">Uniqueness</span> <br />
              Shine!
            </h2>

            <div className="bg-teal-100/50 p-6 rounded-2xl border border-teal-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Highlighted Profiles</h3>
                <span className="text-teal-600">^</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Our hand-picked profiles, May this be your soulmate.
              </p>
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/user/user-login");
                }}
                className="w-full flex items-center justify-center gap-2 bg-white border border-teal-500 text-teal-600 font-bold py-3 px-4 rounded-xl hover:bg-teal-50 hover:shadow-md transition-all uppercase text-sm tracking-wider"
              >
                Find Partner 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-teal-200 transition-colors">
              <span className="font-semibold text-gray-700">Christian Matrimony</span>
              <span className="text-gray-400">v</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer hover:border-teal-200 transition-colors">
              <span className="font-semibold text-gray-700">Catholic Matrimony</span>
              <span className="text-gray-400">v</span>
            </div>
          </div>

          {/* Right Grid of Profiles */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[400px] bg-gray-200 rounded-3xl"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <div 
                    key={profile._id}
                    onClick={handleCardClick}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 transform hover:-translate-y-1"
                  >
                    <div className="relative h-[280px] overflow-hidden">
                      <img 
                        src={profile.profileImage || "https://res.cloudinary.com/dl92xeqq8/image/upload/v1711440000/default-profile.png"} 
                        alt={profile.userName}
                        className="w-full h-full object-cover blur-[8px] scale-110 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-gray-800 font-bold text-lg">{profile.agwid || "AV0000"}</span>
                        <span className="text-gray-500 text-sm font-medium line-clamp-1">
                          {profile.education || "Education not specified"}
                        </span>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            {profile.city || "Location N/A"}
                          </span>
                          <span className="text-gray-400 text-sm font-semibold">
                            {calculateAge(profile.dateOfBirth)} Yrs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HighlightedProfilesSection;
