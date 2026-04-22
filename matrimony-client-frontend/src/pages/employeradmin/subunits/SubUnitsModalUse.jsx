import React, { useState, useEffect } from "react";
import axios from "axios";

// Import company logos
import company01 from "../../../assets/employer-admin/assets/img/company/company-01.svg";
import company02 from "../../../assets/employer-admin/assets/img/company/company-02.svg";
import company03 from "../../../assets/employer-admin/assets/img/company/company-03.svg";
import company04 from "../../../assets/employer-admin/assets/img/company/company-04.svg";
import company05 from "../../../assets/employer-admin/assets/img/company/company-05.svg";
import company06 from "../../../assets/employer-admin/assets/img/company/company-06.svg";
import company07 from "../../../assets/employer-admin/assets/img/company/company-07.svg";
import company08 from "../../../assets/employer-admin/assets/img/company/company-08.svg";

// Import profile avatars
import avatar01 from "../../../assets/employer-admin/assets/img/profiles/avatar-01.jpg";
import avatar02 from "../../../assets/employer-admin/assets/img/profiles/avatar-02.jpg";
import avatar03 from "../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg";
import avatar04 from "../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg";
import avatar05 from "../../../assets/employer-admin/assets/img/profiles/avatar-05.jpg";
import avatar06 from "../../../assets/employer-admin/assets/img/profiles/avatar-06.jpg";
import avatar07 from "../../../assets/employer-admin/assets/img/profiles/avatar-07.jpg";
import avatar08 from "../../../assets/employer-admin/assets/img/profiles/avatar-08.jpg";
import avatar09 from "../../../assets/employer-admin/assets/img/profiles/avatar-09.jpg";
import avatar10 from "../../../assets/employer-admin/assets/img/profiles/avatar-11.jpg";
import avatar11 from "../../../assets/employer-admin/assets/img/profiles/avatar-11.jpg";
import avatar12 from "../../../assets/employer-admin/assets/img/profiles/avatar-12.jpg";
import avatar13 from "../../../assets/employer-admin/assets/img/profiles/avatar-13.jpg";
import avatar14 from "../../../assets/employer-admin/assets/img/profiles/avatar-14.jpg";
import avatar15 from "../../../assets/employer-admin/assets/img/profiles/avatar-15.jpg";
import avatar16 from "../../../assets/employer-admin/assets/img/profiles/avatar-16.jpg";
import avatar17 from "../../../assets/employer-admin/assets/img/profiles/avatar-17.jpg";
import avatar18 from "../../../assets/employer-admin/assets/img/profiles/avatar-18.jpg";
import avatar19 from "../../../assets/employer-admin/assets/img/profiles/avatar-19.jpg";
import avatar20 from "../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg";
import avatar21 from "../../../assets/employer-admin/assets/img/profiles/avatar-27.jpg";
import avatar22 from "../../../assets/employer-admin/assets/img/profiles/avatar-25.jpg";
import avatar23 from "../../../assets/employer-admin/assets/img/profiles/avatar-23.jpg";
import avatar24 from "../../../assets/employer-admin/assets/img/profiles/avatar-24.jpg";
import avatar25 from "../../../assets/employer-admin/assets/img/profiles/avatar-25.jpg";
import avatar26 from "../../../assets/employer-admin/assets/img/profiles/avatar-23.jpg";
import avatar27 from "../../../assets/employer-admin/assets/img/profiles/avatar-27.jpg";
import avatar28 from "../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg";
import avatar29 from "../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg";
import avatar30 from "../../../assets/employer-admin/assets/img/profiles/avatar-30.jpg";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import AddUnitModal from "./Modals/AddUnitModal";
import EditUnitModal from "./Modals/EditUnitModal";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import UnitDetailModal from "./Modals/UnitDetailModal";
import UpgradePackageModal from "./Modals/UpgradePackageModal";
import { FileText } from "lucide-react";

