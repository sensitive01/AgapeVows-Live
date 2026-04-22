import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
  FaClock,
  FaDirections,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { getAllEvents } from "../../api/axiosService/userSignUpService";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchState, setSearchState] = useState("");
  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
    city: "",
    state: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("Active");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";

          const state = data.address.state || "";

          setUserLocation({ lat, lng, city, state });
        } catch (err) {
          console.log("Error getting location details", err);
        }
      });
    }

    fetchEvents(); // 👈 இதை கீழே define பண்ணுவோம்
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getAllEvents();

      if (response.data && response.data.success) {
        setEvents(response.data.data);
      } else if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  // Filter and Sort Events
  const getFilteredAndSortedEvents = () => {
    let filtered = [...events];
    const now = new Date();

    // 1️⃣ Filter by Search
    if (searchState.trim()) {
      const query = searchState.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          (event.state && event.state.toLowerCase().includes(query)) ||
          (event.location && event.location.toLowerCase().includes(query))
      );
    }

    // 2️⃣ Filter by User Location (if no search input)
    if (!searchState && userLocation?.state) {
      filtered = filtered.filter((event) => {
        const eventState = event.state?.toLowerCase() || "";
        const eventLocation = event.location?.toLowerCase() || "";
        const userState = userLocation.state.toLowerCase();
        const userCity = userLocation.city.toLowerCase();

        return eventState === userState || eventLocation === userCity;
      });
    }

    // 3️⃣ Filter by Active/Inactive Tab
    if (activeTab === "Active") {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        return event.status === "Active" && eventDate >= now;
      });
    } else {
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        return event.status === "Inactive" || eventDate < now;
      });
    }

    // 4️⃣ Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return activeTab === "Active" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  };

  const displayedEvents = getFilteredAndSortedEvents();

  const handleSearchChange = (e) => {
    setSearchState(e.target.value);
  };

  const formatEventDate = (dateString, includeTime = true) => {
    if (!dateString) return { date: "TBD", time: "TBD", fullDate: null };
    const dateObj = new Date(dateString);
    const date = dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = includeTime
      ? dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";

    return { date, time, fullDate: dateObj };
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const closeDetailsModal = () => {
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
        <LayoutComponent />
      </div>

      <div className="pt-32">
        {/* SECTION 1: HEADER BANNER (Exact Screenshot Color Match) */}
       <section className="relative overflow-hidden bg-gradient-to-r from-[#6b6b6b] to-[#3f3f3f] py-20 shadow-lg z-20">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.2em] text-[#ffc107] uppercase">
              #1 Wedding Website
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 flex flex-wrap justify-center gap-x-4">
              <span className="text-[#17D1AC]">Events</span>
              <span className="text-white">&</span>
              <span className="text-[#56CCF2]">Gatherings</span>
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-medium opacity-90">
              Discover and join celebrations, gatherings, and special occasions near you.
            </p>
          </div>
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </section>

        {/* SECTION 2: SEARCH & CONTENT BLOCK */}
        <section className="bg-gray-50 flex-grow pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full pt-16">
          {/* Page Title & Search Section */}
          <div className="mb-12 text-center">
            <div className="max-w-xl mx-auto relative group mb-8 transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                <FaSearch className="text-gray-400 group-focus-within:text-purple-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by locations (e.g., Kerala, Bengaluru)..."
                value={searchState}
                onChange={handleSearchChange}
                className="block w-full pl-12 pr-6 py-3.5 border border-gray-100 rounded-full bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-lg focus:shadow-xl transition-all duration-300 text-base font-medium"
              />
            </div>

            {/* TABS */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex shadow-inner">
                <button
                  onClick={() => setActiveTab("Active")}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none ${activeTab === "Active"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                >
                  Upcoming Events
                </button>
                <button
                  onClick={() => setActiveTab("Inactive")}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none ${activeTab === "Inactive"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                >
                  Past / Inactive Events
                </button>
              </div>
            </div>

            {userLocation && !searchState && (
              <div className="mt-[-20px] mb-6 flex items-center justify-center text-xs text-green-600 font-medium">
                <FaMapMarkerAlt className="mr-1" />
                Location detected. Showing events from your city & state.
              </div>
            )}
          </div>

          {/* Events Grid/List */}
          <div className="space-y-6 md:space-y-8">
            {displayedEvents.length > 0 ? (
              displayedEvents.map((event) => {
                const { date, time } = formatEventDate(event.date);
                const isActiveTab = activeTab === "Active";

                return (
                  <div
                    key={event._id}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col md:flex-row group"
                  >
                    {/* Image Container - Responsive sizing */}
                    <div className="md:w-2/5 lg:w-1/3 relative h-auto flex-shrink-0">
                      <img
                        src={event.image || "https://via.placeholder.com/600x400?text=Event+Image"}
                        alt={event.name}
                        className="w-full h-auto object-contain rounded-l-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Status Badge */}
                      {activeTab === "Active" ? (
                        <span className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="absolute top-4 left-4 bg-gray-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          PAST / INACTIVE
                        </span>
                      )}

                      {/* Mobile Only: Text Overlay for Title on Image */}
                      <div className="absolute bottom-4 left-4 right-4 md:hidden text-white">
                        <h3 className="text-xl font-bold truncate shadow-black drop-shadow-md">
                          {event.name}
                        </h3>
                        <p className="text-sm opacity-90 flex items-center">
                          <FaCalendarAlt className="mr-1.5 size-3" /> {date}
                        </p>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col">
                      {/* Desktop Date/Time Row */}
                      <div className="hidden md:flex flex-wrap gap-4 mb-4 text-sm font-medium text-gray-500">
                        <div
                          className={`flex items-center px-3 py-1 rounded-md ${isActiveTab ? "text-purple-600 bg-purple-50" : "text-gray-600 bg-gray-100"}`}
                        >
                          <FaCalendarAlt className="mr-2" />
                          {date}
                        </div>
                        <div className="flex items-center bg-gray-50 px-3 py-1 rounded-md">
                          <FaClock className="mr-2" />
                          {time}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="mb-4">
                        <h2
                          className={`hidden md:block text-2xl font-bold mb-2 transition-colors duration-200 ${isActiveTab ? "text-gray-900 group-hover:text-purple-600" : "text-gray-600"}`}
                        >
                          {event.name}
                        </h2>
                        <div className="flex items-start text-gray-600 mb-3">
                          <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0 text-gray-400" />
                          <span className="font-medium">
                            {event.location}
                            {event.state && (
                              <span className="text-gray-400 font-normal">
                                , {event.state}
                              </span>
                            )}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-2 lg:line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      {/* Actions & Contact */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Contact Info (Displayed on card as requested) */}
                        <div className="flex flex-col sm:items-start w-full sm:w-auto text-sm">
                          <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg mb-2 sm:mb-0 w-full sm:w-auto">
                            <span className="font-semibold mr-2 text-gray-900">
                              Contact:
                            </span>
                            {event.contact}
                          </div>
                          {event.email && (
                            <div className="flex items-center text-gray-600 px-3 py-1 text-xs">
                              <span className="mr-2">Email:</span> {event.email}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          {event.mapLink && (
                            <a
                              href={event.mapLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-purple-200 text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors text-sm"
                            >
                              <FaDirections /> Directions
                            </a>
                          )}
                          <button
                            onClick={() => handleViewDetails(event)}
                            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 font-medium rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all text-sm ${isActiveTab ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                          >
                            View Details{" "}
                            <FaExternalLinkAlt className="text-xs opacity-70" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <FaSearch className="text-4xl text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activeTab === "Active"
                    ? "No Upcoming Events Found"
                    : "No Past Events Found"}
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  We couldn't find any{" "}
                  {activeTab === "Active" ? "upcoming" : "past"} events matching
                  {searchState}.
                </p>
                <button
                  onClick={() => setSearchState("")}
                  className="text-purple-600 font-semibold hover:text-purple-800 hover:underline transition-colors"
                >
                  Clear Search & Show All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-[150] overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background Overlay */}
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={closeDetailsModal}
              ></div>

              {/* Modal Panel */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start flex-col">
                    {selectedEvent.image && (
                      <div className="w-full mb-4 rounded-lg">
                        <img
                          src={selectedEvent.image}
                          alt={selectedEvent.name}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}

                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3
                        className="text-2xl leading-6 font-bold text-gray-900 mb-2"
                        id="modal-title"
                      >
                        {selectedEvent.name}
                      </h3>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-purple-600" />{" "}
                          {formatEventDate(selectedEvent.date).date}{" "}
                          {formatEventDate(selectedEvent.date).time}
                        </span>
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-purple-600" />{" "}
                          {selectedEvent.location}, {selectedEvent.state}
                        </span>

                        {/* Show Active/Inactive status in modal too */}
                        {selectedEvent.status === "Active" &&
                          new Date(selectedEvent.date) >= new Date() ? (
                          <span className="flex items-center text-green-600 font-bold text-xs px-2 py-0.5 bg-green-50 rounded-full border border-green-200">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="flex items-center text-gray-500 font-bold text-xs px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                            INACTIVE
                          </span>
                        )}
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mb-4 text-sm text-gray-700">
                        <strong>Church / Venue:</strong>{" "}
                        {selectedEvent.churchName}
                      </div>

                      <div className="mt-2 text-sm text-gray-600 text-justify">
                        <p className="whitespace-pre-wrap">
                          {selectedEvent.description}
                        </p>
                      </div>

                      {selectedEvent.details && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Additional Details
                          </h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">
                            {selectedEvent.details}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                          Contact Information
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">
                              Phone:
                            </span>{" "}
                            {selectedEvent.contact}
                          </div>
                          {selectedEvent.email && (
                            <div>
                              <span className="font-semibold text-gray-700">
                                Email:
                              </span>{" "}
                              {selectedEvent.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-end sm:gap-3">
                  {selectedEvent.mapLink && (
                    <a
                      href={selectedEvent.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center items-center rounded-md border border-purple-200 shadow-sm px-4 py-2 bg-white text-base font-medium text-purple-700 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto sm:text-sm mb-3 sm:mb-0"
                    >
                      <FaDirections className="mr-2" /> Get Directions
                    </a>
                  )}
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto sm:text-sm"
                    onClick={closeDetailsModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

          </section>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default Events;
