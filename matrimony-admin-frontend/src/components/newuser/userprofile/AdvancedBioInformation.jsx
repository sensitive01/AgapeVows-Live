import React, { useState } from "react";

const AdvancedBioInformation = ({formData, handleInputChange, setFormData}) => {
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');

  const fetchLocationByPincode = async (pincode) => {
    if (!pincode || pincode.length !== 6) {
      return;
    }

    setPincodeLoading(true);
    setPincodeError('');

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        
        // Update formData directly if setFormData is provided
        if (setFormData) {
          setFormData(prevData => ({
            ...prevData,
            city: postOffice.District,
            state: postOffice.State
          }));
        } else {
          // Fallback: Create a custom event with both values
          const multiUpdateEvent = {
            target: {
              name: 'multiUpdate',
              value: {
                city: postOffice.District,
                state: postOffice.State
              }
            }
          };
          
          // Try multi-update first
          if (handleInputChange.length > 1 || handleInputChange.toString().includes('multiUpdate')) {
            handleInputChange(multiUpdateEvent);
          } else {
            // Fallback to individual updates
            handleInputChange({
              target: { name: 'city', value: postOffice.District }
            });
            setTimeout(() => {
              handleInputChange({
                target: { name: 'state', value: postOffice.State }
              });
            }, 10);
          }
        }
      } else {
        setPincodeError('Invalid pincode or no data found');
      }
    } catch (error) {
      setPincodeError('Error fetching location data');
      console.error('Error fetching pincode data:', error);
    } finally {
      setPincodeLoading(false);
    }
  };

  const handlePincodeChange = (e) => {
    const pincode = e.target.value;
    handleInputChange(e);
    
    // Auto-fetch when pincode is 6 digits
    if (pincode.length === 6) {
      fetchLocationByPincode(pincode);
    }
  };

  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h4>Basic info</h4>
        <h1>Advanced bio</h1>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Gender:</label>
          <select
            className="form-select chosen-select"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Religion:</label>
          <select
            className="form-select chosen-select"
            name="religion"
            value={formData.religion}
            onChange={handleInputChange}
          >
            <option value="">Select your Religion</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Islam">Islam</option>
            <option value="Christianity">Christianity</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Buddhism">Buddhism</option>
            <option value="Jainism">Jainism</option>
            <option value="Judaism">Judaism</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Pincode:</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handlePincodeChange}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              pattern="[0-9]{6}"
            />
            {pincodeLoading && (
              <div style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                fontSize: '12px',
                color: '#007bff'
              }}>
                Loading...
              </div>
            )}
          </div>
          {pincodeError && (
            <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {pincodeError}
            </div>
          )}
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">City:</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City will be auto-filled"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">State:</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State will be auto-filled"
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Date of birth:</label>
          <input
            type="date"
            className="form-control"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Height: (in cm)</label>
          <input
            type="text"
            className="form-control"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder="Height in cm" 
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Weight:(in kg)</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="e.g., 65 kg or 143 lbs"
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Fathers name:</label>
          <input
            type="text"
            className="form-control"
            name="fathersName"
            value={formData.fathersName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Mothers name:</label>
          <input
            type="text"
            className="form-control"
            name="mothersName"
            value={formData.mothersName}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedBioInformation;