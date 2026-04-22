import React from "react";

const BannerAndSearch = () => {
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
                    <b>Right Match</b> here
                  </h1>
                  <p>Most trusted Matrimony Brand in the World.</p>
                </div>
                <div className="ban-search chosenini">
                  <form>
                    <ul>
                      <li className="sr-look">
                        <div className="form-group">
                          <label>I'm looking for</label>
                          <select className="chosen-select">
                            <option value="">I'm looking for</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-age">
                        <div className="form-group">
                          <label>Age</label>
                          <select className="chosen-select">
                            <option value="">Age</option>
                            <option value="">18 to 30</option>
                            <option value="">31 to 40</option>
                            <option value="">41 to 50</option>
                            <option value="">51 to 60</option>
                            <option value="">61 to 70</option>
                            <option value="">71 to 80</option>
                            <option value="">81 to 90</option>
                            <option value="">91 to 100</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-reli">
                        <div className="form-group">
                          <label>Religion</label>
                          <select className="chosen-select">
                            <option>Religion</option>
                            <option>Any</option>
                            <option>Hindu</option>
                            <option>Muslim</option>
                            <option>Jain</option>
                            <option>Christian</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-cit">
                        <div className="form-group">
                          <label>City</label>
                          <select className="chosen-select">
                            <option>Location</option>
                            <option>Any location</option>
                            <option>Chennai</option>
                            <option>New york</option>
                            <option>Perth</option>
                            <option>London</option>
                          </select>
                        </div>
                      </li>
                      <li className="sr-btn">
                        <input type="submit" defaultValue="Search" />
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
