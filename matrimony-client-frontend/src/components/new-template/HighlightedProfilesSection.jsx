import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUserProfilesHome, getUserInfo } from "../../api/axiosService/userAuthService";

const HighlightedProfilesSection = () => {
  const [allProfiles, setAllProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDenomination, setSelectedDenomination] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const res = await fetchAllUserProfilesHome();
        if (res?.data?.success) {
          const fetchedProfiles = res.data.data;

          // Attempt to determine logged in user's gender to show opposite gender profiles
          const loggedInUserId = localStorage.getItem("userId");
          let userGender = localStorage.getItem("gender");

          if (loggedInUserId && !userGender) {
             const loggedInUser = fetchedProfiles.find(p => p._id === loggedInUserId || p.agwid === loggedInUserId);
             if (loggedInUser && loggedInUser.gender) {
                 userGender = loggedInUser.gender;
                 localStorage.setItem("gender", userGender);
             } else {
                 try {
                     const userInfoRes = await getUserInfo(loggedInUserId);
                     if (userInfoRes?.data?.data?.gender) {
                         userGender = userInfoRes.data.data.gender;
                         localStorage.setItem("gender", userGender);
                     }
                 } catch (e) {
                     console.error("Error fetching user info:", e);
                 }
             }
          }

          let baseProfiles = fetchedProfiles;
          let finalProfiles = [];

          // Filter by opposite gender if user is logged in
          if (loggedInUserId && userGender) {
             const genderLower = userGender.toLowerCase();
             const oppositeGender = genderLower === "male" ? "female" : "male";
             baseProfiles = baseProfiles.filter(p => p.gender && p.gender.toLowerCase() === oppositeGender);
             finalProfiles = baseProfiles.sort(() => 0.5 - Math.random());
          } else {
             // Mixture of groom and bride if not logged in
             const males = baseProfiles.filter(p => p.gender && p.gender.toLowerCase() === "male").sort(() => 0.5 - Math.random());
             const females = baseProfiles.filter(p => p.gender && p.gender.toLowerCase() === "female").sort(() => 0.5 - Math.random());
             
             const maxLength = Math.max(males.length, females.length);
             for (let i = 0; i < maxLength; i++) {
                 // Alternate: Bride then Groom
                 if (i < females.length) finalProfiles.push(females[i]);
                 if (i < males.length) finalProfiles.push(males[i]);
             }
          }

          setAllProfiles(finalProfiles);
          setFilteredProfiles(finalProfiles.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching highlighted profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfiles();
  }, []);

  useEffect(() => {
    if (allProfiles.length > 0) {
      let result = allProfiles;
      if (selectedDenomination !== "All") {
        result = allProfiles.filter(p => p.denomination === selectedDenomination);
      }
      setFilteredProfiles(result.slice(0, 6));
    }
  }, [selectedDenomination, allProfiles]);

  const handleCardClick = (id) => {
    window.scrollTo(0, 0);
    const userId = localStorage.getItem("userId");
    if (userId) {
      // If logged in, take them to the specific person's profile
      navigate(`/profile-more-details/${id}`);
    } else {
      // If not logged in, take to registration/login
      navigate("/user/user-login");
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference).getUTCFullYear() - 1970;
    return age;
  };

  // Distinct denominations from the fetched profiles
  const denominations = ["All", ...new Set(allProfiles.map(p => p.denomination).filter(Boolean))];

  return (
    <section className="py-12 bg-gray-50 overflow-hidden" id="highlighted-profiles-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Sidebar Info */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
              Stand Out <br />
              and Let Your <br />
              <span className="italic font-serif text-teal-500" style={{ color: 'var(--primary-purple)' }}>Uniqueness</span> <br />
              Shine!
            </h2>

            <div className="bg-purple-100/50 p-6 rounded-2xl border border-purple-200" style={{ backgroundColor: 'rgba(94, 44, 165, 0.05)', borderColor: 'rgba(94, 44, 165, 0.2)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">Highlighted Profiles</h3>
                <span style={{ color: 'var(--primary-purple)' }}>^</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Our hand-picked profiles, May this be your soulmate.
              </p>
              
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Search By Denomination</label>
                <select 
                  className="w-full p-3 rounded-xl border border-gray-200 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
                  value={selectedDenomination}
                  onChange={(e) => setSelectedDenomination(e.target.value)}
                  style={{ cursor: 'pointer' }}
                >
                  {denominations.map((den, i) => (
                    <option key={i} value={den}>{den}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  const userId = localStorage.getItem("userId");
                  if (userId) navigate("/user/user-all-profile");
                  else navigate("/user/user-login");
                }}
                className="w-full flex items-center justify-center gap-2 bg-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all uppercase text-sm tracking-wider mt-6 border"
                style={{ borderColor: 'var(--primary-purple)', color: 'var(--primary-purple)' }}
              >
                Find Partner
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
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
            ) : filteredProfiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <i className="fa fa-users text-5xl text-gray-200 mb-4"></i>
                <h3 className="text-xl font-bold text-gray-500">No profiles found</h3>
                <p className="text-gray-400">Try selecting a different denomination</p>
                <button onClick={() => setSelectedDenomination("All")} className="mt-4 font-bold underline" style={{ color: 'var(--primary-purple)' }}>Reset Filter</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles.map((profile) => (
                  <div
                    key={profile._id}
                    onClick={() => handleCardClick(profile._id)}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 transform hover:-translate-y-1 h-full flex flex-col"
                  >
                    <div className="relative h-[280px] overflow-hidden">
                      <img
                        src={profile.profileImage || "https://res.cloudinary.com/dl92xeqq8/image/upload/v1711440000/default-profile.png"}
                        alt={profile.userName}
                        className="w-full h-full object-cover blur-[3px] scale-110 group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Watermark Overlay on the Right Side */}
                      <div
                        style={{
                          position: "absolute",
                          right: "8px",
                          top: 0,
                          bottom: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                          userSelect: "none",
                          zIndex: 5,
                        }}
                      >
                        <span
                          style={{
                            color: "rgba(255, 255, 255, 0.45)",
                            fontFamily: "'Outfit', 'Inter', sans-serif",
                            fontSize: "14px",
                            fontWeight: "600",
                            letterSpacing: "3px",
                            whiteSpace: "nowrap",
                            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          AgapeVows.com
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                      
                      {/* Gender Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-10 border border-gray-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                          {profile.gender === "Male" ? "Groom" : "Bride"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-start">
                          <span className="text-gray-800 font-bold text-lg">{profile.agwid || "AV0000"}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold uppercase" style={{ color: 'var(--primary-purple)', backgroundColor: 'rgba(94, 44, 165, 0.05)' }}>
                            {profile.denomination || "Christian"}
                          </span>
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <span className="text-gray-600 text-sm font-semibold line-clamp-1">
                            {profile.occupation || profile.jobType || "Professional"}
                          </span>
                          <span className="text-gray-400 text-xs font-medium line-clamp-1">
                            {profile.education || profile.degree || "Qualified Professional"}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            {profile.city || "Location N/A"}
                          </span>
                          <span className="text-gray-700 text-sm font-bold bg-gray-50 px-3 py-1 rounded-lg">
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
