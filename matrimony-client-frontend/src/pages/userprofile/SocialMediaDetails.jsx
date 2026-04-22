import React from "react";

const SocialMediaDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h4>Media</h4>
        <h1>Social media</h1>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">WhatsApp:</label>
          <input
            type="text"
            className="form-control"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Facebook:</label>
          <input
            type="text"
            className="form-control"
            name="facebook"
            value={formData.facebook}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Instagram:</label>
          <input
            type="text"
            className="form-control"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">X:</label>
          <input
            type="text"
            className="form-control"
            name="x"
            value={formData.x}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Youtube:</label>
          <input
            type="text"
            className="form-control"
            name="youtube"
            value={formData.youtube}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Linkedin:</label>
          <input
            type="text"
            className="form-control"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDetails;
