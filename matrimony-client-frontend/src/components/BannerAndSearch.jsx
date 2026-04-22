import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BannerAndSearch = () => {
  const navigate = useNavigate();
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
                          <label>Religion</label>
                          <select
                            className="chosen-select"
                            name="community"
                            value={formData.community}
                            onChange={handleInputChange}
                          >
                            <option value="">
                              Choose your Christian Community
                            </option>
                            <option value="Adventist">Adventist</option>
                            <option value="AG">AG (Assemblies of God)</option>
                            <option value="ACI">
                              ACI (Anglican Church of India)
                            </option>
                            <option value="Apostolic">Apostolic</option>
                            <option value="Assyrian">Assyrian</option>
                            <option value="Baptist">Baptist</option>
                            <option value="Basel Mission">Basel Mission</option>
                            <option value="Brethren">Brethren</option>
                            <option value="Calvinist">Calvinist</option>
                            <option value="Cannonite">Cannonite</option>
                            <option value="Chaldean Syrian">
                              Chaldean Syrian
                            </option>
                            <option value="Cheramar">Cheramar</option>
                            <option value="Church of Christ">
                              Church of Christ
                            </option>
                            <option value="Church of God">Church of God</option>
                            <option value="CNI">
                              CNI (Church of North India)
                            </option>
                            <option value="Congregational">
                              Congregational
                            </option>
                            <option value="CSI">
                              CSI (Church of South India)
                            </option>
                            <option value="Evangelical">Evangelical</option>
                            <option value="Indian Orthodox Christian">
                              Indian Orthodox Christian
                            </option>
                            <option value="IPC">
                              IPC (Indian Pentecostal Church of God)
                            </option>
                            <option value="Jewish">Jewish</option>
                            <option value="Knanaya Catholic">
                              Knanaya Catholic
                            </option>
                            <option value="Knanaya Jacobite">
                              Knanaya Jacobite
                            </option>
                            <option value="Knanaya Pentecostal">
                              Knanaya Pentecostal
                            </option>
                            <option value="Latin Catholic">
                              Latin Catholic
                            </option>
                            <option value="Latter Day Saints">
                              Latter Day Saints
                            </option>
                            <option value="Lutheran">Lutheran</option>
                            <option value="Malabar Independent Syrian Church">
                              Malabar Independent Syrian Church
                            </option>
                            <option value="Malankara Catholic">
                              Malankara Catholic
                            </option>
                            <option value="Malankara Mar Thoma">
                              Malankara Mar Thoma (Marthoma)
                            </option>
                            <option value="Melkite">Melkite</option>
                            <option value="Mennonite">Mennonite</option>
                            <option value="Methodist">Methodist</option>
                            <option value="Moravian">Moravian</option>
                            <option value="Nadar Christian">
                              Nadar Christian
                            </option>
                            <option value="New Life Fellowship">
                              New Life Fellowship
                            </option>
                            <option value="Orthodox">Orthodox</option>
                            <option value="Pentecost">Pentecost</option>
                            <option value="Presbyterian">Presbyterian</option>
                            <option value="Protestant">Protestant</option>
                            <option value="RC Anglo Indian">
                              RC Anglo Indian
                            </option>
                            <option value="Roman Catholic">
                              Roman Catholic
                            </option>
                            <option value="Salvation Army">
                              Salvation Army
                            </option>
                            <option value="Seventh Day Adventist">
                              Seventh Day Adventist
                            </option>
                            <option value="Syrian Catholic">
                              Syrian Catholic
                            </option>
                            <option value="Syrian Orthodox">
                              Syrian Orthodox
                            </option>
                            <option value="Syro Malabar">Syro Malabar</option>
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
