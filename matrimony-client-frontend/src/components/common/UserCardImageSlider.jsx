import React, { useState, useMemo } from "react";
import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
import maleDefault from "../../assets/images/profiles/men1.jpg";
import femaleDefault from "../../assets/images/profiles/12.jpg";

const UserCardImageSlider = ({ user, height = "220px", blur = false, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const allImages = useMemo(() => {
    const defaultImg =
      user.gender === "Male" || user.gender === "Groom"
        ? maleDefault
        : user.gender === "Female" || user.gender === "Bride"
          ? femaleDefault
          : defaultProfileImg;

    const images = [];

    if (user.profileImage) {
      images.push(user.profileImage);
    }

    if (user.additionalImages && user.additionalImages.length > 0) {
      images.push(...user.additionalImages);
    }

    // Remove duplicates
    const uniqueImages = [...new Set(images)];

    // Return unique images or default if empty
    return uniqueImages.length > 0 ? uniqueImages : [defaultImg];
  }, [user]);

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  };

  const openZoom = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onImageClick) {
      onImageClick(e);
      return;
    }
    if (blur) return; // Disable zoom for blurred images
    setIsZoomOpen(true);
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: height, overflow: "hidden", background: "#f3f4f6" }}>
        <div
          onClick={openZoom}
          style={{
            display: "block",
            height: "100%",
            cursor: "pointer",
          }}
        >
          <img
            src={allImages[currentImageIndex]}
            alt={user.userName}
            onError={(e) => {
              const defaultImg =
                user.gender === "Male" || user.gender === "Groom"
                  ? maleDefault
                  : user.gender === "Female" || user.gender === "Bride"
                    ? femaleDefault
                    : defaultProfileImg;
              e.target.src = defaultImg;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              filter: blur ? "blur(12px)" : "none",
              transition: "filter 0.3s ease"
            }}
          />
        </div>

        {/* Watermark Overlay on the Right Side */}
        <div
          style={{
            position: "absolute",
            right: "5px",
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
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "3px",
              whiteSpace: "nowrap",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              opacity: blur ? 0 : 1, // Hide watermark if blurred
              transition: "opacity 0.3s ease"
            }}
          >
            AgapeVows.com
          </span>
        </div>

        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                top: "50%",
                left: "5px",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i
                className="fa fa-chevron-left"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i
                className="fa fa-chevron-right"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
          </>
        )}
      </div>

      {isZoomOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomOpen(false);
          }}
        >
          <div
            style={{ position: "relative", width: "80vw", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <img
              src={allImages[currentImageIndex]}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                cursor: allImages.length > 1 ? "pointer" : "default"
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (allImages.length > 1) {
                  nextImage();
                }
              }}
              alt="Zoomed"
            />

            {/* Watermark Overlay in Zoomed View */}
            <div
              style={{
                position: "absolute",
                right: "15px",
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
                  fontSize: "18px",
                  fontWeight: "600",
                  letterSpacing: "4px",
                  whiteSpace: "nowrap",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                AgapeVows.com
              </span>
            </div>
            <button
              onClick={() => setIsZoomOpen(false)}
              style={{
                position: "fixed",
                top: "20px",
                right: "30px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                fontSize: "40px",
                cursor: "pointer",
                padding: "0 10px",
                borderRadius: "5px",
                zIndex: 100000,
              }}
            >
              &times;
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  &#10094;
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCardImageSlider;
