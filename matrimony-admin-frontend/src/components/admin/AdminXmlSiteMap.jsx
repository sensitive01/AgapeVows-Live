import React from "react";
import NewLayout from "./layout/NewLayout";

const AdminXmlSiteMap = () => {
  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>XML site map</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">SEO settings</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  XML Sitemap
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-form">
              <div className="form-inp">
                <form>
                  <div className="edit-pro-parti">
                    <div className="form-tit">
                      <h3>XML site maps</h3>
                    </div>
                    <div className="form-group">
                      <label className="lb">Select a file:</label>
                      <div className="fil-img-uplo">
                        <span className="dumfil">Upload a file</span>
                        <input
                          type="file"
                          name="profile_image"
                          accept="image/*,.jpg,.jpeg,.png"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="cta-full cta-colr">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminXmlSiteMap;
