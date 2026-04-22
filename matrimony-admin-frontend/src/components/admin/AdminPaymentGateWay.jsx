import React from "react";
import NewLayout from "./layout/NewLayout";

const AdminPaymentGateWay = () => {
  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>Pricing details</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Payments
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Pricing
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-tab">
              <div className="tit">
                <h3>All pricing plans</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Plan name</th>
                    <th>price</th>
                    <th>Status</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <span className="hig-blu">Free</span>
                    </td>
                    <td>
                      <span className="hig-red">$0</span>
                    </td>
                    <td>
                      <span className="hig-grn">Active</span>
                    </td>
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
                              data-bs-target="#pricing"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="../plans.html"
                              target="_blank"
                            >
                              View pricing page
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <span className="hig-blu">Gold</span>
                    </td>
                    <td>
                      <span className="hig-red">$349</span>
                    </td>
                    <td>
                      <span className="hig-grn">Active</span>
                    </td>
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
                              data-bs-target="#pricing"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="../plans.html"
                              target="_blank"
                            >
                              View pricing page
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <span className="hig-blu">Platinum</span>
                    </td>
                    <td>
                      <span className="hig-red">$549</span>
                    </td>
                    <td>
                      <span className="hig-grn">Active</span>
                    </td>
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
                              data-bs-target="#pricing"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="../plans.html"
                              target="_blank"
                            >
                              View pricing page
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

export default AdminPaymentGateWay;
