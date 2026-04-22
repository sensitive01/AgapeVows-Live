import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUserProfiles } from "../../api/axiosService/userAuthService";
import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
import maleDefault from "../../assets/images/profiles/men1.jpg";
import femaleDefault from "../../assets/images/profiles/12.jpg";

const RelatedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState("loading"); // loading, success, empty, error
  const [debugInfo, setDebugInfo] = useState("");
  const [userId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (!userId) {
          setStatus("error");
          setDebugInfo("User ID missing from Session Storage. Please Login.");
          return;
        }

        // Fetch profiles - this API already handles opposite gender logic
        const response = await fetchAllUserProfiles(userId);

        if (response.status === 200) {
          const data = response.data.data;
          if (data && data.length > 0) {
            setProfiles(data.slice(0, 6));
            setStatus("success");
          } else {
            setStatus("empty");
            setDebugInfo("Server returned 0 opposite-gender profiles.");
          }
        } else {
          setStatus("error");
          setDebugInfo(`Server Error: Status ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching related profiles", error);
        setStatus("error");
        setDebugInfo(error.message || "Unknown Network Error");
      }
    };

    fetchProfiles();
  }, [userId]);

  if (status === "loading") return null;

  if (status === "error" || status === "empty") {
    return (
      <div className="slid-inn pr-bio-c wedd-rel-pro">
        <h3>Related profiles</h3>
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: status === "error" ? "red" : "#666",
          }}
        >
          <p>Status: {status === "error" ? "Error" : "No Profiles Found"}</p>
          <small>{debugInfo}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="slid-inn pr-bio-c wedd-rel-pro">
      <h3>Related profiles</h3>
      <ul
        className="slider3"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: 0,
          justifyContent: "space-between",
        }}
      >
        {profiles.map((profile, index) => {
          let image = profile.profileImage;
          if (!image) {
            if (profile.gender === "Male" || profile.gender === "Groom") {
              image = maleDefault;
            } else if (
              profile.gender === "Female" ||
              profile.gender === "Bride"
            ) {
              image = femaleDefault;
            } else {
              image = defaultProfileImg;
            }
          }

          return (
            <li
              key={profile._id || index}
              style={{
                width: "calc(33.33% - 14px)",
                marginBottom: "20px",
                listStyle: "none",
              }}
            >
              <div className="wedd-rel-box">
                <div className="wedd-rel-img">
                  <img
                    src={image}
                    alt={profile.userName}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="badge badge-success">
                    {profile.age ? `${profile.age} Years old` : "Age N/A"}
                  </span>
                </div>
                <div className="wedd-rel-con">
                  <h5>{profile.userName}</h5>
                  <span>
                    City: <b>{profile.city || "N/A"}</b>
                  </span>
                </div>
                <Link to={`/profile-more-details/${profile._id}`} className="fclick" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedProfiles;
