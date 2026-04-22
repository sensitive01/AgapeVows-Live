import React from "react";

const LifestylePartnerPreferences = ({ formData, handleInputChange }) => {
  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h1>Lifestyle  Preferences</h1>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Diet:</label>
          <select
            className="form-select chosen-select"
            name="diet"
            value={formData.diet}
            onChange={handleInputChange}
          >
            <option value="">Select Diet Preference</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Jain Vegetarian">Jain Vegetarian</option>
            <option value="Eggetarian">Eggetarian</option>
            <option value="Occasionally Non-Vegetarian">
              Occasionally Non-Vegetarian
            </option>
          </select>
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Smoking:</label>
          <select
            className="form-select chosen-select"
            name="smoking"
            value={formData.smoking}
            onChange={handleInputChange}
          >
            <option value="">Select Smoking Preference</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Regularly">Regularly</option>
            <option value="Trying to quit">Trying to quit</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Drinking:</label>
          <select
            className="form-select chosen-select"
            name="drinking"
            value={formData.drinking}
            onChange={handleInputChange}
          >
            <option value="">Select Drinking Preference</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Socially">Socially</option>
            <option value="Regularly">Regularly</option>
          </select>
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Exercise/Fitness:</label>
          <select
            className="form-select chosen-select"
            name="exercise"
            value={formData.exercise}
            onChange={handleInputChange}
          >
            <option value="">Select Exercise Preference</option>
            <option value="Daily">Daily</option>
            <option value="Few times a week">Few times a week</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Rarely">Rarely</option>
            <option value="Never">Never</option>
          </select>
        </div>
      </div>

      {/* Partner Preferences Section */}
      <div
        className="section-header"
        style={{ marginBottom: "20px", marginTop: "40px" }}
      >
        <div className="form-tit">
          <h1> Partner Preferences</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Desired Age Range (From):</label>
          <input
            type="number"
            className="form-control"
            name="desiredAgeFrom"
            value={formData.desiredAgeFrom}
            onChange={handleInputChange}
            placeholder="Minimum age"
            min="18"
            max="100"
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Desired Age Range (To):</label>
          <input
            type="number"
            className="form-control"
            name="desiredAgeTo"
            value={formData.desiredAgeTo}
            onChange={handleInputChange}
            placeholder="Maximum age"
            min="18"
            max="100"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Desired Religion:</label>
          <select
            className="form-select chosen-select"
            name="desiredReligion"
            value={formData.desiredReligion}
            onChange={handleInputChange}
          >
            <option value="">Select Desired Religion</option>
            <option value="Any">Any</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Jainism">Jainism</option>
            <option value="Judaism">Judaism</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Desired Caste:</label>
          <select
            className="form-select chosen-select"
            name="desiredCaste"
            value={formData.desiredCaste}
            onChange={handleInputChange}
          >
            <option value="">Select Desired Caste</option>
            <option value="Any">Any</option>
            <option value="Brahmin">Brahmin</option>
            <option value="Kshatriya">Kshatriya</option>
            <option value="Vaishya">Vaishya</option>
            <option value="Shudra">Shudra</option>
            <option value="Other">Other</option>
            <option value="Prefer not to specify">Prefer not to specify</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Desired Education:</label>
          <select
            className="form-select chosen-select"
            name="desiredEducation"
            value={formData.desiredEducation}
            onChange={handleInputChange}
          >
            <option value="">Select Desired Education</option>
            <option value="Any">Any</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD/Doctorate">PhD/Doctorate</option>
            <option value="Professional Degree">Professional Degree</option>
            <option value="Diploma/Certificate">Diploma/Certificate</option>
          </select>
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Desired Location:</label>
          <input
            type="text"
            className="form-control"
            name="desiredLocation"
            value={formData.desiredLocation}
            onChange={handleInputChange}
            placeholder="City, State or Country"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Desired Height Range (From):</label>
          <input
            type="text"
            className="form-control"
            name="desiredHeightFrom"
            value={formData.desiredHeightFrom}
            onChange={handleInputChange}
            placeholder="Height in cm"
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Desired Height Range (To):</label>
          <input
            type="text"
            className="form-control"
            name="desiredHeightTo"
            value={formData.desiredHeightTo}
            onChange={handleInputChange}
            placeholder="Height in cm"
          />
        </div>
      </div>
    </div>
  );
};

export default LifestylePartnerPreferences;
