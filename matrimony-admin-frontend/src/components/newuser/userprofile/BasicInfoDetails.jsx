import React from "react";

const BasicInfoDetails = ({formData,handleInputChange}) => {
  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h4>Basic info</h4>
        <h1>Edit my profile</h1>
      </div>
      <div className="form-group">
        <label className="lb">Name:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your full name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="lb">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          disabled
        />
      </div>
      <div className="form-group">
        <label className="lb">Phone:</label>
        <input
          type="number"
          className="form-control"
          id="phone"
          placeholder="Enter phone number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          disabled
        />
      </div>
      <div className="form-group">
        <label className="lb">Password:</label>
        <input
          type="password"
          className="form-control"
          id="pwd"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label className="lb">About me:</label>
        <textarea
          className="form-control"
          placeholder="Tell us about yourself"
          name="aboutMe"
          value={formData.aboutMe}
          onChange={handleInputChange}
          rows="4"
        />
      </div>
    </div>
  );
};

export default BasicInfoDetails;