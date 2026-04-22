import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  addNewPlanData,
  changePlanStatus,
  editPlanData,
  getAllPlanData,
} from "../../api/service/adminServices";

const AdminPricingPlans = () => {
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentPlan, setCurrentPlan] = useState({
    id: null,
    name: "",
    price: "",
    priceType: "₹",
    duration: "",
    durationType: "months",
    maxProfiles: "",
    profilesType: "Total",
    dailyLimit: "",
    canViewProfiles: "",
    viewContactDetails: "",
    sendInterestRequest: "",
    startChat: "",
    dedicatedManager: "No",
    status: "Active",
  });
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPlanData();
      if (response.status === 200) {
        setPlans(response.data.data);
      }
    };
    fetchData();
  }, []);

  const handleAddNewPlan = () => {
    setModalMode("add");
    setCurrentPlan({
      id: null,
      name: "",
      price: "",
      priceType: "₹",
      duration: "",
      durationType: "months",
      maxProfiles: "",
      profilesType: "Total",
      dailyLimit: "",
      canViewProfiles: "",
      viewContactDetails: "",
      sendInterestRequest: "",
      startChat: "",
      dedicatedManager: "No",
      status: "Active",
    });
  };

  const handleEditPlan = (plan) => {
    setModalMode("edit");
    setCurrentPlan({
      id: plan._id,
      name: plan.name,
      price: plan.price.toString(),
      priceType: plan.priceType || "₹",
      duration: plan.duration || "",
      durationType: plan.durationType || "months",
      maxProfiles: plan.maxProfiles?.toString() || "",
      profilesType: plan.profilesType || "Total",
      dailyLimit: plan.dailyLimit || "",
      canViewProfiles: plan.canViewProfiles || "",
      viewContactDetails: plan.viewContactDetails || "",
      sendInterestRequest: plan.sendInterestRequest || "",
      startChat: plan.startChat || "",
      dedicatedManager: plan.dedicatedManager || "No",
      status: plan.status,
    });
  };

  const handleSubmitPlan = async (e) => {
    e.preventDefault();

    if (!currentPlan.name || !currentPlan.price || !currentPlan.duration) {
      alert("Please fill in all required fields (Plan name, Price, Duration)");
      return;
    }

    setLoading(true);
    try {
      if (modalMode === "add") {
        // Add new plan API call
        const response = await addNewPlanData(currentPlan);

        if (response.status === 201) {
          const newPlan = response.data.data;
          setPlans([...plans, newPlan]);
          alert("Plan added successfully!");
        } else {
          throw new Error("Failed to add plan");
        }
      } else {
        const response = await editPlanData(currentPlan.id, currentPlan);

        if (response.status == 200) {
          const updatedPlan = response.data.data;
          setPlans(
            plans.map((plan) =>
              plan._id === currentPlan.id ? { ...plan, ...updatedPlan } : plan
            )
          );
          alert("Plan updated successfully!");
        } else {
          throw new Error("Failed to update plan");
        }
      }

      // Close modal using Bootstrap 5 method
      const modal = document.getElementById("pricing");
      const bootstrapModal = window.bootstrap?.Modal?.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      } else {
        // Fallback method
        modal?.setAttribute("data-bs-dismiss", "modal");
        modal?.click();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the plan");
    } finally {
      setLoading(false);
    }
  };

  const togglePlanStatus = async (planId, currentStatus) => {
    console.log(currentStatus)
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const response = await changePlanStatus(planId, newStatus);

      if (response.status === 200) {
        setPlans(
          plans.map((plan) =>
            plan._id === planId ? { ...plan, status: newStatus } : plan
          )
        );
        alert(`Plan ${newStatus.toLowerCase()} successfully!`);
      } else {
        throw new Error("Failed to update plan status");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating plan status");
    }
  };

  // Helper function to format duration display
  const formatDuration = (duration, durationType) => {
    if (!duration) return "N/A";
    return `${duration} ${durationType || 'months'}`;
  };

  // Helper function to format profile views display
  const formatProfileViews = (maxProfiles, dailyLimit) => {
    let display = "";
    if (maxProfiles === "unlimited" || maxProfiles === "Unlimited") {
      display = "Unlimited";
    } else if (maxProfiles) {
      display = `${maxProfiles} total`;
    } else {
      display = "N/A";
    }
    
    if (dailyLimit && dailyLimit !== "unlimited" && dailyLimit !== "Unlimited") {
      display += ` (${dailyLimit}/day max)`;
    } else if (dailyLimit === "unlimited" || dailyLimit === "Unlimited") {
      display += " (Unlimited daily)";
    }
    
    return display;
  };

  return (
    <>
      <style jsx>{`
        .pan-rhs::-webkit-scrollbar {
          display: none !important;
        }
        .modal-body {
          max-height: 70vh;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .modal-body::-webkit-scrollbar {
          display: none;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .table th {
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
          background-color: #f8f9fa;
          padding: 15px;
        }
        .table td {
          font-size: 14px;
          vertical-align: middle;
          padding: 15px;
        }
        .table {
          border: none;
        }
        .dropdown-menu {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 0.375rem;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        .plan-details {
          font-size: 12px;
          color: #6c757d;
          margin-top: 4px;
        }
        .table-responsive::-webkit-scrollbar {
          width: 6px;
        }
        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
      <NewLayout>
        <div
          className="pan-rhs"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
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
                <div
                  className="tit"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>All pricing plans</h3>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#pricing"
                    onClick={handleAddNewPlan}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add New
                    Plan
                  </button>
                </div>
                <div className="table-responsive" style={{ height: '60vh', overflowY: 'auto' }}>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">S.NO</th>
                        <th className="border-0">PLAN NAME</th>
                        <th className="border-0">PRICE</th>
                        <th className="border-0">DURATION</th>
                        <th className="border-0">PROFILE VIEWS</th>
                        <th className="border-0">STATUS</th>
                        <th className="border-0 text-center">MORE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((plan, index) => (
                        <tr key={plan._id}>
                          <td className="border-0">{index + 1}</td>
                          <td className="border-0">
                            <div>
                              <span className="hig-blu fw-bold">{plan.name}</span>
                              {plan.dedicatedManager === "Yes" && (
                                <div className="plan-details">
                                  <i className="fa fa-star text-warning me-1"></i>
                                  Dedicated Account Manager
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="border-0">
                            <span className="hig-red fw-bold">
                              {typeof plan.price === "number"
                                ? `₹${plan.price}`
                                : `₹${plan.price}`}
                            </span>
                          </td>
                          <td className="border-0">
                            <span className="badge bg-info text-dark">
                              {formatDuration(plan.duration, plan.durationType)}
                            </span>
                          </td>
                          <td className="border-0">
                            <span className="badge bg-primary text-white">
                              {formatProfileViews(plan.maxProfiles, plan.dailyLimit)}
                            </span>
                          </td>
                          <td className="border-0 ">
                            <span
                              className={`badge text-white ${
                                plan.status === "Active" ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {plan.status}
                            </span>
                          </td>
                          <td className="border-0 text-center">
                            <div className="dropdown position-relative">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdown(openDropdown === plan._id ? null : plan._id);
                                }}
                              >
                                <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                              </button>
                              {openDropdown === plan._id && (
                                <ul 
                                  className="dropdown-menu show position-absolute"
                                  style={{ 
                                    display: 'block', 
                                    top: '100%', 
                                    left: 'auto',
                                    right: '0',
                                    zIndex: 1000,
                                    minWidth: '180px'
                                  }}
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#pricing"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        handleEditPlan(plan);
                                      }}
                                    >
                                      <i className="fa fa-edit me-2"></i>Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        togglePlanStatus(plan._id, plan.status);
                                      }}
                                    >
                                      <i className={`fa ${plan.status === "Active" ? "fa-ban text-danger" : "fa-check text-success"} me-2`}></i>
                                      {plan.status === "Active" ? "Disable" : "Enable"}
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="../plans.html"
                                      target="_blank"
                                      onClick={() => setOpenDropdown(null)}
                                    >
                                      <i className="fa fa-external-link me-2"></i>View pricing page
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {plans.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center py-5 border-0">
                            <div>
                              <i className="fa fa-list-alt fa-3x text-muted mb-3"></i>
                              <h5 className="text-muted">No plans found</h5>
                              <p className="text-muted">Click "Add New Plan" to create your first pricing plan</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Modal for Add/Edit Plan */}
          <div className="modal fade" id="pricing">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                {/* Modal Header */}
                <div className="modal-header">
                  <h4 className="modal-title">
                    {modalMode === "add" ? "Add New Plan" : "Edit Plan"}
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  />
                </div>
                {/* Modal body */}
                <div className="modal-body">
                  <div className="form-inp">
                    <form onSubmit={handleSubmitPlan}>
                      {/*PROFILE BIO*/}
                      <div className="edit-pro-parti">
                        <div className="form-group mb-3">
                          <label className="lb">Plan name: *</label>
                          <select
                            name=""
                            required="required"
                            className="form-control chosen-select"
                            value={currentPlan.name}
                            onChange={(e) =>
                              setCurrentPlan({
                                ...currentPlan,
                                name: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Plan</option>
                           
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Golden membership">Golden membership</option>
                          </select>
                        </div>

                        <div className="row">
                          <div className="col-md-8">
                            <div className="form-group mb-3">
                              <label className="lb">Price: *</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter price (e.g., 1000)"
                                value={currentPlan.price}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    price: e.target.value,
                                  })
                                }
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <label className="lb">Currency:</label>
                              <select
                                name=""
                                className="form-control chosen-select"
                                value={currentPlan.priceType}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    priceType: e.target.value,
                                  })
                                }
                              >
                                <option value="₹">₹ (INR)</option>
                                <option value="$">$ (USD)</option>
                                <option value="€">€ (EUR)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-8">
                            <div className="form-group mb-3">
                              <label className="lb">Duration: *</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter duration (e.g., 1, 3, 6)"
                                value={currentPlan.duration}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    duration: e.target.value,
                                  })
                                }
                                required=""
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <label className="lb">Duration Type:</label>
                              <select
                                name=""
                                className="form-control chosen-select"
                                value={currentPlan.durationType}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    durationType: e.target.value,
                                  })
                                }
                              >
                                <option value="days">Days</option>
                                <option value="months">Months</option>
                                <option value="years">Years</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-8">
                            <div className="form-group mb-3">
                              <label className="lb">Max profile views:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter number or 'unlimited' (e.g., 100, 500, unlimited)"
                                value={currentPlan.maxProfiles}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    maxProfiles: e.target.value,
                                  })
                                }
                              />
                              <small className="text-muted">Total profile views for the entire subscription period</small>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <label className="lb">Daily Limit:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., 10, 20, unlimited"
                                value={currentPlan.dailyLimit}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    dailyLimit: e.target.value,
                                  })
                                }
                              />
                              <small className="text-muted">Max views per day</small>
                            </div>
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Can able to view:</label>
                          <select
                            name=""
                            className="form-control chosen-select"
                            value={currentPlan.canViewProfiles}
                            onChange={(e) =>
                              setCurrentPlan({
                                ...currentPlan,
                                canViewProfiles: e.target.value,
                              })
                            }
                          >
                            <option value="">Select</option>
                            <option value="All Profiles">All Profiles</option>
                            <option value="Only Basic">Only Basic</option>
                            <option value="Only Premium">Only Premium</option>
                            <option value="Only Platinum">Only Platinum</option>
                          </select>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">View contact details:</label>
                              <select
                                name=""
                                className="form-control chosen-select"
                                value={currentPlan.viewContactDetails}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    viewContactDetails: e.target.value,
                                  })
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">Send interest request:</label>
                              <select
                                name=""
                                className="form-control chosen-select"
                                value={currentPlan.sendInterestRequest}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    sendInterestRequest: e.target.value,
                                  })
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">Start Chat:</label>
                              <select
                                name=""
                                className="form-control chosen-select"
                                value={currentPlan.startChat}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    startChat: e.target.value,
                                  })
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">Dedicated Account Manager:</label>
                              <select
                                name=""
                                className="form-control chosen-select"
                                value={currentPlan.dedicatedManager}
                                onChange={(e) =>
                                  setCurrentPlan({
                                    ...currentPlan,
                                    dedicatedManager: e.target.value,
                                  })
                                }
                              >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Status:</label>
                          <select
                            name=""
                            required="required"
                            className="form-control chosen-select"
                            value={currentPlan.status}
                            onChange={(e) =>
                              setCurrentPlan({
                                ...currentPlan,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      {/*END PROFILE BIO*/}
                    </form>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="cta-full cta-colr"
                    disabled={loading}
                    onClick={handleSubmitPlan}
                  >
                    {loading
                      ? "Saving..."
                      : modalMode === "add"
                      ? "Add Plan"
                      : "Update Plan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NewLayout>
    </>
  );
};

export default AdminPricingPlans;