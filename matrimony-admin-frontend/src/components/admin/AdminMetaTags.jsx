import React from "react";
import NewLayout from "./layout/NewLayout";

const AdminMetaTags = () => {
  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>SEO settings</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  SEO
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Meta
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-tab">
              <div className="tit">
                <h3>All page meta details</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Page name</th>
                    <th>URL</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Home page</td>
                    <td>https://bizbookdirectorytemplate.com/index.php</td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#paypal"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="../index.html"
                              target="_blank"
                            >
                              View page
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminMetaTags;
