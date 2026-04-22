import React from "react";

const HobbiesDetails = ({ formData, handleHobbiesChange }) => {
  // Handle individual hobby selection/deselection
  const handleHobbyToggle = (hobbyValue) => {
    const currentHobbies = formData.hobbies || [];
    let updatedHobbies;

    if (currentHobbies.includes(hobbyValue)) {
      // Remove hobby if already selected
      updatedHobbies = currentHobbies.filter((hobby) => hobby !== hobbyValue);
    } else {
      // Add hobby if not selected
      updatedHobbies = [...currentHobbies, hobbyValue];
    }

    // Create a synthetic event to maintain compatibility with existing handler
    const syntheticEvent = {
      target: {
        name: "hobbies",
        value: updatedHobbies,
      },
    };

    handleHobbiesChange(syntheticEvent);
  };

  const hobbiesOptions = [
    "Modelling",
    "Watching",
    "movies",
    "Playing",
    "volleyball",
    "Hangout with family",
    "Adventure travel",
    "Books reading",
    "Music",
    "Cooking",
    "Yoga",
  ];

  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h4>interests</h4>
        <h1>Hobbies</h1>
      </div>
      <div className="chosenini">
        <div className="form-group">
          <label className="lb">Select your Hobbies:</label>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {hobbiesOptions.map((hobby, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "4px 0",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  id={`hobby-${index}`}
                  checked={formData.hobbies.includes(hobby)}
                  onChange={() => handleHobbyToggle(hobby)}
                  style={{ marginRight: "8px" }}
                />
                <label
                  htmlFor={`hobby-${index}`}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    flex: 1,
                  }}
                >
                  {hobby}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Display selected hobbies */}
      {formData.hobbies.length > 0 && (
        <div className="selected-hobbies" style={{ marginTop: "10px" }}>
          <label className="lb">Selected Hobbies:</label>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginTop: "5px",
            }}
          >
            {formData.hobbies.map((hobby, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => handleHobbyToggle(hobby)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "0",
                    lineHeight: "1",
                  }}
                  title="Remove hobby"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HobbiesDetails;
