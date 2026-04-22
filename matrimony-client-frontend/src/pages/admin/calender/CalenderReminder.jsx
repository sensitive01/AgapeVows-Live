import React, { useState, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  FileOutput,
  PlusCircle,
  ChevronsUp,
  SquarePlus,
  X,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  Edit2,
  Trash2,
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";

const API_BASE_URL = "https://api.edprofio.com";

const CalenderReminder = () => {
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    description: "",
    color: "#6C63FF",
  });
  const [editEvent, setEditEvent] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    location: "",
    description: "",
    color: "#6C63FF",
  });
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isUpdatingEvent, setIsUpdatingEvent] = useState(false);
  const [isDeletingEvent, setIsDeletingEvent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const calendarRef = useRef(null);
  const miniCalendarRef = useRef(null);
  const externalEventsRef = useRef(null);

  const eventCategories = [
    {
      title: "Team Reminder",
      className: "bg-transparent-success",
      iconColor: "text-success",
    },
    {
      title: "Work",
      className: "bg-transparent-warning",
      iconColor: "text-warning",
    },
    {
      title: "External",
      className: "bg-transparent-danger",
      iconColor: "text-danger",
    },
    {
      title: "Projects",
      className: "bg-transparent-skyblue",
      iconColor: "text-skyblue",
    },
    {
      title: "Applications",
      className: "bg-transparent-purple",
      iconColor: "text-purple",
    },
    {
      title: "Design",
      className: "bg-transparent-info",
      iconColor: "text-info",
    },
  ];
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
    operation: "",
  });

  const fetchEvents = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      if (!adminData || !adminData.adminid) {
        throw new Error("Employer ID not found in localStorage");
      }

      const response = await fetch(
        `${API_BASE_URL}/employer/geteveent?employerId=${adminData.adminid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      if (data.success) {
        const formattedEvents = data.data.map((event) => ({
          id: event._id || event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          color: event.color,
          extendedProps: {
            description: event.description,
            location: event.location,
            employerId: event.employerId,
          },
        }));
        setEvents(formattedEvents);

        // Set upcoming events (next 5 events)
        const now = new Date();
        const upcoming = formattedEvents
          .filter((event) => new Date(event.end) > now)
          .sort((a, b) => new Date(a.start) - new Date(b.start))
          .slice(0, 5)
          .map((event) => ({
            id: event.id,
            title: event.title,
            date: new Date(event.start).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            location: event.extendedProps.location,
            borderColor: getRandomBorderColor(),
          }));

        setUpcomingEvents(upcoming);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setErrorMessage(error.message);
    }
  };

  const getRandomBorderColor = () => {
    const colors = [
      "border-purple",
      "border-pink",
      "border-success",
      "border-warning",
      "border-danger",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const createEvent = async (eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employer/createcalender`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/employer/updatecalenderevent/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update event");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      if (!adminData || !adminData.adminid) {
        throw new Error("Employer ID not found in localStorage");
      }

      const response = await fetch(
        `${API_BASE_URL}/employer/deletecalendarevent/${eventId}?employerId=${adminData.adminid}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete event");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchEvents();

    if (externalEventsRef.current) {
      const externalEventElements = Array.from(
        externalEventsRef.current.children
      );

      externalEventElements.forEach((eventEl) => {
        eventEl.draggable = true;
        eventEl.addEventListener("dragstart", (ev) => {
          ev.dataTransfer.setData("text/plain", eventEl.dataset.event);
          ev.dataTransfer.effectAllowed = "copy";
        });
      });
    }

    return () => {
      if (externalEventsRef.current) {
        const externalEventElements = Array.from(
          externalEventsRef.current.children
        );
        externalEventElements.forEach((eventEl) => {
          eventEl.removeEventListener("dragstart", () => {});
        });
      }
    };
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      color: info.event.backgroundColor,
      extendedProps: info.event.extendedProps,
    });
    setShowEventModal(true);
  };

  const handleDateSelect = (selectInfo) => {
    setNewEvent({
      ...newEvent,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setShowAddEventModal(true);
  };

  const handleMiniCalendarDateClick = (arg) => {
    // When a date is clicked on the mini calendar, navigate the main calendar to that date
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(arg.date);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEvent({
      ...editEvent,
      [name]: value,
    });
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.title || isCreatingEvent) {
      return;
    }

    setIsCreatingEvent(true);
    setErrorMessage("");

    try {
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      if (!adminData || !adminData.adminid) {
        throw new Error("Employer ID not found in localStorage");
      }

      if (!newEvent.start || !newEvent.end) {
        throw new Error("Please select both start and end times");
      }

      const startDate = new Date(newEvent.start);
      const endDate = new Date(newEvent.end);
      if (startDate >= endDate) {
        throw new Error("End time must be after start time");
      }

      const eventData = {
        employerId: adminData.adminid,
        title: newEvent.title,
        description: newEvent.description,
        location: newEvent.location,
        start: newEvent.start,
        end: newEvent.end,
        color: newEvent.color,
      };

      const response = await createEvent(eventData);

      if (response.success) {
        setToast({
          show: true,
          message: "Event created successfully!",
          type: "success",
          operation: "add",
        });
        setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);

        const eventToAdd = {
          id: response.data.id,
          title: response.data.title,
          start: response.data.start,
          end: response.data.end,
          color: response.data.color,
          extendedProps: {
            description: response.data.description,
            location: response.data.location,
            employerId: response.data.employerId,
          },
        };

        setEvents([...events, eventToAdd]);
        setShowAddEventModal(false);
        setNewEvent({
          title: "",
          start: "",
          end: "",
          location: "",
          description: "",
          color: "#6C63FF",
        });

        await fetchEvents();
      }
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Failed to create event",
        type: "error",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
      setErrorMessage(error.message || "Failed to create event");
    } finally {
      setIsCreatingEvent(false);
    }
  };

  const handleEditEvent = () => {
    if (!selectedEvent) return;

    setEditEvent({
      id: selectedEvent.id,
      title: selectedEvent.title,
      start: selectedEvent.start
        ? new Date(selectedEvent.start).toISOString().slice(0, 16)
        : "",
      end: selectedEvent.end
        ? new Date(selectedEvent.end).toISOString().slice(0, 16)
        : "",
      location: selectedEvent.extendedProps?.location || "",
      description: selectedEvent.extendedProps?.description || "",
      color: selectedEvent.color || "#6C63FF",
    });

    setShowEventModal(false);
    setShowEditEventModal(true);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editEvent.title || isUpdatingEvent) {
      return;
    }

    setIsUpdatingEvent(true);
    setErrorMessage("");

    try {
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      if (!adminData || !adminData.adminid) {
        throw new Error("Employer ID not found in localStorage");
      }

      if (!editEvent.start || !editEvent.end) {
        throw new Error("Please select both start and end times");
      }

      const startDate = new Date(editEvent.start);
      const endDate = new Date(editEvent.end);
      if (startDate >= endDate) {
        throw new Error("End time must be after start time");
      }

      const eventData = {
        employerId: adminData.adminid,
        title: editEvent.title,
        description: editEvent.description,
        location: editEvent.location,
        start: editEvent.start,
        end: editEvent.end,
        color: editEvent.color,
      };

      const response = await updateEvent(editEvent.id, eventData);

      if (response.success) {
        setToast({
          show: true,
          message: "Event updated successfully!",
          type: "warning",
          operation: "update",
        });
        setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);

        const updatedEvents = events.map((event) => {
          if (event.id === editEvent.id) {
            return {
              ...event,
              title: editEvent.title,
              start: editEvent.start,
              end: editEvent.end,
              color: editEvent.color,
              extendedProps: {
                ...event.extendedProps,
                description: editEvent.description,
                location: editEvent.location,
              },
            };
          }
          return event;
        });

        setEvents(updatedEvents);
        setShowEditEventModal(false);
        await fetchEvents();
      }
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Failed to update event",
        type: "error",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
      setErrorMessage(error.message || "Failed to update event");
    } finally {
      setIsUpdatingEvent(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent || isDeletingEvent) return;

    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    setIsDeletingEvent(true);
    setErrorMessage("");

    try {
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      if (!adminData || !adminData.adminid) {
        throw new Error("Employer ID not found in localStorage");
      }

      const response = await deleteEvent(selectedEvent.id);

      if (response.success) {
        setToast({
          show: true,
          message: "Event deleted successfully!",
          type: "error",
          operation: "delete",
        });
        setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);

        const filteredEvents = events.filter(
          (event) => event.id !== selectedEvent.id
        );
        setEvents(filteredEvents);
        setShowEventModal(false);
        await fetchEvents();
      }
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Failed to delete event",
        type: "error",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 2000);
      setErrorMessage(error.message || "Failed to delete event");
    } finally {
      setIsDeletingEvent(false);
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateForMiniCalendar = (date) => {
    return date.toISOString().split("T")[0];
  };

  const today = new Date();
  const todayStr = formatDateForMiniCalendar(today);

  return (
    <>
      <AdminHeader />
      <div>
        <div className="content">
          {toast.show && (
            <div
              className={`toast show position-fixed top-0 end-0 m-3 ${
                toast.operation === "add"
                  ? "bg-success"
                  : toast.operation === "update"
                  ? "bg-warning"
                  : "bg-danger"
              }`}
              style={{
                zIndex: 9999,
                minWidth: "250px",
                transition: "all 0.5s ease",
              }}
            >
              <div className="toast-body text-white d-flex justify-content-between">
                <span>{toast.message}</span>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setToast({ ...toast, show: false })}
                ></button>
              </div>
            </div>
          )}
          <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
            <div className="my-auto mb-2">
              <h2 className="mb-1">
                &nbsp; <CalendarIcon className="text-primary" /> Reminder
              </h2>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <div className="me-2 mb-2">
                <div className="input-icon-end position-relative">
                  <input
                    type="text"
                    className="form-control date-range bookingrange"
                    style={{ width: "205px" }}
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                  />
                  <span className="input-icon-addon">
                    <ChevronDown />
                  </span>
                </div>
              </div>
              <div className="me-2 mb-2">
                <div className="dropdown">
                  <button
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    type="button"
                    id="exportDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FileOutput className="me-1" /> Export
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end p-3"
                    aria-labelledby="exportDropdown"
                  >
                    <li>
                      <button className="dropdown-item rounded-1">
                        <i className="ti ti-file-type-pdf me-1"></i>Export as
                        PDF
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item rounded-1">
                        <i className="ti ti-file-type-xls me-1"></i>Export as
                        Excel
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-2">
                <button
                  className="btn btn-primary d-flex align-items-center"
                  onClick={() => setShowAddEventModal(true)}
                >
                  <PlusCircle className="me-2" /> Create Reminder
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-3 col-xl-4">
              <div className="card h-100">
                <div className="card-body p-3">
                  <div className="border-bottom pb-2 mb-4">
                    <div id="mini-calendar" style={{ minHeight: "300px" }}>
                      <FullCalendar
                        ref={miniCalendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                          left: "prev",
                          center: "title",
                          right: "next",
                        }}
                        height="100%"
                        contentHeight="auto"
                        fixedWeekCount={false}
                        initialDate={todayStr}
                        dateClick={handleMiniCalendarDateClick}
                        events={events}
                        eventClick={handleEventClick}
                      />
                    </div>
                  </div>

                  <div className="border-bottom pb-4 mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h5>Event</h5>
                      <button
                        className="link-primary"
                        onClick={() => setShowAddEventModal(true)}
                      >
                        <SquarePlus className="fs-16" />
                      </button>
                    </div>
                    <p className="fs-12 mb-2">
                      Drag and drop your event or click in the calendar
                    </p>
                    <div id="external-events" ref={externalEventsRef}>
                      {eventCategories.map((event, index) => (
                        <div
                          key={index}
                          className={`fc-event ${event.className} mb-1`}
                          data-event={JSON.stringify({ title: event.title })}
                          draggable="true"
                        >
                          <i
                            className={`ti ti-square-rounded ${event.iconColor} me-2`}
                          ></i>
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-bottom pb-2 mb-4">
                    <h5 className="mb-2">
                      Upcoming Reminder
                      <span className="badge badge-success rounded-pill ms-2">
                        {upcomingEvents.length}
                      </span>
                    </h5>
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className={`border-start ${event.borderColor} border-3 mb-3`}
                      >
                        <div className="ps-3">
                          <h6 className="fw-medium mb-1">{event.title}</h6>
                          <p className="fs-12 mb-1">
                            <CalendarIcon className="text-info me-2" />
                            {event.date}
                          </p>
                          {event.location && (
                            <p className="fs-12">
                              <MapPin className="text-info me-2" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-dark rounded text-center position-relative p-4">
                    <span className="avatar avatar-lg rounded-circle bg-white mb-2">
                      <AlertTriangle className="text-dark" />
                    </span>
                    <h6 className="text-white mb-3">
                      Enjoy Unlimited Access on a small price monthly.
                    </h6>
                    <button className="btn btn-white">
                      Upgrade Now <ArrowRight />
                    </button>
                    <div className="box-bg">
                      <span className="bg-right">
                        <img src="assets/img/bg/email-bg-01.png" alt="Img" />
                      </span>
                      <span className="bg-left">
                        <img src="assets/img/bg/email-bg-02.png" alt="Img" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-9 col-xl-8 theiaStickySidebar">
              <div className="card border-0 h-100">
                <div className="card-body p-0">
                  <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    droppable={true}
                    events={events}
                    eventClick={handleEventClick}
                    select={handleDateSelect}
                    height="100%"
                    contentHeight="auto"
                    initialDate={todayStr}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Reminder Modal */}
        {showAddEventModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add New Reminder</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowAddEventModal(false)}
                  >
                    <X />
                  </button>
                </div>
                <form onSubmit={handleAddEvent}>
                  <div className="modal-body">
                    {errorMessage && (
                      <div className="alert alert-danger mb-3">
                        {errorMessage}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Reminder Name*</label>
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
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Date*</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={newEvent.start}
                            onChange={(e) => {
                              setNewEvent({
                                ...newEvent,
                                start: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Date*</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            value={newEvent.end}
                            onChange={(e) => {
                              setNewEvent({
                                ...newEvent,
                                end: e.target.value,
                              });
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Reminder Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={newEvent.location}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Color</label>
                          <select
                            className="form-select"
                            name="color"
                            value={newEvent.color}
                            onChange={handleInputChange}
                          >
                            <option value="#6C63FF">Purple</option>
                            <option value="#4CAF50">Green</option>
                            <option value="#2196F3">Blue</option>
                            <option value="#FF9800">Orange</option>
                            <option value="#F44336">Red</option>
                          </select>
                        </div>
                        <div className="mb-0">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                          ></textarea>
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isCreatingEvent}
                    >
                      {isCreatingEvent ? "Creating..." : "Add Reminder"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Event Details Modal */}
        {showEventModal && selectedEvent && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-dark modal-bg">
                  <div className="modal-title text-white">
                    <span>{selectedEvent.title}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowEventModal(false)}
                  >
                    <X />
                  </button>
                </div>
                <div className="modal-body">
                  <p className="d-flex align-items-center fw-medium text-black mb-3">
                    <CalendarIcon className="text-default me-2" />
                    {formatDateTime(selectedEvent.start)}{" "}
                    {selectedEvent.end &&
                      `to ${formatDateTime(selectedEvent.end)}`}
                  </p>
                  {selectedEvent.extendedProps?.location && (
                    <p className="d-flex align-items-center fw-medium text-black mb-3">
                      <MapPin className="text-default me-2" />
                      {selectedEvent.extendedProps.location}
                    </p>
                  )}
                  {selectedEvent.extendedProps?.description && (
                    <div className="mb-3">
                      <h6 className="fw-medium mb-2">Description:</h6>
                      <p className="text-muted">
                        {selectedEvent.extendedProps.description}
                      </p>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={handleDeleteEvent}
                    disabled={isDeletingEvent}
                  >
                    <Trash2 className="me-1" size={16} />
                    {isDeletingEvent ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditEvent}
                  >
                    <Edit2 className="me-1" size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {showEditEventModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Reminder</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowEditEventModal(false)}
                  >
                    <X />
                  </button>
                </div>
                <form onSubmit={handleUpdateEvent}>
                  <div className="modal-body">
                    {errorMessage && (
                      <div className="alert alert-danger mb-3">
                        {errorMessage}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">Reminder Name*</label>
                          <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={editEvent.title}
                            onChange={handleEditInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Start Date*</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            name="start"
                            value={editEvent.start}
                            onChange={handleEditInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">End Date*</label>
                          <input
                            type="datetime-local"
                            className="form-control"
                            name="end"
                            value={editEvent.end}
                            onChange={handleEditInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Reminder Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={editEvent.location}
                            onChange={handleEditInputChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Color</label>
                          <select
                            className="form-select"
                            name="color"
                            value={editEvent.color}
                            onChange={handleEditInputChange}
                          >
                            <option value="#6C63FF">Purple</option>
                            <option value="#4CAF50">Green</option>
                            <option value="#2196F3">Blue</option>
                            <option value="#FF9800">Orange</option>
                            <option value="#F44336">Red</option>
                          </select>
                        </div>
                        <div className="mb-0">
                          <label className="form-label">Descriptions</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            name="description"
                            value={editEvent.description}
                            onChange={handleEditInputChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowEditEventModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isUpdatingEvent}
                    >
                      {isUpdatingEvent ? "Updating..." : "Update Reminder"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default CalenderReminder;
