import React from "react";
import RelatedProfiles from "./RelatedProfiles";
import MembershipBadge from "../../components/common/MembershipBadge";

const DisPlayProfileDetails = ({
  profileData,
  calculatedAge,
  setCurrentImageIndex,
  formatDate,
  isAccepted,
}) => {
  return (
    <div className="profile-details-scrollable">
      <div className="profi-pg profi-bio">
        <div className="lhs">
          <div className="pro-pg-intro">
            <h1>
              {isAccepted
                ? profileData.userName || "Name not available"
                : profileData.agwid || "ID Hidden"}
              <MembershipBadge user={profileData} />
            </h1>
            <div
              style={{
                filter: isAccepted ? "none" : "blur(5px)",
                userSelect: isAccepted ? "auto" : "none",
                opacity: isAccepted ? 1 : 0.7,
                pointerEvents: isAccepted ? "auto" : "none",
              }}
            >
              <div className="pro-info-status">
                <span className="stat-1">
                  <b>100</b> viewers
                </span>
                <span className="stat-2">
                  <b>Available</b> online
                </span>
              </div>
              <ul>
                <li>
                  <div>
                    <img src="images/icon/pro-city.png" loading="lazy" alt="" />
                    <span>
                      City:{" "}
                      <strong>{profileData.city || "Not specified"}</strong>
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/pro-age.png" loading="lazy" alt="" />
                    <span>
                      Age:{" "}
                      <strong>
                        {calculatedAge || profileData.age || "Not specified"}
                      </strong>
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/pro-city.png" loading="lazy" alt="" />
                    <span>
                      Height:{" "}
                      <strong>
                        {profileData.height
                          ? `${profileData.height}cm`
                          : "Not specified"}
                      </strong>
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <img src="images/icon/pro-city.png" loading="lazy" alt="" />
                    <span>
                      Job:{" "}
                      <strong>{profileData.jobType || "Not specified"}</strong>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* PROFILE ABOUT */}
          <div
            className="pr-bio-c pr-bio-abo"
            style={{
              filter: isAccepted ? "none" : "blur(5px)",
              userSelect: isAccepted ? "auto" : "none",
            }}
          >
            <h3>About</h3>
            <p>
              {profileData.aboutMe ||
                "No information provided about this profile."}
            </p>
          </div>

          <div
            className="pr-bio-c pr-bio-gal"
            id="gallery"
            style={{
              pointerEvents: isAccepted ? "auto" : "none",
            }}
          >
            <h3>Photo gallery</h3>
            <div id="image-gallery">
              {profileData.additionalImages &&
                profileData.additionalImages.length > 0 ? (
                profileData.additionalImages.map((image, index) => (
                  <div key={index} className="pro-gal-imag">
                    <div className="img-wrapper">
                      <a
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentImageIndex(index + 1); // +1 because profile image is at index 0
                        }}
                      >
                        <img
                          src={image}
                          className="img-responsive"
                          alt={`Gallery image ${index + 1}`}
                        />
                      </a>
                      <div className="img-overlay">
                        <i className="fa fa-arrows-alt" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No additional images available</p>
              )}
            </div>
          </div>

          {/* Contact Info - Hidden if not accepted */}
          {isAccepted && (
            <div className="pr-bio-c pr-bio-conta">
              <h3>Contact info</h3>
              <ul>
                <li>
                  <span>
                    <i className="fa fa-mobile" aria-hidden="true" />
                    <b>Phone:</b>
                    {profileData.userMobile || "Not provided"}
                  </span>
                </li>
                <li>
                  <span>
                    <i className="fa fa-envelope-o" aria-hidden="true" />
                    <b>Email:</b>
                    {profileData.userEmail || "Not provided"}
                  </span>
                </li>
                <li>
                  <span>
                    <i className="fa fa fa-map-marker" aria-hidden="true" />
                    <b>Address: </b>
                    {profileData.address || "Not provided"}
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* Personal Information */}
          <div
            className="pr-bio-c pr-bio-info"
            style={{
              filter: isAccepted ? "none" : "blur(5px)",
              userSelect: isAccepted ? "auto" : "none",
            }}
          >
            <h3>Personal information</h3>
            <ul>
              <li>
                <b>Name:</b> {profileData.userName || "Not provided"}
              </li>
              <li>
                <b>Father's name:</b>{" "}
                {profileData.fathersName || "Not provided"}
              </li>
              <li>
                <b>Mother's name:</b>{" "}
                {profileData.mothersName || "Not provided"}
              </li>
              <li>
                <b>Age:</b> {calculatedAge || profileData.age || "Not provided"}
              </li>
              <li>
                <b>Date of birth:</b>{" "}
                {formatDate(profileData.dateOfBirth) || "Not provided"}
              </li>
              <li>
                <b>Height:</b>{" "}
                {profileData.height
                  ? `${profileData.height}cm`
                  : "Not provided"}
              </li>
              <li>
                <b>Weight:</b>{" "}
                {profileData.weight
                  ? `${profileData.weight}kg`
                  : "Not provided"}
              </li>
              <li>
                <b>Degree:</b> {profileData.degree || "Not provided"}
              </li>
              <li>
                <b>Gender:</b> {profileData.gender || "Not provided"}
              </li>
              <li>
                <b>College:</b> {profileData.college || "Not provided"}
              </li>
              <li>
                <b>School:</b> {profileData.school || "Not provided"}
              </li>
              <li>
                <b>Job Type:</b> {profileData.jobType || "Not provided"}
              </li>
              <li>
                <b>Company:</b> {profileData.companyName || "Not provided"}
              </li>
              <li>
                <b>Job Experience:</b>{" "}
                {profileData.jobExperience
                  ? `${profileData.jobExperience} years`
                  : "Not provided"}
              </li>
              <li>
                <b>Salary:</b>{" "}
                {profileData.salary ? `₹${profileData.salary}` : "Not provided"}
              </li>
            </ul>
          </div>

          {/* Hobbies */}
          <div
            className="pr-bio-c pr-bio-hob"
            style={{
              filter: isAccepted ? "none" : "blur(5px)",
              userSelect: isAccepted ? "auto" : "none",
            }}
          >
            <h3>Hobbies</h3>
            <ul>
              {profileData.hobbies && profileData.hobbies.length > 0 ? (
                profileData.hobbies.map((hobby, index) => (
                  <li key={index}>
                    <span>{hobby}</span>
                  </li>
                ))
              ) : (
                <li>
                  <span>No hobbies listed</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media - Hidden if not accepted */}
          {isAccepted && (
            <div className="pr-bio-c menu-pop-soci pr-bio-soc">
              <h3>Social media</h3>
              <ul>
                {profileData.facebook && (
                  <li>
                    <a
                      href={profileData.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                )}
                {profileData.x && (
                  <li>
                    <a
                      href={profileData.x}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                )}
                {profileData.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${profileData.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                )}
                {profileData.linkedin && (
                  <li>
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                )}
                {profileData.youtube && (
                  <li>
                    <a
                      href={profileData.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-youtube-play" aria-hidden="true" />
                    </a>
                  </li>
                )}
                {profileData.instagram && (
                  <li>
                    <a
                      href={profileData.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                )}
              </ul>
              {!profileData.facebook &&
                !profileData.x &&
                !profileData.whatsapp &&
                !profileData.linkedin &&
                !profileData.youtube &&
                !profileData.instagram && <p>No social media links provided</p>}
            </div>
          )}
        </div>

        {/* PROFILE RHS */}
        <div className="rhs">
          {/* HELP BOX */}
         
          <RelatedProfiles />
        </div>
      </div>
    </div>
  );
};

export default DisPlayProfileDetails;
