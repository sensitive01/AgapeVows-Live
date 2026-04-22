import React from "react";
import axios from "axios";
import company01 from "../../../../assets/employer-admin/assets/img/company/company-01.svg";

const schoolSchoolDetailModal = ({ show, onClose, school }) => {
  const [employerData, setEmployerData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (show && school) {
      fetchEmployerData();
    }
  }, [show, school]);

  const fetchEmployerData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.edprofio.com/employer/fetchemployer/${school.id}`
      );
      if (response.data) {
        setEmployerData(response.data);
      }
    } catch (err) {
      console.error("Error fetching employer data:", err);
      setError("Failed to load employer details");
    } finally {
      setLoading(false);
    }
  };

  // Function to format date as dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">school Details</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading school details...</p>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : employerData ? (
              <>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center rounded bg-light p-3">
                    <div className="file-name-icon d-flex align-items-center">
                      <a
                        href="#"
                        className="avatar avatar-md border rounded-circle flex-shrink-0 me-2"
                      >
                        {employerData.userProfilePic ? (
                          <img
                            src={employerData.userProfilePic}
                            className="img-fluid"
                            alt="Profile"
                          />
                        ) : (
                          <img
                            src={company01}
                            className="img-fluid"
                            alt="Default"
                          />
                        )}
                      </a>
                      <div>
                        <p className="text-gray-9 fw-medium mb-0">
                          {employerData.schoolName}
                        </p>
                        <p>
                          <a
                            href={`mailto:${employerData.userEmail}`}
                            className="__cf_email__"
                          >
                            {employerData.userEmail}
                          </a>
                        </p>
                      </div>
                    </div>
                    {/* <span className="badge badge-success">
                      <i className="ti ti-point-filled"></i>
                      {employerData.isVerified ? 'Verified' : 'Not Verified'}
                    </span> */}
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-gray-9 fw-medium">Basic Info</p>
                  <div className="pb-1 border-bottom mb-4">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Contact Person</p>
                          <p className="text-gray-9">{`${employerData.firstName} ${employerData.lastName}`}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Phone Number</p>
                          <p className="text-gray-9">
                            {employerData.userMobile}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Website</p>
                          <p className="text-gray-9">
                            {employerData.website || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Institution Type</p>
                          <p className="text-gray-9">
                            {employerData.institutionType}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Board</p>
                          <p className="text-gray-9">
                            {employerData.board || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Address</p>
                          <p className="text-gray-9">
                            {`${employerData.address}, ${employerData.city}, ${employerData.state} - ${employerData.pincode}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-9 fw-medium">Additional Details</p>
                  <div>
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Employer Type</p>
                          <p className="text-gray-9">
                            {employerData.employerType}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Institution Name</p>
                          <p className="text-gray-9">
                            {employerData.institutionName}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Referral Code</p>
                          <p className="text-gray-9">
                            {employerData.referralCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Created At</p>
                          <p className="text-gray-9">
                            {formatDate(employerData.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Referral Count</p>
                          <p className="text-gray-9">
                            {employerData.referralCount}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <p className="fs-12 mb-0">Referral Rewards</p>
                          <p className="text-gray-9">
                            {employerData.referralRewards}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-5">
                <p>No data available for this school</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default schoolSchoolDetailModal;