const SubUnitsModalUse = () => {
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showUnitDetail, setShowUnitDetail] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Get organization ID from localStorage
  const employerAdminData = JSON.parse(
    localStorage.getItem("EmployerAdminData") || "{}"
  );
  const organizationid = employerAdminData._id || "";

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get(
          `https://api.edprofio.com/employeradmin/fetchbyorg/${organizationid}`
        );
        if (response.data.success) {
          // Transform API data to match our component structure
          const transformedUnits = response.data.data.map((unit, index) => ({
            id: unit._id,
            name: unit.schoolName,
            image: getCompanyLogo(index),
            email: unit.userEmail,
            phone: unit.userMobile,
            location: `${unit.city}, ${unit.state}`,
            rating: 4.5, // Default rating since API doesn't provide this
            members: [avatar01, avatar02, avatar03, avatar04, avatar05],
            originalData: unit, // Store original API data for reference
          }));
          console.log(response);
          setUnits(transformedUnits);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setLoading(false);
      }
    };

    if (organizationid) {
      fetchUnits();
    }
  }, [organizationid]);

  // Helper function to get company logo based on index
  const getCompanyLogo = (index) => {
    const logos = [
      company01,
      company02,
      company03,
      company04,
      company05,
      company06,
      company07,
      company08,
    ];
    return logos[index % logos.length];
  };

  const handleEdit = (unit) => {
    setSelectedUnit(unit);
    setShowEditUnitModal(true);
  };

  const handleDelete = (unit) => {
    setSelectedUnit(unit);
    setItemToDelete(true);
  };

  const handleViewDetails = (unit) => {
    setSelectedUnit(unit);
    setShowUnitDetail(true);
  };

  const handleUpgrade = (unit) => {
    setSelectedUnit(unit);
    setShowUpgradeModal(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(
        `https://api.edprofio.com/employeradmin/${selectedUnit.id}`
      );
      setUnits(units.filter((unit) => unit.id !== selectedUnit.id));
      setItemToDelete(false);
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  const handleAddUnit = (newUnitData) => {
    // Transform the API response data to match our component structure
    const newUnit = {
      id: newUnitData._id,
      name: newUnitData.schoolName,
      image: getCompanyLogo(units.length),
      email: newUnitData.userEmail,
      phone: newUnitData.userMobile,
      location: `${newUnitData.city}, ${newUnitData.state}`,
      rating: 4.5,
      members: [avatar01, avatar02, avatar03, avatar04, avatar05],
      originalData: newUnitData,
    };

    // Update the units state with the new unit at the beginning of the array
    setUnits((prevUnits) => [newUnit, ...prevUnits]);
    setShowAddUnitModal(false);
  };

  const handleUpdateUnit = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://api.edprofio.com/employeradmin/${selectedUnit.id}`,
        updatedData
      );

      if (response.data.success) {
        setUnits(
          units.map((unit) =>
            unit.id === selectedUnit.id
              ? {
                  ...unit,
                  name: response.data.data.schoolName,
                  email: response.data.data.userEmail,
                  phone: response.data.data.userMobile,
                  location: `${response.data.data.city}, ${response.data.data.state}`,
                  originalData: response.data.data,
                }
              : unit
          )
        );
        setShowEditUnitModal(false);
      }
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };

  const handleExportPDF = () => {
    setShowExportDropdown(false);

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>Units Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .summary { margin-top: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Units Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        
        <table>
          <thead>
            <tr>
              <th>Unit Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            ${units
              .map(
                (unit) => `
              <tr>
                <td>${unit.name}</td>
                <td>${unit.email}</td>
                <td>${unit.phone}</td>
                <td>${unit.location}</td>
                <td>${unit.rating}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="summary">
          Total Units: ${units.length}
        </div>
        
        <script>
          // Automatically trigger print dialog when the window loads
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 200);
          };
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };

  const handleExportExcel = () => {
    setShowExportDropdown(false);

    // Create CSV content
    const csvContent = [
      ["Unit Name", "Email", "Phone", "Location", "Rating"],
      ...units.map((unit) => [
        unit.name,
        unit.email,
        unit.phone,
        unit.location,
        unit.rating,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `units_report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content m-2">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  return (
    <>
      <EmployerAdminHeader />
      <div className="content m-2">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>Units</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="me-2">
              <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                <a
                  href="/employer-admin/units"
                  className="btn btn-icon btn-sm me-1"
                >
                  <i className="ti ti-search"></i>
                </a>
                <a
                  href="/employer-admin/units"
                  className="btn btn-icon btn-sm me-1"
                >
                  <i className="ti ti-list-tree"></i>
                </a>
                <a
                  href="/employer-admin/units-grid"
                  className="btn btn-icon btn-sm active bg-primary text-white"
                >
                  <i className="ti ti-layout-grid"></i>
                </a>
              </div>
            </div>
            <div className="me-2">
              <div className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  onClick={() => setShowExportDropdown(!showExportDropdown)}
                >
                  <i className="ti ti-file-export me-1"></i>Export
                </a>
                <ul
                  className={`dropdown-menu dropdown-menu-end p-3 ${
                    showExportDropdown ? "show" : ""
                  }`}
                  style={{ display: showExportDropdown ? "block" : "none" }}
                >
                  <li>
                    <button
                      className="dropdown-item rounded-1 d-flex align-items-center"
                      onClick={handleExportPDF}
                    >
                      <FileText size={16} className="me-1" />
                      Export as PDF
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item rounded-1 d-flex align-items-center"
                      onClick={handleExportExcel}
                    >
                      <FileText size={16} className="me-1" />
                      Export as Excel
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="me-2">
              <button
                onClick={() => setShowAddUnitModal(true)}
                className="btn btn-primary d-flex align-items-center"
              >
                <i className="ti ti-circle-plus me-2"></i>Add New Unit
              </button>
            </div>
            <div className="dropdown">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center "
                data-bs-toggle="dropdown"
                style={{
                  fontSize: "15px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                }}
              >
                Sort By : Last 7 Days
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Recently Added
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Ascending
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Desending
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Last Month
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Last 7 Days
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row">
          {units.length > 0 ? (
            units.map((unit) => (
              <div key={unit.id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="form-check form-check-md">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                      <div>
                        <a
                          href="/employer-admin/school-details"
                          className="avatar avatar-xl avatar-rounded online border rounded-circle"
                        >
                          <img
                            src={unit.image}
                            className="img-fluid h-auto w-auto"
                            alt="img"
                          />
                        </a>
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn btn-icon btn-sm rounded-circle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ti ti-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end p-3">
                          <li>
                            <a
                              className="dropdown-item rounded-1"
                              onClick={() => handleViewDetails(unit)}
                            >
                              <i className="ti ti-eye me-1"></i>View Details
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item rounded-1"
                              onClick={() => handleUpgrade(unit)}
                            >
                              <i className="ti ti-arrow-up me-1"></i>Upgrade
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item rounded-1"
                              onClick={() => handleEdit(unit)}
                            >
                              <i className="ti ti-edit me-1"></i>Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item rounded-1"
                              onClick={() => handleDelete(unit)}
                            >
                              <i className="ti ti-trash text-danger text-danger me-1"></i>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <h6 className="mb-1">
                        <a href="/employer-admin/school-details">{unit.name}</a>
                      </h6>
                      <div className="avatar-list-stacked avatar-group-sm">
                        {unit.members.slice(0, 5).map((member, index) => (
                          <span key={index} className="avatar avatar-rounded">
                            <img
                              className="border border-white"
                              src={member}
                              alt={`Member ${index + 1}`}
                            />
                          </span>
                        ))}
                        {unit.members.length > 5 && (
                          <span className="avatar bg-primary avatar-rounded text-fixed-white fs-12">
                            +{unit.members.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="d-flex flex-column">
                      <p className="text-dark d-inline-flex align-items-center mb-2">
                        <i className="ti ti-mail text-danger-forward text-gray-5 me-2"></i>
                        <a
                          href=""
                          className="__cf_email__"
                          data-cfemail={unit.email}
                        >
                          {unit.email}
                        </a>
                      </p>
                      <p className="text-dark d-inline-flex align-items-center mb-2">
                        <i className="ti ti-phone text-gray-5 me-2"></i>
                        {unit.phone}
                      </p>
                      <p className="text-dark d-inline-flex align-items-center">
                        <i className="ti ti-map-pin text-gray-5 me-2"></i>
                        {unit.location}
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-top bg-light p-3 mt-3">
                      <div className="icons-social d-flex align-items-center">
                        <a
                          href="#"
                          className="avatar avatar-rounded avatar-sm me-1"
                        >
                          <i className="ti ti-mail text-danger"></i>
                        </a>
                        <a
                          href="#"
                          className="avatar avatar-rounded avatar-sm me-1"
                        >
                          <i className="ti ti-phone-call text-success"></i>
                        </a>
                        <a
                          href="#"
                          className="avatar avatar-rounded avatar-sm me-1"
                        >
                          <i className="ti ti-message-2"></i>
                        </a>
                        <a
                          href="#"
                          className="avatar avatar-rounded avatar-sm me-1"
                        >
                          <i className="ti ti-brand-skype"></i>
                        </a>
                        <a href="#" className="avatar avatar-rounded avatar-sm">
                          <i className="ti ti-brand-facebook"></i>
                        </a>
                      </div>
                      <span className="d-inline-flex align-items-center">
                        <i className="ti ti-star-filled text-warning me-1"></i>
                        {unit.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No units found</h4>
              <p>Click "Add New Unit" to create your first unit</p>
            </div>
          )}
        </div>

        {units.length > 0 && (
          <div className="text-center mb-4">
            <a href="#" className="btn btn-white border">
              <i className="ti ti-loader-3 text-primary me-2"></i>Load More
            </a>
          </div>
        )}

        <AddUnitModal
          show={showAddUnitModal}
          onClose={() => setShowAddUnitModal(false)}
          onSave={handleAddUnit}
        />

        {selectedUnit && (
          <>
            <UnitDetailModal
              show={showUnitDetail}
              onClose={() => setShowUnitDetail(false)}
              unit={selectedUnit}
            />

            <UpgradePackageModal
              show={showUpgradeModal}
              onClose={() => setShowUpgradeModal(false)}
              unit={selectedUnit}
            />

            <EditUnitModal
              show={showEditUnitModal}
              onClose={() => setShowEditUnitModal(false)}
              unit={selectedUnit}
              onSave={handleUpdateUnit}
            />
          </>
        )}

        <DeleteConfirmationModal
          show={itemToDelete}
          onClose={() => setItemToDelete(false)}
          onConfirm={handleDeleteConfirmed}
        />
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default SubUnitsModalUse;
