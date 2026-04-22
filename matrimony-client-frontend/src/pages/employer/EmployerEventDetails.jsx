import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Circle,
  MapPin,
  Calendar,
  MessageCircle,
  ArrowUpRight,
  X,
  Download,
  User,
  Settings,
  ChevronDown,
  Edit,
  Trash2,
  MessageCircleCode,
} from "lucide-react";
import EmployerHeader from "./EmployerHeader";
import EmployerFooter from "./EmployerFooter";
import { getEventDetails } from "../../api/services/projectServices";

const EmployerEventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "", // 'success' or 'error'
  });
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    priority: "High",
    status: "Open",
    coordinator: "",
    bannerImage: "",
  });

  // Format date from dd/mm/yyyy to Date object
  const parseDate = (dateString) => {
    if (!dateString) return new Date();
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Format date to dd/mm/yyyy for display
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventDetails(eventId);
        setEvent(eventData);

        // Format the date from dd/mm/yyyy to yyyy-mm-dd for the date input
        const [day, month, year] = eventData.eventDate.split("/");
        const formattedDate = `${year}-${month}-${day}`;

        setFormData({
          title: eventData.title,
          category: eventData.category,
          description: eventData.description,
          eventDate: formattedDate,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          venue: eventData.venue,
          priority: "High",
          status: eventData.status || "Open",
          coordinator: eventData.coordinator,
          bannerImage: eventData.bannerImage,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert date back to dd/mm/yyyy format for API
      const [year, month, day] = formData.eventDate.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      const updatedEventData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        eventDate: formattedDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: formData.venue,
        coordinator: formData.coordinator,
        status: formData.status,
      };

      const response = await fetch(
        `https://api.edprofio.com/employer/updateevent/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEventData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();
      setEvent(updatedEvent);
      setShowEditModal(false);

      // Update the form data with the new values
      const [newDay, newMonth, newYear] = updatedEvent.eventDate.split("/");
      const newFormattedDate = `${newYear}-${newMonth}-${newDay}`;

      setFormData((prev) => ({
        ...prev,
        title: updatedEvent.title,
        category: updatedEvent.category,
        description: updatedEvent.description,
        eventDate: newFormattedDate,
        startTime: updatedEvent.startTime,
        endTime: updatedEvent.endTime,
        venue: updatedEvent.venue,
        status: updatedEvent.status,
        coordinator: updatedEvent.coordinator,
      }));

      // Show success toast
      setToast({
        show: true,
        message: "Event updated successfully",
        type: "success",
      });

      // Hide toast after 3 seconds
      setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
    } catch (err) {
      setError(err.message);
      setToast({
        show: true,
        message: err.message,
        type: "error",
      });
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger m-3">
        Error: {error}
        <button
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );

  if (!event)
    return <div className="alert alert-warning m-3">Event not found</div>;

  return (
    <>
      <EmployerHeader />
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div className="content">
          {/* Breadcrumb */}
          <div className="d-md-flex d-block align-items-center justify-content-between mb-3 p-3">
            <div className="mb-2">
              <h6 className="fw-medium d-flex align-items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-link d-flex align-items-center p-0 text-decoration-none"
                >
                  <ArrowLeft className="me-2" /> Event Details
                </button>
              </h6>
            </div>
          </div>

          <div className="row p-3">
            <div className="col-xl-9 col-md-8">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h5 className="text-primary fw-medium">Event Category</h5>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-secondary me-3 d-flex align-items-center">
                      <Circle className="fs-5 me-1" size={12} />{" "}
                      {event.category}
                    </span>
                    <div className="dropdown">
                      <button className="dropdown-toggle px-2 py-1 btn btn-white d-inline-flex align-items-center">
                        Mark as Private
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap border-bottom mb-3">
                      <div className="d-flex align-items-center flex-wrap">
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <h5 className="fw-semibold me-2">
                              <img
                                src={event.bannerImage}
                                className="avatar avatar-xs rounded-circle me-2"
                                alt="event"
                              />
                              {event.title}
                            </h5>
                            <span className="badge bg-outline-pink d-flex align-items-center ms-1">
                              <Circle className="fs-5 me-1" size={12} />{" "}
                              {event.status}
                            </span>
                          </div>
                          <div className="d-flex align-items-center flex-wrap row-gap-2">
                            <p className="d-flex align-items-center mb-0 me-2">
                              <MapPin className="text-primary me-1" size={14} />{" "}
                              Location
                              <span className="text-dark ms-1">
                                {event.venue}
                              </span>
                            </p>{" "}
                            &nbsp; | &nbsp;
                            <p className="d-flex align-items-center mb-0 me-2">
                              <Calendar
                                className="text-primary me-1"
                                size={14}
                              />
                              {formatDate(parseDate(event.eventDate))}
                            </p>{" "}
                            &nbsp; | &nbsp;
                            <p className="d-flex align-items-center mb-0">
                              <MessageCircleCode
                                className="text-primary me-1"
                                size={14}
                              />
                              {event.totalRegistrations || 0} Participants
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn btn-primary d-flex align-items-center"
                          onClick={() => setShowEditModal(true)}
                        >
                          <Edit className="me-1" size={16} /> Edit Event
                        </button>
                      </div>
                    </div>
                    <div className="border-bottom mb-3 pb-3">
                      <div>
                        <p className="mb-3">{event.description}</p>
                        <div className="d-flex align-items-center mb-2">
                          <span className="badge bg-light text-dark me-2">
                            <Calendar size={14} className="me-1" />
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <ul className="list-styled-dotted border-bottom pb-3">
                          <li className="ms-4 mb-3">
                            Event Coordinator: {event.coordinator}
                          </li>
                          <li className="ms-4">
                            Organizer: {event.organizerId}
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <div className="d-flex align-items-center mb-3">
                          <span className="avatar avatar-lg avatar-rounded me-2 flex-shrink-0">
                            <User size={20} />
                          </span>
                          <div>
                            <h6 className="fw-medium mb-1">
                              {event.coordinator}
                            </h6>
                            <p>
                              <Calendar className="me-1" size={14} />
                              Created on{" "}
                              {new Date(event.createdAt).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </div>
                        </div>
                        <div>
                          <div className="mb-3">
                            <p>
                              For any queries, please contact the event
                              coordinator.
                            </p>
                          </div>
                          {event.registrations &&
                            event.registrations.length > 0 && (
                              <div className="mb-3">
                                <h6>Registrations:</h6>
                                <ul className="list-group">
                                  {event.registrations.map((reg) => (
                                    <li
                                      key={reg._id}
                                      className="list-group-item"
                                    >
                                      {reg.participantName} - {reg.status}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-4">
              <div className="card">
                <div className="card-header p-3">
                  <h4 className="text-primary">Event Details</h4>
                </div>
                <div className="card-body p-0">
                  <div className="border-bottom p-3">
                    <div className="mb-3">
                      <label className="form-label">Change Priority</label>
                      <select
                        className="form-select"
                        value={formData.priority}
                        onChange={handleInputChange}
                        name="priority"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Assign To</label>
                      <select className="form-select">
                        <option>{event.coordinator}</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Event Status</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={handleInputChange}
                        name="status"
                      >
                        <option>Open</option>
                        <option>On Hold</option>
                        <option>Reopened</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex align-items-center border-bottom p-3">
                    <span className="avatar avatar-md me-2 flex-shrink-0">
                      <User size={16} />
                    </span>
                    <div>
                      <span className="fs-12">Coordinator</span>
                      <p className="text-dark">{event.coordinator}</p>
                    </div>
                  </div>
                  <div className="border-bottom p-3">
                    <span className="fs-12">Category</span>
                    <p className="text-dark">{event.category}</p>
                  </div>
                  <div className="border-bottom p-3">
                    <span className="fs-12">Event Date</span>
                    <p className="text-dark">
                      {formatDate(parseDate(event.eventDate))}
                    </p>
                  </div>
                  <div className="border-bottom p-3">
                    <span className="fs-12">Time</span>
                    <p className="text-dark">
                      {event.startTime} - {event.endTime}
                    </p>
                  </div>
                  <div className="p-3">
                    <span className="fs-12">Last Updated</span>
                    <p className="text-dark">
                      {new Date(event.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Event Modal */}
        {showEditModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1050,
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              style={{ zIndex: 1051 }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Event</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowEditModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.title}
                            onChange={handleInputChange}
                            name="title"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Event Category</label>
                          <select
                            className="form-select"
                            value={formData.category}
                            onChange={handleInputChange}
                            name="category"
                            required
                          >
                            <option value="">Select</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Online Webinar">
                              Online Webinar
                            </option>
                            <option value="Conference">Conference</option>
                            <option value="Campus Drive">Campus Drive</option>
                          </select>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Event Date</label>
                              <input
                                type="date"
                                className="form-control"
                                value={formData.eventDate}
                                onChange={handleInputChange}
                                name="eventDate"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">Start Time</label>
                              <input
                                type="time"
                                className="form-control"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                name="startTime"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="mb-3">
                              <label className="form-label">End Time</label>
                              <input
                                type="time"
                                className="form-control"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                name="endTime"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Event Location</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.venue}
                            onChange={handleInputChange}
                            name="venue"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Event Coordinator
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.coordinator}
                            onChange={handleInputChange}
                            name="coordinator"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            Event Description
                          </label>
                          <textarea
                            className="form-control"
                            rows="5"
                            value={formData.description}
                            onChange={handleInputChange}
                            name="description"
                            required
                          ></textarea>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            value={formData.status}
                            onChange={handleInputChange}
                            name="status"
                            required
                          >
                            <option value="Open">Open</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Reopened">Reopened</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {toast.show && (
          <div
            className={`toast show position-fixed top-0 end-0 m-3 ${
              toast.type === "success" ? "bg-success" : "bg-danger"
            }`}
            style={{ zIndex: 1100 }}
          >
            <div className="toast-body text-white d-flex justify-content-between align-items-center">
              <span>{toast.message}</span>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        )}
      </div>
      <EmployerFooter />
    </>
  );
};

export default EmployerEventDetails;
