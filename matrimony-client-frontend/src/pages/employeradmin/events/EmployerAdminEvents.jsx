import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Paperclip,
  MoreVertical,
  Trash2,
  Edit,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { TfiSearch } from "react-icons/tfi";
import { FaUniversity } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaComments, FaPaperclip } from "react-icons/fa6";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import { getAllEvents } from "../../../api/services/projectServices";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";

const EmployerAdminEvents = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pills-home");
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [organizerFilter, setOrganizerFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    category: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    coordinator: "",
    entryfee: "0",
    bannerImage: null,
  });
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const processedEvents = response.map((event) => {
          const eventDate = new Date(event.eventDate);
          const today = new Date();
          let status = "Upcoming";

          if (eventDate < today) {
            status = "Completed";
          } else if (eventDate.toDateString() === today.toDateString()) {
            status = "Current";
          }

          if (event._id === "68564338f6e1e50b7331fa57") {
            status = "On-hold";
          } else if (event._id === "6856433af6e1e50b7331fa59") {
            status = "Cancelled";
          }

          return {
            ...event,
            status,
            type: event.category || "Workshop",
          };
        });
        setEvents(processedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (event.venue?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesOrganizer =
      organizerFilter === "All" ||
      (event.organizerId === "665fd983d7e1f2a70b89e5e7"
        ? "Edujobz"
        : "Other") === organizerFilter;

    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;

    const eventDate = new Date(event.eventDate);
    const matchesDate =
      (!fromDate || eventDate >= new Date(fromDate)) &&
      (!toDate || eventDate <= new Date(toDate));

    return matchesSearch && matchesOrganizer && matchesStatus && matchesDate;
  });

  const currentEvents = filteredEvents.filter(
    (event) => event.status === "Current"
  );
  const upcomingEvents = filteredEvents.filter(
    (event) => event.status === "Upcoming"
  );
  const onHoldEvents = filteredEvents.filter(
    (event) => event.status === "On-hold" || event.status === "Cancelled"
  );
  const completedEvents = filteredEvents.filter(
    (event) => event.status === "Completed"
  );

  const workshops = filteredEvents.filter((event) => event.type === "Workshop");
  const webinars = filteredEvents.filter(
    (event) => event.type === "Online Webinar"
  );
  const seminars = filteredEvents.filter((event) => event.type === "Seminar");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewEvent((prev) => ({
      ...prev,
      bannerImage: e.target.files[0],
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const EmployerAdminData = JSON.parse(
        localStorage.getItem("EmployerAdminData")
      );
      if (!EmployerAdminData || !EmployerAdminData._id) {
        throw new Error("Organizer ID not found in localStorage");
      }

      // 1. Create FormData object
      const formData = new FormData();

      // 2. Append all text fields
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("category", newEvent.category);
      formData.append("eventDate", newEvent.eventDate);
      formData.append("startTime", newEvent.startTime);
      formData.append("endTime", newEvent.endTime);
      formData.append("venue", newEvent.venue);
      formData.append("coordinator", newEvent.coordinator);

      // 3. Append default values for required backend fields
      formData.append("totalattendes", "100"); // Default value
      formData.append("entryfee", "0"); // Default value
      formData.append("eventendDate", newEvent.eventDate); // Same as start date

      // 4. Critical: Append the file with the correct field name
      if (newEvent.bannerImage) {
        formData.append("file", newEvent.bannerImage); // Must be 'file' to match multer
        formData.append("fileType", "eventimage"); // Tell backend which storage to use
      }

      // 5. Log FormData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // 6. Make the request WITHOUT setting Content-Type header
      const response = await fetch(
        `${VITE_BASE_URL }/employer/${EmployerAdminData._id}/events?fileType=eventimage`,
        {
          method: "POST",
          body: formData, // FormData will set the correct headers automatically
          // Don't set Content-Type header - the browser will set it with boundary
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      const createdEvent = await response.json();
      console.log("Created Event Response:", createdEvent);

      // Process and add the new event to state
      const eventDate = new Date(createdEvent.eventDate);
      const today = new Date();
      let status = "Upcoming";

      if (eventDate < today) {
        status = "Completed";
      } else if (eventDate.toDateString() === today.toDateString()) {
        status = "Current";
      }

      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...createdEvent,
          status,
          type: createdEvent.category || "Workshop",
          registrations: createdEvent.registrations || [],
          totalRegistrations: createdEvent.totalRegistrations || 0,
        },
      ]);

      // Reset form and close modal
      setNewEvent({
        title: "",
        description: "",
        category: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        venue: "",
        coordinator: "",
        bannerImage: null,
      });
      setFileInputKey(Date.now());
      setShowAddEventModal(false);
      setToast({
        show: true,
        message: "Event created successfully",
        type: "success",
      });
    } catch (err) {
      console.error("Error creating event:", err);
      setToast({
        show: true,
        message: err.message || "Failed to create event",
        type: "error",
      });
    }
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      const response = await fetch(
        `https://api.edprofio.com/employer/removeevents/${eventToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((event) => event._id !== eventToDelete));
      setShowDeleteModal(false);
      setEventToDelete(null);
      setToast({
        show: true,
        message: "Event deleted successfully",
        type: "danger",
      });
    } catch (err) {
      setToast({ show: true, message: err.message, type: "error" });
      setError(err.message);
    }
  };
  const exportToExcel = () => {
    // Prepare data
    const headers = [
      "Title",
      "Type",
      "Date",
      "Venue",
      "Status",
      "Registrations",
    ];
    const data = filteredEvents.map((event) => [
      event.title,
      event.type,
      new Date(event.eventDate).toLocaleDateString(),
      event.venue,
      event.status,
      event.registrations?.length || 0,
    ]);

    // Convert to CSV
    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      data.map((row) => row.join(",")).join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportToPDF = () => {
    // Create a printable HTML table
    const printContent = `
    <h2>Events Report</h2>
    <table border="1" style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Date</th>
          <th>Venue</th>
          <th>Status</th>
          <th>Registrations</th>
        </tr>
      </thead>
      <tbody>
        ${filteredEvents
          .map(
            (event) => `
          <tr>
            <td>${event.title}</td>
            <td>${event.type}</td>
            <td>${new Date(event.eventDate).toLocaleDateString()}</td>
            <td>${event.venue}</td>
            <td>${event.status}</td>
            <td>${event.registrations?.length || 0}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    // Open print dialog
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>Events Report</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          @media print {
            @page { size: landscape; }
          }
        </style>
      </head>
      <body>
        ${printContent}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 100);
          }
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 1000); // 1000ms = 1 second

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [toast.show]);
  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <EmployerAdminHeader />
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* Fixed Header Card */}
        <div
          className="card"
          style={{
            marginTop: "49px",
            position: "fixed",
            width: "100%",
            zIndex: 9,
          }}
        >
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
            <h4>
              <FaUniversity className="text-primary" /> Events
            </h4>
            <div className="d-flex align-items-center flex-wrap row-gap-2">
              <div className="d-flex align-items-center me-3">
                <p className="mb-0 me-3 pe-3 border-end fs-14 text-primary">
                  Total Events:{" "}
                  <span className="text-dark"> {events.length}</span>
                </p>
                <p className="mb-0 me-3 pe-3 border-end fs-14 text-primary">
                  Upcoming:{" "}
                  <span className="text-dark"> {upcomingEvents.length}</span>
                </p>
                <p className="mb-0 fs-14 text-primary">
                  Completed:{" "}
                  <span className="text-dark"> {completedEvents.length}</span>
                </p>
              </div>
              <div className="input-icon-start position-relative me-2">
                <span className="input-icon-addon">
                  <TfiSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Event"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="dropdown me-2">
                <button
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExportDropdown(!showExportDropdown);
                  }}
                >
                  <i className="ti ti-file-export me-2"></i>
                  Export
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end p-3 ${
                    showExportDropdown ? "show" : ""
                  }`}
                >
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={exportToExcel}
                    >
                      <i className="ti ti-file-type-xls me-1"></i>Export as
                      Excel
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={exportToPDF}
                    >
                      <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                    </button>
                  </li>
                </ul>
              </div>
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center"
                onClick={() => setShowAddEventModal(true)}
              >
                <TiPlus className="me-2" /> Add New Event
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-wrap row-gap-2">
                  <div className="dropdown me-2">
                    <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                      {organizerFilter === "All"
                        ? "Organizer"
                        : organizerFilter}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setOrganizerFilter("All")}
                        >
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setOrganizerFilter("Edujobz")}
                        >
                          EdProfio
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setOrganizerFilter("Other")}
                        >
                          Other
                        </button>
                      </li>
                    </ul>
                  </div>
                  <ul className="nav nav-pills border d-inline-flex rounded bg-light todo-tabs">
                    <li className="nav-item">
                      <button
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${
                          activeTab === "pills-home" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("pills-home")}
                      >
                        All Events
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${
                          activeTab === "pills-contact" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("pills-contact")}
                      >
                        Workshops
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${
                          activeTab === "pills-medium" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("pills-medium")}
                      >
                        Webinars
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${
                          activeTab === "pills-low" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("pills-low")}
                      >
                        Seminars
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-2">
                  <div className="input-icon w-120 position-relative me-2">
                    <span className="input-icon-addon">
                      <Calendar className="text-gray-9" />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="From Date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="input-icon w-120 position-relative me-2">
                    <span className="input-icon-addon">
                      <Calendar className="text-gray-9" />
                    </span>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="To Date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <div className="dropdown me-2">
                    <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                      {statusFilter === "All" ? "Select Status" : statusFilter}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-3">
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setStatusFilter("All")}
                        >
                          All
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setStatusFilter("Current")}
                        >
                          Current
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setStatusFilter("Upcoming")}
                        >
                          Upcoming
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setStatusFilter("On-hold")}
                        >
                          On-hold
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setStatusFilter("Cancelled")}
                        >
                          Cancelled
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-1"
                          onClick={() => setStatusFilter("Completed")}
                        >
                          Completed
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content" style={{ marginTop: "230px", flex: 1 }}>
          <div className="card">
            <div className="card-body">
              <div className="tab-content">
                {/* All Events Tab */}
                {activeTab === "pills-home" && (
                  <div className="tab-pane fade show active">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn
                        title="Current Events"
                        count={currentEvents.length}
                        events={currentEvents}
                        color="pink"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Upcoming Events"
                        count={upcomingEvents.length}
                        events={upcomingEvents}
                        color="skyblue"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="On-hold / Cancelled"
                        count={onHoldEvents.length}
                        events={onHoldEvents}
                        color="danger"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Completed Events"
                        count={completedEvents.length}
                        events={completedEvents}
                        color="success"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />
                    </div>
                  </div>
                )}

                {/* Workshops Tab */}
                {activeTab === "pills-contact" && (
                  <div className="tab-pane fade">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn
                        title="Current Workshops"
                        count={
                          workshops.filter((e) => e.status === "Current").length
                        }
                        events={workshops.filter((e) => e.status === "Current")}
                        color="pink"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Upcoming Workshops"
                        count={
                          workshops.filter((e) => e.status === "Upcoming")
                            .length
                        }
                        events={workshops.filter(
                          (e) => e.status === "Upcoming"
                        )}
                        color="skyblue"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="On-hold / Cancelled"
                        count={
                          workshops.filter(
                            (e) =>
                              e.status === "On-hold" || e.status === "Cancelled"
                          ).length
                        }
                        events={workshops.filter(
                          (e) =>
                            e.status === "On-hold" || e.status === "Cancelled"
                        )}
                        color="danger"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Completed Workshops"
                        count={
                          workshops.filter((e) => e.status === "Completed")
                            .length
                        }
                        events={workshops.filter(
                          (e) => e.status === "Completed"
                        )}
                        color="success"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />
                    </div>
                  </div>
                )}

                {/* Webinars Tab */}
                {activeTab === "pills-medium" && (
                  <div className="tab-pane fade">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn
                        title="Current Webinars"
                        count={
                          webinars.filter((e) => e.status === "Current").length
                        }
                        events={webinars.filter((e) => e.status === "Current")}
                        color="pink"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Upcoming Webinars"
                        count={
                          webinars.filter((e) => e.status === "Upcoming").length
                        }
                        events={webinars.filter((e) => e.status === "Upcoming")}
                        color="skyblue"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="On-hold / Cancelled"
                        count={
                          webinars.filter(
                            (e) =>
                              e.status === "On-hold" || e.status === "Cancelled"
                          ).length
                        }
                        events={webinars.filter(
                          (e) =>
                            e.status === "On-hold" || e.status === "Cancelled"
                        )}
                        color="danger"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Completed Webinars"
                        count={
                          webinars.filter((e) => e.status === "Completed")
                            .length
                        }
                        events={webinars.filter(
                          (e) => e.status === "Completed"
                        )}
                        color="success"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />
                    </div>
                  </div>
                )}

                {/* Seminars Tab */}
                {activeTab === "pills-low" && (
                  <div className="tab-pane fade">
                    <div className="d-flex align-items-start overflow-auto project-status pb-4">
                      <EventColumn
                        title="Current Seminars"
                        count={
                          seminars.filter((e) => e.status === "Current").length
                        }
                        events={seminars.filter((e) => e.status === "Current")}
                        color="pink"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Upcoming Seminars"
                        count={
                          seminars.filter((e) => e.status === "Upcoming").length
                        }
                        events={seminars.filter((e) => e.status === "Upcoming")}
                        color="skyblue"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="On-hold / Cancelled"
                        count={
                          seminars.filter(
                            (e) =>
                              e.status === "On-hold" || e.status === "Cancelled"
                          ).length
                        }
                        events={seminars.filter(
                          (e) =>
                            e.status === "On-hold" || e.status === "Cancelled"
                        )}
                        color="danger"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />

                      <EventColumn
                        title="Completed Seminars"
                        count={
                          seminars.filter((e) => e.status === "Completed")
                            .length
                        }
                        events={seminars.filter(
                          (e) => e.status === "Completed"
                        )}
                        color="success"
                        onView={handleViewEvent}
                        onDelete={handleDeleteClick}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add New Event Modal */}
        {showAddEventModal && (
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
              className="modal-dialog modal-dialog-centered"
              style={{ zIndex: 1051 }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title text-primary">Add New Event</h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddEventModal(false)}
                  >
                    <MoreVertical />
                  </button>
                </div>
                <form onSubmit={handleCreateEvent}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Event Title</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Category</label>
                          <select
                            className="form-select"
                            name="category"
                            value={newEvent.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="Conference">Conference</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Seminar">Seminar</option>
                            <option value="Webinar">Webinar</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Banner Image</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            key={fileInputKey}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setNewEvent((prev) => ({
                                  ...prev,
                                  bannerImage: e.target.files[0], // Store the File object directly
                                }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Event Date</label>
                          <div className="input-icon-end position-relative">
                            <input
                              type="date"
                              className="form-control"
                              name="eventDate"
                              value={newEvent.eventDate}
                              onChange={handleInputChange}
                              required
                            />
                            <span className="input-icon-addon">
                              <Calendar className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Time</label>
                          <div className="input-icon-end position-relative">
                            <input
                              type="time"
                              className="form-control"
                              name="startTime"
                              value={newEvent.startTime}
                              onChange={handleInputChange}
                              required
                            />
                            <span className="input-icon-addon">
                              <Calendar className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Time</label>
                          <div className="input-icon-end position-relative">
                            <input
                              type="time"
                              className="form-control"
                              name="endTime"
                              value={newEvent.endTime}
                              onChange={handleInputChange}
                              required
                            />
                            <span className="input-icon-addon">
                              <Calendar className="text-primary" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Entry Fee (₹)</label>
                          <input
                            type="number"
                            className="form-control"
                            name="entryfee"
                            value={newEvent.entryfee || ""}
                            onChange={handleInputChange}
                            placeholder="0 for free"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Venue</label>
                          <input
                            type="text"
                            className="form-control"
                            name="venue"
                            value={newEvent.venue}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Coordinator Details
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coordinator"
                            value={newEvent.coordinator}
                            onChange={handleInputChange}
                            placeholder="Name, Contact Number"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowAddEventModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Create Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
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
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <Trash2 className="text-danger fs-4" />
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    You want to delete this event. This can't be undone once you
                    delete.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-light me-3"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleConfirmDelete}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`toast show position-fixed top-0 end-0 m-3 ${
              toast.type === "success" ? "bg-success" : "bg-danger"
            }`}
            style={{
              zIndex: 9999,
              transition: "opacity 0.5s ease-out",
              opacity: toast.show ? 1 : 0,
            }}
          >
            <div className="toast-body text-white d-flex align-items-center">
              {toast.type === "success" ? (
                <CheckCircle className="me-2" />
              ) : (
                <AlertCircle className="me-2" />
              )}
              {toast.message}
            </div>
          </div>
        )}
      </div>
      <EmployerAdminFooter />
    </>
  );
};

// Reusable Event Column Component
const EventColumn = ({ title, count, events, color, onView, onDelete }) => {
  const colorClasses = {
    pink: { bg: "bg-soft-pink", dot: "bg-pink" },
    skyblue: { bg: "bg-soft-skyblue", dot: "bg-skyblue" },
    danger: { bg: "bg-soft-danger", dot: "bg-danger" },
    success: { bg: "bg-soft-success", dot: "bg-success" },
  };

  return (
    <div className="p-3 rounded bg-transparent-secondary w-100 me-4 border border-dark shadow">
      <div className={`bg-secondary p-2 rounded mb-2`}>
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center"
            style={{ margin: "0px auto" }}
          >
            <span
              className={`${colorClasses[color].bg} p-1 d-flex rounded-circle me-2`}
            >
              <span
                className={`${colorClasses[color].dot} rounded-circle d-block p-1`}
              ></span>
            </span>
            <h5 className="me-2 text-white">{title}</h5>
            <span className="badge bg-light rounded-pill">{count}</span>
          </div>
        </div>
      </div>
      <div className="kanban-drag-wrap">
        {events.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            onView={() => onView(event)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

// Reusable Event Card Component
const EventCard = ({ event, onView, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Add null checks for event properties
  const eventTitle = event?.title || "Untitled Event";
  const eventVenue = event?.venue || "Venue not specified";
  const eventDate = event?.eventDate
    ? new Date(event.eventDate).toLocaleDateString()
    : "Date not specified";
  const bannerImage = event?.bannerImage || "default-image-url";
  const registrations = event?.registrations || [];
  const totalRegistrations = event?.totalRegistrations || 0;
  const maxParticipants = event?.maxParticipants || "∞";
  const organizer =
    event?.organizerId === "665fd983d7e1f2a70b89e5e7" ? "Edujobz" : "Other";

  return (
    <div className="card kanban-card mb-2">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <span className="badge bg-outline-dark me-2">{organizer}</span>
          </div>
          <div className="dropdown">
            <button
              className="d-inline-flex align-items-center border-0 bg-transparent"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical />
            </button>
            {showDropdown && (
              <div
                className="dropdown-menu show"
                style={{ position: "absolute", right: 0, zIndex: 1000 }}
              >
                <button
                  className="dropdown-item rounded-1"
                  onClick={() => {
                    if (event?._id) {
                      navigate(`/employer/events-details/${event._id}`);
                    } else {
                      console.error("Event ID is missing");
                    }
                    setShowDropdown(false);
                  }}
                >
                  <Edit className="me-2" /> Details/Edit
                </button>
                <button
                  className="dropdown-item rounded-1"
                  onClick={() => {
                    if (event?._id) {
                      onDelete(event._id);
                    }
                    setShowDropdown(false);
                  }}
                >
                  <Trash2 className="text-danger me-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="avatar avatar-xs rounded-circle bg-warning me-2">
            <img
              src={bannerImage}
              alt={eventTitle}
              className="avatar avatar-xs rounded-circle"
            />
          </span>
          <h6 className="align-items-center text-primary">
            <button
              onClick={onView}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {eventTitle}
            </button>
            <br />
            <span className="fs-12 text-gray">{eventVenue}</span>
          </h6>
        </div>
        <div className="d-flex align-items-center border-bottom mb-3 pb-3">
          <div className="me-3 pe-3 border-end">
            <span className="fw-bold fs-12 d-block">Entry Fee</span>
            <p className="fs-12 text-dark">FREE</p>
          </div>
          <div className="me-3 pe-3 border-end">
            <span className="fw-bold fs-12 d-block">Participants</span>
            <p className="fs-12 text-dark">
              {totalRegistrations}/{maxParticipants}
            </p>
          </div>
          <div className="">
            <span className="fw-bold fs-12 d-block">Event on</span>
            <p className="fs-12 text-dark">{eventDate}</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="avatar-list-stacked avatar-group-sm me-3">
            {registrations.slice(0, 3).map((reg, index) => (
              <span
                key={index}
                className="avatar avatar-rounded bg-secondary fs-12 text-white"
              >
                {reg?.participantName
                  ? reg.participantName.charAt(0).toUpperCase()
                  : "A"}
              </span>
            ))}
            {registrations.length > 3 && (
              <span className="avatar avatar-rounded bg-secondary fs-12 text-white">
                +{registrations.length - 3}
              </span>
            )}
          </div>
          <div className="d-flex align-items-center">
            <button className="d-flex align-items-center text-dark me-2 border-0 p-0 bg-transparent">
              <FaComments className="text-success me-1 " />
              {registrations.length}
            </button>
            <button className="d-flex align-items-center text-dark me-2 border-0 p-0 bg-transparent">
              <FaPaperclip className="text-primary me-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAdminEvents;
