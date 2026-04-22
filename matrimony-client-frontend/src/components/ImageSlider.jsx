// src/components/ImageSlider.jsx
import React from "react";

const ImageSlider = ({ allImages, currentImageIndex, setCurrentImageIndex, defaultImage }) => {
  const images = allImages?.length ? allImages : [defaultImage];

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <img
        src={images[currentImageIndex]}
        alt="Profile"
        style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
      />
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
            }
          >
            ◀
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
            }
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
