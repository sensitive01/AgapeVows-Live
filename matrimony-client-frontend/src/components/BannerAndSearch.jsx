import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MasterDataContext } from "../context/MasterDataContext";

const BannerAndSearch = () => {
  const navigate = useNavigate();
  const { denominations = [] } = useContext(MasterDataContext) || {};
  const [formData, setFormData] = useState({
    lookingFor: "Male",
    age: "",
    community: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // Debug: Log each form field value
    console.log("lookingFor:", formData.lookingFor);
    console.log("age:", formData.age);
    console.log("community:", formData.community);
    console.log("city:", formData.city);

    // Navigate regardless of validation (for testing)
    navigate("/show-searched-result", { state: { formData: formData } });
  };

  return (
    <section>
      <div className="str">
        <div className="hom-head">
          <div className="container">
            <div className="row">
              <div className="hom-ban">
                <div className="ban-tit">
                  <span>
                    <i className="no1">#1</i> Matrimony
                  </span>
                  <h1>
                    Find your
                    <br />
                    <b style={{ color: "#A020F0" }}>Right Match</b> here
                  </h1>
                  <p>Most trusted Matrimony Brand in the World.</p>
                </div>
                <div className="ban-search chosenini">
                  <form onSubmit={handleSubmit}>
                    <ul>
                      <li className="sr-look">
                        <div className="form-group">
                          <label>I'm looking for</label>
                          <select
                            className="chosen-select"
                            name="lookingFor"
                            value={formData.lookingFor}
                            onChange={handleInputChange}
                          >
                            <option value="">I'm looking for</option>
                            <option value="Male">Men</option>
                            <option value="Female">Women</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-age">
                        <div className="form-group">
                          <label>Age</label>
                          <select
                            className="chosen-select"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                          >
                            <option value="">Age</option>
                            <option value="18-30">18 to 30</option>
                            <option value="31-40">31 to 40</option>
                            <option value="41-50">41 to 50</option>
                            <option value="51-60">51 to 60</option>
                            <option value="61-70">61 to 70</option>
                            <option value="71-80">71 to 80</option>
                            <option value="81-90">81 to 90</option>
                            <option value="91-100">91 to 100</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-reli">
                        <div className="form-group">
                          <label>Community</label>
                          <select
                            className="chosen-select"
                            name="community"
                            value={formData.community}
                            onChange={handleInputChange}
                          >
                            <option value="">
                              Choose your Christian Community
                            </option>
                            <option value="Any">Any</option>
                            {denominations.map((denom, index) => (
                              <option key={index} value={denom}>
                                {denom}
                              </option>
                            ))}
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-cit">
                        <div className="form-group">
                          <label>City</label>
                          <select
                            className="chosen-select"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          >
                            <option value="">Location</option>
                            <option value="Any location">Any location</option>
                            <option value="Chennai">Chennai</option>
                            <option value="New york">New york</option>
                            <option value="Perth">Perth</option>
                            <option value="London">London</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-btn">
                        <input
                          type="submit"
                          value="Search"
                          style={{ background: "#A020F0" }}
                        />
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerAndSearch;
