import React from "react";
import NewLayout from "./layout/NewLayout";
import img1 from "/public/assets/images/profiles/1.jpg"


const AdminAllPayments = () => {
  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>Payments</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  All Payments
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-tab">
              <div className="tit">
                <h3>Payments</h3>
                <p>All user profiles</p>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Profile</th>
                    <th>Phone</th>
                    <th>Plan start</th>
                    <th>Expairy date</th>
                    <th>Payment cost</th>
                    <th>Payment type</th>
                    <th>Payment date</th>
                    <th>Plan type</th>
                    <th>Invoice</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={img1} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Ashley emyy</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-red">22, Feb 2025</span>
                    </td>
                    <td>
                      <span className="hig-blu">$500</span>
                    </td>
                    <td>
                      <span className="hig-blu">Paypal</span>
                    </td>
                    <td>
                      <span className="hig-blu">22, Feb 2024</span>
                    </td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <a className="cta cta-grn">Download invoce</a>
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
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Send invoice
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
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

export default AdminAllPayments;
