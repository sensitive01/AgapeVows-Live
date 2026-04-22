import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";

import {
  addNewEvent,
  deleteEventData,
  editEvent,
  getAllEvents,
} from "../../api/service/adminServices";

const AdminEvents = () => {
  const [modalMode, setModalMode] = useState("add"); // 'add', 'edit', 'view'
  const [activeTab, setActiveTab] = useState("Active");
  const [currentEvent, setCurrentEvent] = useState({
    id: null,
    name: "",
    date: "",
    location: "",
    churchName: "",
    state: "",
    contact: "",
    email: "", // New field
    mapLink: "",
    description: "",
    details: "", // New field
    image: null,
    imageFile: null,
    status: "Active",
    isPinned: false,
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await getAllEvents();
      if (response.status === 200) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleAddNewEvent = () => {
    setModalMode("add");
    setCurrentEvent({
      id: null,
      name: "",
      date: "",
      location: "",
      churchName: "",
      state: "",
      contact: "",
      email: "",
      mapLink: "",
      description: "",
      details: "",
      image: null,
      imageFile: null,
      status: "Active",
      isPinned: false,
    });
  };

  const handleEditEvent = (event) => {
    setModalMode("edit");
    setCurrentEvent({
      id: event._id,
      name: event.name,
      date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
      location: event.location,
      churchName: event.churchName || "",
      state: event.state || "",
      contact: event.contact || "",
      email: event.email || "",
      mapLink: event.mapLink || "",
      description: event.description || "",
      details: event.details || "",
      image: event.image || null,
      imageFile: null,
      status: event.status,
      isPinned: event.isPinned || false,
    });
  };

  const handleViewEvent = (event) => {
    setModalMode("view");
    setCurrentEvent({
      ...event,
      id: event._id,
      date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
      image: event.image || null,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentEvent({
          ...currentEvent,
          image: reader.result,
          imageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();

    if (!currentEvent.name || !currentEvent.date || !currentEvent.location) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", currentEvent.name);
      formData.append("date", currentEvent.date);
      formData.append("location", currentEvent.location);
      formData.append("churchName", currentEvent.churchName);
      formData.append("state", currentEvent.state);
      formData.append("contact", currentEvent.contact);
      formData.append("email", currentEvent.email);
      formData.append("mapLink", currentEvent.mapLink);
      formData.append("description", currentEvent.description);
      formData.append("details", currentEvent.details);
      formData.append("status", currentEvent.status);
      formData.append("isPinned", currentEvent.isPinned);
      if (currentEvent.imageFile) {
        formData.append("image", currentEvent.imageFile);
      }

      if (modalMode === "add") {
        const response = await addNewEvent(formData);
        if (response.status === 201) {
          alert("Event added successfully!");
          fetchEvents();
        }
      } else {
        const response = await editEvent(currentEvent.id, formData);
        if (response.status === 200) {
          alert("Event updated successfully!");
          fetchEvents();
        }
      }

      // Close modal
      const modal = document.getElementById("eventsModal");
      const bootstrapModal = window.bootstrap?.Modal?.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      } else {
        const closeBtn = document.querySelector("#eventsModal .btn-close");
        if (closeBtn) closeBtn.click();
      }
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await deleteEventData(id);
        if (response.status === 200) {
          alert("Event deleted successfully!");
          fetchEvents();
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Filter events based on active tab and date/status logic
  const filteredEvents = events.filter((event) => {
    const isExpired = new Date(event.date) < new Date();
    if (activeTab === "Active") {
      return event.status === "Active" && !isExpired;
    } else {
      return event.status === "Inactive" || isExpired;
    }
  });

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
        .nav-tabs .nav-link {
          color: #495057;
          border: none;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          padding: 10px 20px;
        }
        .nav-tabs .nav-link.active {
          color: #6366f1;
          border-bottom: 2px solid #6366f1;
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
                <h1>Events</h1>
              </div>
            </div>
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Events
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
                    paddingBottom: "10px",
                  }}
                >
                  <ul className="nav nav-tabs" style={{ border: "none" }}>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "Active" ? "active" : ""}`}
                        onClick={() => setActiveTab("Active")}
                      >
                        Active Events
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === "Inactive" ? "active" : ""}`}
                        onClick={() => setActiveTab("Inactive")}
                      >
                        Inactive Events
                      </button>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#eventsModal"
                    onClick={handleAddNewEvent}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add New
                    Event
                  </button>
                </div>

                <div
                  className="table-responsive"
                  style={{ height: "60vh", overflowY: "auto" }}
                >
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">S.NO</th>
                        <th className="border-0">Event Name</th>
                        <th className="border-0">Image</th>
                        <th className="border-0">Date</th>
                        <th className="border-0">LOCATION</th>
                        <th className="border-0">STATUS</th>
                        <th className="border-0 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event, index) => (
                        <tr key={event._id}>
                          <td className="border-0">{index + 1}</td>
                          <td className="border-0">
                            <span className="hig-blu fw-bold">
                              {event.isPinned && (
                                <i
                                  className="fa fa-thumb-tack text-danger me-2"
                                  title="Pinned Event"
                                ></i>
                              )}
                              {event.name}
                            </span>
                          </td>
                          <td className="border-0">
                            <div className="users-cir-thum-hori">
                              <span>
                                {event.image ? (
                                  <img
                                    src={event.image}
                                    alt={event.name}
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      background: "#eee",
                                      borderRadius: "5px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <i className="fa fa-image text-muted"></i>
                                  </div>
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="border-0">{formatDate(event.date)}</td>
                          <td className="border-0">
                            <div>{event.churchName}</div>
                            <small className="text-muted">
                              {event.location} - {event.state}
                            </small>
                          </td>
                          <td className="border-0">
                            <span
                              className={`badge text-white ${
                                event.status === "Active"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="border-0 text-center">
                            <div className="dropdown position-relative">
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdown(
                                    openDropdown === event._id
                                      ? null
                                      : event._id,
                                  );
                                }}
                              >
                                <i
                                  className="fa fa-ellipsis-h"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              {openDropdown === event._id && (
                                <ul
                                  className="dropdown-menu show position-absolute"
                                  style={{
                                    display: "block",
                                    top: "100%",
                                    right: "0",
                                    zIndex: 1000,
                                    minWidth: "150px",
                                  }}
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#eventsModal"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        handleViewEvent(event);
                                      }}
                                    >
                                      <i className="fa fa-eye me-2"></i>View
                                      Details
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      data-bs-toggle="modal"
                                      data-bs-target="#eventsModal"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        handleEditEvent(event);
                                      }}
                                    >
                                      <i className="fa fa-edit me-2"></i>Edit
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item text-danger"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpenDropdown(null);
                                        deleteEvent(event._id);
                                      }}
                                    >
                                      <i className="fa fa-trash me-2"></i>
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredEvents.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center py-5 border-0">
                            <div>
                              <i className="fa fa-calendar fa-3x text-muted mb-3"></i>
                              <h5 className="text-muted">
                                No events found in {activeTab}
                              </h5>
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

          {/* Modal for Add/Edit/View Event */}
          <div className="modal fade" id="eventsModal" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    {modalMode === "add"
                      ? "Add New Event"
                      : modalMode === "edit"
                        ? "Edit Event"
                        : "Event Details"}
                  </h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  />
                </div>
                <div className="modal-body">
                  {modalMode === "view" ? (
                    // VIEW MODE UI
                    <div className="view-event-details">
                      {currentEvent.image && (
                        <div className="mb-4 text-center">
                          <img
                            src={currentEvent.image}
                            alt="Event"
                            className="img-fluid rounded shadow-sm"
                            style={{
                              maxHeight: "400px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}

                      <div className="row mb-3">
                        <div className="col-md-8">
                          <h2 className="mb-3">{currentEvent.name}</h2>
                          <div className="d-flex align-items-center mb-2 text-muted">
                            <i className="fa fa-calendar me-2"></i>{" "}
                            {formatDate(currentEvent.date)}
                          </div>
                          <div className="d-flex align-items-center mb-2 text-muted">
                            <i className="fa fa-map-marker me-2"></i>{" "}
                            {currentEvent.location}, {currentEvent.state}
                          </div>
                          <div className="d-flex align-items-center mb-3 text-muted">
                            <i className="fa fa-church me-2"></i>{" "}
                            {currentEvent.churchName}
                          </div>

                          <h5 className="mt-4 border-bottom pb-2">
                            Description
                          </h5>
                          <p
                            className="text-secondary"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {currentEvent.description ||
                              "No description provided."}
                          </p>

                          <h5 className="mt-4 border-bottom pb-2">
                            Additional Details
                          </h5>
                          <p
                            className="text-secondary"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {currentEvent.details ||
                              "No additional details available."}
                          </p>
                        </div>

                        <div className="col-md-4">
                          <div className="card bg-light border-0">
                            <div className="card-body">
                              <h6 className="card-title fw-bold">
                                Contact Info
                              </h6>
                              <p className="mb-1">
                                <i className="fa fa-phone me-2"></i>{" "}
                                {currentEvent.contact}
                              </p>
                              {currentEvent.email && (
                                <p className="mb-3">
                                  <i className="fa fa-envelope me-2"></i>{" "}
                                  {currentEvent.email}
                                </p>
                              )}

                              {currentEvent.mapLink && (
                                <a
                                  href={currentEvent.mapLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-outline-primary btn-sm w-100"
                                >
                                  <i className="fa fa-map me-1"></i> View on Map
                                </a>
                              )}

                              <div className="mt-3 pt-3 border-top">
                                <span
                                  className={`badge ${currentEvent.status === "Active" ? "bg-success" : "bg-secondary"}`}
                                >
                                  {currentEvent.status}
                                </span>
                                {currentEvent.isPinned && (
                                  <span className="badge bg-warning text-dark ms-2">
                                    Pinned
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // EDIT/ADD MODE UI
                    <div className="form-inp">
                      <form onSubmit={handleSubmitEvent}>
                        <div className="form-group mb-3">
                          <label className="lb">Event Name: *</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter event name"
                            value={currentEvent.name}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">
                            Church / Meeting Place Name: *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Grace Church"
                            value={currentEvent.churchName}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                churchName: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Event Image:</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          {currentEvent.image && (
                            <div className="mt-2 text-center">
                              <img
                                src={currentEvent.image}
                                alt="Preview"
                                style={{
                                  maxHeight: "200px",
                                  maxWidth: "100%",
                                  objectFit: "contain",
                                  borderRadius: "5px",
                                  border: "1px solid #ddd",
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">Date & Time: *</label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                value={currentEvent.date}
                                onChange={(e) =>
                                  setCurrentEvent({
                                    ...currentEvent,
                                    date: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">Location: *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter location"
                                value={currentEvent.location}
                                onChange={(e) =>
                                  setCurrentEvent({
                                    ...currentEvent,
                                    location: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">State: *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Kerala, Karnataka"
                                value={currentEvent.state}
                                onChange={(e) =>
                                  setCurrentEvent({
                                    ...currentEvent,
                                    state: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group mb-3">
                              <label className="lb">Contact Details: *</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone"
                                value={currentEvent.contact}
                                onChange={(e) =>
                                  setCurrentEvent({
                                    ...currentEvent,
                                    contact: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="contact@example.com"
                            value={currentEvent.email}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Google Map Link:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="https://maps.google.com/..."
                            value={currentEvent.mapLink}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                mapLink: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-group mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="pinEvent"
                              checked={currentEvent.isPinned}
                              onChange={(e) =>
                                setCurrentEvent({
                                  ...currentEvent,
                                  isPinned: e.target.checked,
                                })
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="pinEvent"
                            >
                              <strong>Pin this event</strong> (Shows to all
                              users regardless of location)
                            </label>
                          </div>
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Description:</label>
                          <textarea
                            className="form-control"
                            placeholder="Event details..."
                            value={currentEvent.description}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                description: e.target.value,
                              })
                            }
                            rows="4"
                          ></textarea>
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">
                            Additional Details (for View Popup):
                          </label>
                          <textarea
                            className="form-control"
                            placeholder="Add extra details here..."
                            value={currentEvent.details}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                details: e.target.value,
                              })
                            }
                            rows="3"
                          ></textarea>
                        </div>

                        <div className="form-group mb-3">
                          <label className="lb">Status:</label>
                          <select
                            className="form-control"
                            value={currentEvent.status}
                            onChange={(e) =>
                              setCurrentEvent({
                                ...currentEvent,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  {modalMode !== "view" && (
                    <button
                      type="submit"
                      className="cta-full cta-colr"
                      disabled={loading}
                      onClick={handleSubmitEvent}
                    >
                      {loading
                        ? "Saving..."
                        : modalMode === "add"
                          ? "Add Event"
                          : "Update Event"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NewLayout>
    </>
  );
};

export default AdminEvents;
