import React, { useState } from "react";
import { X } from "lucide-react";

const FloatingDemoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    location: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (
      !formData.schoolName ||
      !formData.location ||
      !formData.contactPerson ||
      !formData.contactNumber ||
      !formData.email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    console.log("Form submitted:", formData);
    alert("Demo request submitted successfully!");

    // Reset form
    setFormData({
      schoolName: "",
      location: "",
      contactPerson: "",
      contactNumber: "",
      email: "",
    });
    setIsOpen(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "24px 12px",
            borderRadius: "8px 0 0 8px",
            border: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            zIndex: 1000,
            writingMode: "vertical-rl",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "2px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
        >
          BOOK A DEMO
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Floating Form Panel */}
      <div
        style={{
          position: "fixed",
          right: isOpen ? "0" : "-400px",
          top: 0,
          width: "400px",
          height: "100vh",
          backgroundColor: "white",
          boxShadow: "-4px 0 15px rgba(0, 0, 0, 0.2)",
          transition: "right 0.3s ease",
          zIndex: 1050,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>
            Book a Demo
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
          <p
            style={{
              color: "#6b7280",
              marginBottom: "24px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            Fill in your details and we'll get back to you shortly to schedule a
            personalized demo.
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* School Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                School Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Enter school name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Location */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Location <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Contact Person */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Contact Person <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Enter contact person name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Contact Number */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Contact Number <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Email ID <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                backgroundColor: "#1e3a8a",
                color: "white",
                padding: "14px",
                borderRadius: "8px",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "8px",
                transition: "background-color 0.2s",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
            >
              Submit Request
            </button>
          </div>

          {/* Additional Info */}
          <div
            style={{
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#6b7280",
                textAlign: "center",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              By submitting this form, you agree to our terms and conditions.
              We'll contact you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDemoForm;
