import React, { useState, useRef } from "react";
import { sendInterestData } from "../../api/axiosService/userAuthService";

const ShowInterest = ({ selectedUser, userId, onSuccess }) => {
    const senderId = localStorage.getItem("userId");
  console.log("ShowInterest component rendered with selectedUser:", selectedUser);
  console.log("ShowInterest component rendered with senderId:", senderId);
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState({
    about: true,
    photo: false,
    contact: false,
    personal: false,
    hobbies: false,
    social: false,
  });
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (permission) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSendInterestClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);

      // Prepare the data to send
      const interestData = {
        targetUser: selectedUser._id,
        permissions: selectedPermissions,
        message: message,
        timestamp: new Date().toISOString(),
      };

      console.log("Sending interest datas:", interestData, senderId); // Debug log

      // Call the parent function with the data
      await sendInterestData(interestData, senderId);

      // Show success message
      alert("Interest sent successfully!");

      // Update parent state
      if (onSuccess) {
        onSuccess();
      }

      // Close modal programmatically
      if (modalRef.current) {
        // For Bootstrap 5
        const modal = window.bootstrap?.Modal?.getInstance(modalRef.current);
        if (modal) {
          modal.hide();
        } else {
          // For Bootstrap 4 (jQuery)
          if (window.$) {
            window.$(modalRef.current).modal("hide");
          }
        }
      }

      // Reset form
      setMessage("");
      setSelectedPermissions({
        about: true,
        photo: false,
        contact: false,
        personal: false,
        hobbies: false,
        social: false,
      });
    } catch (error) {
      console.error("Error sending interest:", error);
      alert(`Failed to send interest: ${error.message || "Please try again."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="sendInter" ref={modalRef}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <h5 className="modal-title" style={{ fontWeight: "600" }}>
              Send interest to{" "}
              <span style={{ color: "#e91e63" }}>
                {selectedUser?.userName || "User"}
              </span>
            </h5>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body p-4">
            <div className="container-fluid">
              <div className="row">
                {/* Left Column - Image */}
                <div className="col-md-5 mb-3 mb-md-0 d-flex align-items-start justify-content-center">
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={
                        selectedUser?.profileImage ||
                        "images/default-profile.jpg"
                      }
                      alt={selectedUser?.userName}
                      style={{
                        width: "100%",
                        height: "auto",
                        minHeight: "200px",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.target.src = "images/default-profile.jpg";
                      }}
                    />
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="col-md-7">
                  <h6
                    className="mb-3 text-secondary"
                    style={{ lineHeight: "1.5" }}
                  >
                    Permissions:{" "}
                    <strong className="text-dark">
                      {selectedUser?.userName}
                    </strong>{" "}
                    will be able to view:
                  </h6>

                  <div className="row g-2 mb-4">
                    {[
                      { id: "about", label: "About section" },
                      { id: "photo", label: "Photo gallery" },
                      { id: "contact", label: "Contact info" },
                      { id: "personal", label: "Personal info" },
                      { id: "hobbies", label: "Hobbies" },
                      { id: "social", label: "Social media" },
                    ].map((perm) => (
                      <div key={perm.id} className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`pro_${perm.id}`}
                            checked={selectedPermissions[perm.id]}
                            onChange={() => handleCheckboxChange(perm.id)}
                            style={{ cursor: "pointer" }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`pro_${perm.id}`}
                            style={{ cursor: "pointer", fontSize: "14px" }}
                          >
                            {perm.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-group">
                    <label
                      htmlFor="comment"
                      className="form-label fw-bold mb-2"
                    >
                      Message to{" "}
                      <span style={{ color: "#e91e63" }}>
                        {selectedUser?.userName}
                      </span>
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="3"
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{ resize: "none", width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={handleSendInterestClick}
              disabled={isLoading}
              style={{ backgroundColor: "#e91e63", borderColor: "#e91e63" }}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                "Send interest"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowInterest;
