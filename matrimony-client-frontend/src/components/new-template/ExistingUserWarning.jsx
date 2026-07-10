import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoInformationCircle } from "react-icons/io5";

const ExistingUserWarning = ({ 
  type = "mobile", 
  name = "USER", 
  connectedContact = "", 
  loginId = "",
  onTryAnotherWay = () => {} 
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    // Handle the actual login action here
    setIsLoading(true);
    // TODO: Connect this to actual login API
    console.log("Logging in with", loginId, password);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const isMobile = type === "mobile";
  const isEmail = type === "email";
  const isBoth = type === "both";
  
  return (
    <div style={{
      width: "100%",
      padding: "40px",
      backgroundColor: "#fff",
      borderRadius: "24px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      fontFamily: "'Inter', 'Poppins', sans-serif"
    }}>
      <h2 style={{ 
        fontSize: "24px", 
        fontWeight: "700", 
        color: "#4a2580", 
        marginBottom: "20px",
        fontFamily: "'Playfair Display', serif"
      }}>
        Login Now
      </h2>
      
      <p style={{ 
        fontSize: "15px", 
        color: "#334155", 
        marginBottom: "10px", 
        fontWeight: "500" 
      }}>
        Dear {name.toUpperCase()},
      </p>
      
      <p style={{ 
        fontSize: "15px", 
        color: "#334155", 
        lineHeight: "1.6", 
        marginBottom: "20px" 
      }}>
        You already have profiles associated with the provided {isBoth ? "mobile number and email ID" : isMobile ? "mobile number" : "email ID"}. 
        Therefore, you cannot create a new profile. Instead, you can use the "Add Profile" option. 
        Please log in to your account to view existing profiles and add new profiles.
      </p>

      <div style={{ 
        display: "flex", 
        alignItems: "flex-start", 
        gap: "10px", 
        marginBottom: "30px" 
      }}>
        <IoInformationCircle style={{ color: "#58219f", fontSize: "20px", flexShrink: 0, marginTop: "2px" }} />
        <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5", margin: 0 }}>
          {isBoth ? (
            <>
              The provided email id and mobile number are both associated with your account. 
              Please log in to continue.
            </>
          ) : isMobile ? (
            <>
              The provided email id is not associated with the given mobile number. 
              The given mobile number is connected to the following email id <strong>{connectedContact}</strong>. 
              Please use this email id or mobile number to log in.
            </>
          ) : (
            <>
              The provided mobile number is not associated with the given email ID. 
              The given email id is connected to the following mobile number <strong>{connectedContact}</strong>. 
              Please use this number or given email id to log in.
            </>
          )}
        </p>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ position: "relative", marginBottom: "15px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={{
              width: "100%",
              padding: "12px 15px",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              fontSize: "15px",
              color: "#334155",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#58219f"}
            onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            }}
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {error && (
          <div style={{ color: "#ef4444", fontSize: "13px", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "25px" }}>
          <a href="/forgot-password" style={{ 
            color: "#58219f", 
            fontSize: "14px", 
            fontWeight: "600", 
            textDecoration: "underline" 
          }}>
            Forgot your password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#f1f5f9",
            color: "#94a3b8",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: password ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            ...(password ? {
              backgroundColor: "#f8f9fa",
              color: "#cbd5e1" // matching the mockup's disabled-looking active state
            } : {})
          }}
        >
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </button>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="button"
            onClick={onTryAnotherWay}
            style={{
              background: "none",
              border: "none",
              color: "#58219f",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              textDecoration: "underline",
              padding: "5px 10px"
            }}
          >
            USE DIFFERENT DETAILS
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExistingUserWarning;
