import React from "react";

const BasicInfomation = ({profileImagePreview,handleProfileImageChange,handleAdditionalImagesChange,additionalImagePreviews,removeAdditionalImage}) => {
  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h4>Profile</h4>
        <h1>Upload Images</h1>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="profile-image-upload">
            <label className="lb">Profile Picture:</label>
            <div
              className="profile-image-container"
              style={{
                position: "relative",
                width: "150px",
                height: "150px",
                margin: "10px 0",
              }}
            >
              <div
                className="profile-image-circle"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  border: "2px dashed #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  backgroundImage: profileImagePreview
                    ? `url(${profileImagePreview})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
                onClick={() =>
                  document.getElementById("profile-image-input").click()
                }
              >
                {!profileImagePreview && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#666",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        marginBottom: "5px",
                      }}
                    >
                      +
                    </div>
                    <div style={{ fontSize: "12px" }}>Upload Photo</div>
                  </div>
                )}
              </div>
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="additional-images-upload">
            <label className="lb">Additional Images:</label>
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesChange}
                className="form-control"
              />
            </div>
            {additionalImagePreviews.length > 0 && (
              <div
                className="additional-images-preview"
                style={{ marginTop: "10px" }}
              >
                <div className="row">
                  {additionalImagePreviews.map((image, index) => (
                    <div
                      key={index}
                      className="col-md-4"
                      style={{ marginBottom: "10px" }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={image.url}
                          alt={`Additional ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          ×
                        </button>
                        {image.isExisting && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "5px",
                              left: "5px",
                              background: "rgba(0, 0, 0, 0.7)",
                              color: "white",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              fontSize: "10px",
                            }}
                          >
                            Existing
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfomation;
