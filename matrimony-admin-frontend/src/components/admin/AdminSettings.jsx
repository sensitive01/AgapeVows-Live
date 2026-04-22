import React from "react";
import NewLayout from "./layout/NewLayout";

const AdminSettings = () => {
  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>Site settings</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Site settings
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
                      <h4>Admin access</h4>
                      <h1>Login details</h1>
                    </div>
                    <div className="form-group">
                      <label className="lb">Admin user name:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="User name"
                        value="admin"
                      />
                    </div>
                    <div className="form-group">
                      <label className="lb">Admin password:</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value="password@123"
                      />
                      <span className="pass-view">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="lb">Admin Email [Mailing]:</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value="rn53themes@gmail.com"
                        name="email"
                      />
                    </div>
                    <div className="form-group">
                      <label className="lb">
                        Recovery Email [For Password reset]:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value="support@rn53themes.net"
                        name="email"
                      />
                    </div>
                  </div>

                  <div className="edit-pro-parti">
                    <div className="form-tit">
                      <h4>Currency symbol</h4>
                      <h1>Currency</h1>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label className="lb">Currency Symbol:</label>
                        <input type="text" className="form-control" value="$" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="lb">Currency Symbol Position</label>
                        <select
                          className="form-select chosen-select"
                          data-placeholder="Select your Hobbies"
                        >
                          <option>Before cost</option>
                          <option>After amount</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="edit-pro-parti">
                    <div className="form-tit">
                      <h4>Media</h4>
                      <h1>Social media</h1>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label className="lb">WhatsApp:</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="lb">Facebook:</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label className="lb">Instagram:</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="lb">X:</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label className="lb">Youtube:</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="lb">Linkedin:</label>
                        <input type="text" className="form-control" />
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

export default AdminSettings;
