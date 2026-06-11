import React from "react";
import NewLayout from "./layout/NewLayout";
import CustomTable from "./common/CustomTable";

const AdminPaymentGateWay = () => {
  const columns = [
    { name: "No", selector: row => row.no, sortable: true, width: "60px" },
    {
      name: "Plan name",
      selector: row => row.planName,
      sortable: true,
      cell: row => <span className="hig-blu text-primary fw-bold">{row.planName}</span>
    },
    {
      name: "Price",
      selector: row => row.price,
      sortable: true,
      cell: row => <span className="hig-red text-danger fw-bold">{row.price}</span>
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => <span className="hig-grn text-success fw-bold">{row.status}</span>
    },
    {
      name: "More",
      cell: (row, index) => (
        <div className={`dropdown ${index >= 5 ? "dropup" : ""}`}>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
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
          </ul>
        </div>
      )
    }
  ];

  const data = [
    { id: 1, no: 1, planName: "Free", price: "$0", status: "Active" },
    { id: 2, no: 2, planName: "Gold", price: "$349", status: "Active" },
    { id: 3, no: 3, planName: "Platinum", price: "$549", status: "Active" }
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: "#6c757d",
        backgroundColor: "#f8f9fa",
        padding: "15px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        padding: "15px",
      },
    },
  };

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
              <div className="table-responsive">
                <CustomTable itemsPerPage={10}
                  columns={columns}
                  data={data}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  paginationPerPage={5}
                  highlightOnHover={false}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminPaymentGateWay;
