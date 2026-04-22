import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultEmployerAvatar from "../../assets/employer/assets/img/profiles/avatar-14.jpg";
import defaultEmployeeAvatar from "../../assets/employer/assets/img/profiles/avatar-29.jpg";

const EmployeerChatSidebar = ({ isOpen, onClose, candidate }) => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isSendingAudio, setIsSendingAudio] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusNotes, setStatusNotes] = useState("");
  const [currentApplication, setCurrentApplication] = useState(null);
  const [employerProfile, setEmployerProfile] = useState(null);
  const [interviewType, setInterviewType] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [onlineLink, setOnlineLink] = useState("");
  const [venue, setVenue] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const chatBodyRef = useRef(null);

  const employerData = JSON.parse(localStorage.getItem("employerData"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clean up media resources when component unmounts
  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
      audioChunks.forEach((chunk) => {
        URL.revokeObjectURL(URL.createObjectURL(chunk));
      });
    };
  }, [mediaRecorder, audioChunks]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchEmployerJobs = async () => {
    try {
      const token = localStorage.getItem("employerToken");
      const response = await axios.get(
        `https://api.edprofio.com/employer/fetchjob/${employerData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs(response.data || []);

      // If candidate has a jobId, set the selected job title
      if (candidate?.jobId && response.data) {
        const job = response.data.find((j) => j._id === candidate.jobId);
        if (job) {
          setSelectedJobTitle(job.jobTitle);
        }
      }
    } catch (err) {
      console.error("Error fetching employer jobs:", err);
    }
  };

  const fetchEmployerDetails = async () => {
    try {
      const token = localStorage.getItem("employerToken");
      const response = await axios.get(
        `https://api.edprofio.com/employer/fetchemployer/${employerData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployerProfile(response.data);
    } catch (err) {
      console.error("Error fetching employer details:", err);
    }
  };

  // Fetch employee details when component mounts or candidate changes
  useEffect(() => {
    if (isOpen && candidate?.applicantId) {
      fetchEmployeeDetails(candidate.applicantId);
    }
  }, [isOpen, candidate?.applicantId]);

  // Fetch chat messages when component mounts or candidate changes
  useEffect(() => {
    if (isOpen && candidate) {
      fetchChatMessages();
    }
  }, [isOpen, candidate]);

  useEffect(() => {
    if (isOpen && employerData?._id) {
      fetchEmployerDetails();
      fetchEmployerJobs();
    }
  }, [isOpen, employerData?._id]);

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const token = localStorage.getItem("employerToken");
      const response = await axios.get(
        `https://api.edprofio.com/fetchemployee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployeeDetails(response.data);
    } catch (err) {
      console.error("Error fetching employee details:", err);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isOpen && candidate?.applicantId && employerData?._id) {
      // Initial fetch
      fetchChatMessages();

      // Set up polling every 2 seconds
      intervalId = setInterval(fetchChatMessages, 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, candidate?.applicantId, candidate?.jobId, employerData?._id]);

  const fetchChatMessages = async () => {
    try {
      if (!candidate?.applicantId || !employerData?._id) return;

      const token = localStorage.getItem("employerToken");
      const response = await axios.get(
        `https://api.edprofio.com/employer/view`,
        {
          params: {
            employeeId: candidate.applicantId,
            employerId: employerData._id,
            jobId: candidate.jobId || "general",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        const chat = response.data;

        if (chat && chat.messages) {
          // Only update if messages have changed
          setMessages((prevMessages) => {
            if (
              prevMessages.length !== chat.messages.length ||
              (prevMessages.length > 0 &&
                prevMessages[prevMessages.length - 1].id !==
                  chat.messages[chat.messages.length - 1]._id)
            ) {
              return chat.messages.map((msg) => ({
                id: msg._id || Date.now(),
                sender:
                  msg.sender === "employer"
                    ? "You"
                    : candidate.firstName || candidate.name || "Candidate",
                avatar:
                  msg.sender === "employer"
                    ? employerData.profilePicture ||
                      "employer/assets/img/profiles/avatar-14.jpg"
                    : employeeDetails?.userProfilePic ||
                      candidate.avatar ||
                      "employer/assets/img/profiles/avatar-29.jpg",
                time: new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                content: msg.message,
                isMe: msg.sender === "employer",
                ...(msg.mediaUrl && { mediaUrl: msg.mediaUrl }),
                ...(msg.mediaType && {
                  mediaType:
                    msg.mediaType === "video" ? "audio" : msg.mediaType,
                }),
              }));
            }
            return prevMessages;
          });

          if (!chatId) {
            setChatId(chat._id);
          }
        } else {
          setMessages([]);
          setChatId(chat._id);
        }
      }
    } catch (err) {
      console.error("Error fetching chat messages:", err);
      if (err.response?.status === 404) {
        setMessages([]);
        setChatId(null);
      } else {
        setError("Failed to load chat messages");
      }
    }
  };
  const handleSendMessage = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (
      (newMessage.trim() === "" && !fileInputRef.current?.files?.length) ||
      !candidate
    )
      return;

    try {
      const token = localStorage.getItem("employerToken");
      const formData = new FormData();
      formData.append("employeeId", candidate.applicantId);
      formData.append("employerId", employerData._id);
      formData.append("jobId", candidate.jobId || "general"); // Use 'general' if no jobId
      formData.append("message", newMessage);
      formData.append("sender", "employer");
      formData.append("employerName", employerData.companyName);
      formData.append("employerImage", employerData.profilePicture);
      formData.append("employeeName", candidate.firstName || candidate.name);
      formData.append("employeeImage", candidate.avatar);

      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.append("file", file);
        formData.append("fileType", file.type);
      }

      const newMsg = {
        id: Date.now(),
        sender: "You",
        avatar:
          employerData.profilePicture ||
          "employer/assets/img/profiles/avatar-14.jpg",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content:
          newMessage ||
          (file
            ? `[${file.type.startsWith("image") ? "Image" : "Audio"}]`
            : ""),
        isMe: true,
        ...(file && {
          mediaUrl: file.type.startsWith("audio")
            ? URL.createObjectURL(file)
            : file.type.startsWith("image")
            ? URL.createObjectURL(file)
            : null,
          mediaType: file.type.startsWith("audio")
            ? "audio"
            : file.type.startsWith("image")
            ? "image"
            : "file",
        }),
      };

      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
      setActiveDropdown(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      const response = await axios.post(
        "https://api.edprofio.com/employer/sendchats",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success && !chatId && response.data.chatId) {
        setChatId(response.data.chatId);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const createCalendarEvent = async (eventData) => {
    try {
      const token = localStorage.getItem("employerToken");
      const response = await axios.post(
        "https://api.edprofio.com/employer/createcalender",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating calendar event:", error);
      throw error;
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleUpdateStatus = async () => {
    // Validate required fields
    if (!selectedStatus) {
      showErrorToast("Please select a status");
      return;
    }

    if (!selectedJobTitle) {
      showErrorToast("Please select a job title");
      return;
    }

    // Find the selected job from the jobs list
    const selectedJob = jobs.find((job) => job.jobTitle === selectedJobTitle);
    if (!selectedJob) {
      showErrorToast("Selected job not found");
      return;
    }

    const appliedJob =
      jobs.find((job) =>
        job.applications?.some(
          (app) => app.applicantId === candidate.applicantId
        )
      ) || jobs.find((job) => job.jobTitle === selectedJobTitle);

    if (!appliedJob) {
      showErrorToast("No job found for this candidate");
      return;
    }

    if (selectedStatus === "Interview Scheduled") {
      if (!interviewType || !interviewDate || !interviewTime) {
        showErrorToast("Please fill all interview details");
        return;
      }
      if (interviewType === "online" && !onlineLink) {
        showErrorToast("Please provide online meeting link");
        return;
      }
      if (interviewType === "offline" && !venue) {
        showErrorToast("Please provide venue details");
        return;
      }
    }

    try {
      const token = localStorage.getItem("employerToken");

      // First, check if the candidate has already applied for this job
      const isApplied = selectedJob.applications?.some(
        (app) => app.applicantId === candidate.applicantId
      );

      if (!isApplied) {
        // If not applied, first apply the candidate to the job
        try {
          const applyResponse = await axios.post(
            `https://api.edprofio.com/${selectedJob._id}/apply`,
            {
              firstName: candidate.firstName || candidate.name,
              email: candidate.email,
              phone: candidate.phone,
              experience: candidate.experience || "",
              jobrole: candidate.jobrole || "",
              currentcity: candidate.currentcity || "",
              profileurl: candidate.profileurl || "",
              resume: candidate.resume || null,
              applicantId: candidate.applicantId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!applyResponse.data.success) {
            throw new Error("Failed to apply candidate to job");
          }
        } catch (applyError) {
          console.error("Error applying candidate:", applyError);
          showErrorToast(
            `Failed to apply candidate: ${
              applyError.response?.data?.message || applyError.message
            }`
          );
          return;
        }
      }

      // Now update the status
      const url = `https://api.edprofio.com/employer/updatefavorite/${selectedJob._id}/${candidate.applicantId}`;

      const requestBody = {
        status: selectedStatus,
        notes: statusNotes,
        jobId: selectedJob._id,
        jobTitle: selectedJobTitle,
        ...(selectedStatus === "Interview Scheduled" && {
          interviewDetails: {
            type: interviewType,
            date: interviewDate,
            time: interviewTime,
            ...(interviewType === "online" && { link: onlineLink }),
            ...(interviewType === "offline" && { venue: venue }),
            jobTitle: selectedJobTitle,
          },
        }),
      };

      const response = await axios.put(url, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // Create calendar event if interview is scheduled
        if (selectedStatus === "Interview Scheduled") {
          try {
            // Format the interview date and time
            const interviewDateTime = new Date(
              `${interviewDate}T${interviewTime}`
            );
            const endDateTime = new Date(
              interviewDateTime.getTime() + 60 * 60 * 1000
            ); // Add 1 hour

            // Format the location based on interview type
            const location = interviewType === "online" ? onlineLink : venue;

            // Create the event data in the required format
            const eventData = {
              employerId: employerData._id,
              title: `Interview for ${candidate.firstName || candidate.name}`,
              description:
                statusNotes || `Interview scheduled for ${selectedJobTitle}`,
              location: location,
              start: interviewDateTime.toISOString(),
              end: endDateTime.toISOString(),
              color: "#6C63FF",
              candidateId:candidate._id
            };

            await createCalendarEvent(eventData);
          } catch (calendarError) {
            console.error("Error creating calendar event:", calendarError);
            // Don't fail the whole operation if calendar event creation fails
          }
        }

        // Send automatic status update message with interview details if applicable
        await sendStatusUpdateMessage(selectedStatus);

        showSuccessToast("Status updated successfully!");

        // Reset form
        setShowStatusModal(false);
        setSelectedStatus("");
        setStatusNotes("");
        setInterviewType("");
        setInterviewDate("");
        setInterviewTime("");
        setOnlineLink("");
        setVenue("");
      } else {
        throw new Error(response.data.message || "Status update failed");
      }
    } catch (error) {
      console.error("Error in handleUpdateStatus:", error);
      showErrorToast(
        error.message || "Failed to update status. Please try again."
      );
    }
  };

  const sendStatusUpdateMessage = async (status) => {
    let statusMessage = `[Status Update] Job: ${selectedJobTitle}\n`;

    switch (status) {
      case "Selected":
        statusMessage +=
          'Your application status has been updated to "Selected"';
        break;
      case "Rejected":
        statusMessage +=
          'Your application status has been updated to "Rejected"';
        break;
      case "Hold":
        statusMessage += 'Your application status has been updated to "Hold"';
        break;
      case "Interview Scheduled":
        // Format start and end times
        const startTime = new Date(
          `${interviewDate}T${interviewTime}`
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const endTime = new Date(
          new Date(`${interviewDate}T${interviewTime}`).getTime() +
            60 * 60 * 1000
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        statusMessage += `Interview Scheduled Details:\n`;
        statusMessage += `Title: Interview for ${
          candidate.firstName || candidate.name
        }\n`;
        statusMessage += `Date: ${new Date(
          interviewDate
        ).toLocaleDateString()}\n`;
        statusMessage += `Start Time: ${startTime}\n`;
        statusMessage += `End Time: ${endTime}\n`;
        statusMessage += `Type: ${
          interviewType === "online" ? "Online" : "In-Person"
        }\n`;
        statusMessage += `Location: ${
          interviewType === "online" ? onlineLink : venue
        }\n`;
        statusMessage += `Description: ${
          statusNotes || "No additional notes provided"
        }`;
        break;
      default:
        statusMessage += `Your application status has been updated to "${status}"`;
    }

    try {
      const token = localStorage.getItem("employerToken");
      const formData = new FormData();
      formData.append("employeeId", candidate.applicantId);
      formData.append("employerId", employerData._id);
      formData.append("jobId", candidate.jobId || "general");
      formData.append("message", statusMessage);
      formData.append("sender", "employer");
      formData.append("employerName", employerData.companyName);
      formData.append("employerImage", employerData.profilePicture);
      formData.append("employeeName", candidate.firstName || candidate.name);
      formData.append("employeeImage", candidate.avatar);

      const newMsg = {
        id: Date.now(),
        sender: "You",
        avatar:
          employerData.profilePicture ||
          "employer/assets/img/profiles/avatar-14.jpg",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: statusMessage,
        isMe: true,
      };

      setMessages((prev) => [...prev, newMsg]);

      await axios.post(
        "https://api.edprofio.com/employer/sendchats",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error sending status update message:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let mediaUrl = null;
      if (file.type.startsWith("image/") || file.type.startsWith("audio/")) {
        mediaUrl = URL.createObjectURL(file);
      }

      const newMsg = {
        id: Date.now(),
        sender: "You",
        avatar:
          employerData.profilePicture ||
          "employer/assets/img/profiles/avatar-14.jpg",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: `[${file.type.startsWith("image") ? "Image" : "Audio"}]`,
        isMe: true,
        mediaUrl,
        mediaType: file.type.startsWith("image") ? "image" : "audio",
      };

      setMessages((prev) => [...prev, newMsg]);
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setRecording(true);
      setAudioChunks([]);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.start();
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Could not access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setRecording(false);
    }
  };

  useEffect(() => {
    if (!recording && audioChunks.length > 0 && !isSendingAudio) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audioFile = new File([audioBlob], "recording.wav", {
        type: "audio/wav",
        lastModified: Date.now(),
      });

      const newMsg = {
        id: Date.now(),
        sender: "You",
        avatar:
          employerData.profilePicture ||
          "employer/assets/img/profiles/avatar-14.jpg",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: "[Voice Message]",
        isMe: true,
        mediaUrl: audioUrl,
        mediaType: "audio",
      };

      setMessages((prev) => [...prev, newMsg]);
      setIsSendingAudio(true);

      const token = localStorage.getItem("employerToken");
      const formData = new FormData();
      formData.append("employeeId", candidate.applicantId);
      formData.append("employerId", employerData._id);
      formData.append("jobId", candidate.jobId || "general");
      formData.append("sender", "employer");
      formData.append("employerName", employerData.companyName);
      formData.append("employerImage", employerData.profilePicture);
      formData.append("employeeName", candidate.firstName || candidate.name);
      formData.append("employeeImage", candidate.avatar);
      formData.append("file", audioFile);
      formData.append("fileType", "audio/wav");

      axios
        .post("https://api.edprofio.com/employer/sendchats", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.success && !chatId && response.data.chatId) {
            setChatId(response.data.chatId);
          }
        })
        .catch((err) => {
          console.error("Error sending audio message:", err);
        })
        .finally(() => {
          setIsSendingAudio(false);
          setAudioChunks([]);
        });
    }
  }, [recording, audioChunks]);

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowStatusModal(true);
  };

  const renderMessageContent = (message) => {
    if (message.mediaUrl) {
      if (message.mediaType === "image") {
        return (
          <div>
            <img
              src={message.mediaUrl}
              alt="Uploaded content"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "8px",
                marginBottom: "5px",
              }}
            />
            {message.content && <div>{message.content}</div>}
          </div>
        );
      } else if (message.mediaType === "audio") {
        return (
          <div>
            <audio
              ref={audioRef}
              controls
              style={{ width: "100%" }}
              onPlay={() => console.log("Audio playing")}
              onError={(e) => console.error("Audio error:", e)}
            >
              <source src={message.mediaUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            {message.content && <div>{message.content}</div>}
          </div>
        );
      }
    }
    return message.content;
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="chat-sidebar open" style={sidebarStyles}>
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-sidebar open" style={sidebarStyles}>
      {/* Status Update Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Modal.Header closeButton>
          <Modal.Title>Update Candidate Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="Selected">Mark as Selected</option>
                <option value="Rejected">Mark as Rejected</option>
                <option value="Hold">Mark as Hold</option>
                <option value="Interview Scheduled">Schedule Interview</option>
              </Form.Control>
            </Form.Group>

            {/* Only show job title dropdown if candidate hasn't applied to any jobs */}
            {!jobs.some((job) =>
              job.applications?.some(
                (app) => app.applicantId === candidate.applicantId
              )
            ) && (
              <Form.Group className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  as="select"
                  className="form-select"
                  value={selectedJobTitle}
                  onChange={(e) => setSelectedJobTitle(e.target.value)}
                  required
                >
                  <option value="">Select Job Title</option>
                  {jobs.map((job) => (
                    <option key={job._id} value={job.jobTitle}>
                      {job.jobTitle}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            {selectedStatus === "Interview Scheduled" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Interview Type</Form.Label>
                  <Form.Control
                    as="select"
                    className="form-select"
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    required
                  >
                    <option value="">Select Interview Type</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interview Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Interview Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    required
                  />
                </Form.Group>

                {interviewType === "online" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Online Meeting Link</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter meeting link (Zoom, Google Meet, etc.)"
                      value={onlineLink}
                      onChange={(e) => setOnlineLink(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}

                {interviewType === "offline" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Venue</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter venue address"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      required
                    />
                  </Form.Group>
                )}
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Enter notes about this status change..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Chat Header */}
      <div className="chat-header" style={headerStyles}>
        <div className="user-details" style={userDetailsStyles}>
          <div className="d-xl-none me-2">
            <a
              className="text-muted chat-close"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <i className="fas fa-arrow-left"></i>
            </a>
          </div>
          <div className="avatar avatar-lg online flex-shrink-0">
            <img
              src={
                employeeDetails?.userProfilePic ||
                candidate?.avatar ||
                defaultEmployeeAvatar
              }
              className="rounded-circle"
              alt="image"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </div>
          <div className="ms-2 overflow-hidden flex-grow-1">
            <h6 className="mb-1">
              {candidate?.firstName || candidate?.name || "Candidate"}
            </h6>
            <span className="last-seen text-success small">Online</span>
          </div>
          <div className="chat-options">
            <ul className="d-flex list-unstyled mb-0 align-items-center">
              <li>
                <a
                  href="javascript:void(0)"
                  className="btn btn-sm me-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Search"
                >
                  <i className="ti ti-search"></i>
                </a>
              </li>
              <li>
                <div className="dropdown me-2">
                  <a className="btn btn-sm" href="#" data-bs-toggle="dropdown">
                    <i className="ti ti-dots-vertical"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-2">
                    <li>
                      <a href="#" className="dropdown-item small">
                        <i className="ti ti-volume-off me-2"></i>Mute
                        Notification
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item small">
                        <i className="ti ti-clock-hour-4 me-2"></i>Disappearing
                        Message
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item small">
                        <i className="ti ti-clear-all me-2"></i>Clear Message
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item small">
                        <i className="ti ti-trash me-2"></i>Delete Chat
                      </a>
                    </li>
                    <li>
                      <a href="#" className="dropdown-item small">
                        <i className="ti ti-ban me-2"></i>Block
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="btn btn-sm chat-close-btn"
                  onClick={onClose}
                >
                  <i className="ti ti-x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body" style={chatBodyStyles} ref={chatBodyRef}>
        <div className="messages">
          <div className="chats">
            {messages.length > 0 ? (
              messages.map((message) => (
                <React.Fragment key={message.id}>
                  {message.isMe ? (
                    <div
                      className="chats chats-right mb-3"
                      style={myMessageStyles}
                    >
                      <div
                        className="chat-content"
                        style={myMessageContentStyles}
                      >
                        <div className="chat-info">
                          <div
                            className="message-content"
                            style={myMessageBubbleStyles}
                          >
                            {renderMessageContent(message)}
                            <div
                              className="chat-actions"
                              style={myMessageActionsStyles}
                            >
                              <a
                                href="#"
                                className="btn btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveDropdown(
                                    activeDropdown === message.id
                                      ? null
                                      : message.id
                                  );
                                }}
                                style={threeDotsButtonStyles}
                              >
                                <i
                                  className="ti ti-dots-vertical"
                                  style={{ fontSize: "14px" }}
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name text-end mt-1">
                          <small className="text-muted">
                            {message.sender}{" "}
                            <i
                              className="ti ti-circle-filled"
                              style={{ fontSize: "4px" }}
                            ></i>{" "}
                            {message.time}
                            <span className="msg-read text-success ms-1">
                              <i className="ti ti-checks"></i>
                            </span>
                          </small>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <img
                          src={
                            employerProfile?.userProfilePic ||
                            employerData.profilePicture ||
                            defaultEmployerAvatar
                          }
                          className="rounded-circle"
                          alt="image"
                          style={avatarStyles}
                        />
                      </div>
                      {activeDropdown === message.id && (
                        <div
                          ref={dropdownRef}
                          className="dropdown-menu show p-3"
                          style={dropdownMenuStyles}
                        >
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-heart me-2"></i>Reply
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-pinned me-2"></i>Forward
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-file-export me-2"></i>Copy
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-heart me-2"></i>Mark as
                              Favourite
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-trash me-2"></i>Delete
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-check me-2"></i>Mark as Unread
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-box-align-right me-2"></i>
                              Archive Chat
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-pinned me-2"></i>Pin Chat
                            </a>
                          </li>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="chats mb-3" style={theirMessageStyles}>
                      <div className="chat-avatar me-2">
                        <img
                          src={
                            employeeDetails?.userProfilePic ||
                            candidate?.avatar ||
                            defaultEmployeeAvatar
                          }
                          className="rounded-circle"
                          alt="image"
                          style={avatarStyles}
                        />
                      </div>
                      <div
                        className="chat-content"
                        style={theirMessageContentStyles}
                      >
                        <div className="chat-info">
                          <div
                            className="message-content"
                            style={theirMessageBubbleStyles}
                          >
                            {renderMessageContent(message)}
                            <div
                              className="chat-actions"
                              style={theirMessageActionsStyles}
                            >
                              <a
                                href="#"
                                className="btn btn-sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActiveDropdown(
                                    activeDropdown === message.id
                                      ? null
                                      : message.id
                                  );
                                }}
                                style={threeDotsButtonStyles}
                              >
                                <i
                                  className="ti ti-dots-vertical"
                                  style={{ fontSize: "14px" }}
                                ></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="chat-profile-name mt-1">
                          <small className="text-muted">
                            {message.sender}{" "}
                            <i
                              className="ti ti-circle-filled"
                              style={{ fontSize: "4px" }}
                            ></i>{" "}
                            {message.time}
                          </small>
                        </div>
                      </div>
                      {activeDropdown === message.id && (
                        <div
                          ref={dropdownRef}
                          className="dropdown-menu show p-3"
                          style={theirDropdownMenuStyles}
                        >
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-heart me-2"></i>Reply
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-pinned me-2"></i>Forward
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-file-export me-2"></i>Copy
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-heart me-2"></i>Mark as
                              Favourite
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-trash me-2"></i>Delete
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-check me-2"></i>Mark as Unread
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-box-align-right me-2"></i>
                              Archive Chat
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item small" href="#">
                              <i className="ti ti-pinned me-2"></i>Pin Chat
                            </a>
                          </li>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="text-center py-4">
                <p>No messages yet. Start the conversation!</p>
              </div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chats" style={typingIndicatorStyles}>
                <div className="chat-avatar me-2">
                  <img
                    src={
                      employeeDetails?.userProfilePic ||
                      candidate?.avatar ||
                      "employer/assets/img/profiles/avatar-29.jpg"
                    }
                    className="rounded-circle"
                    alt="image"
                    style={avatarStyles}
                  />
                </div>
                <div className="chat-content" style={theirMessageContentStyles}>
                  <div className="chat-profile-name">
                    <small className="text-muted">
                      {candidate?.firstName || candidate?.name || "Candidate"}{" "}
                      <i
                        className="ti ti-circle-filled"
                        style={{ fontSize: "4px" }}
                      ></i>{" "}
                      Now
                    </small>
                  </div>
                  <div
                    className="message-content"
                    style={theirMessageBubbleStyles}
                  >
                    <span className="animate-typing">
                      is typing
                      <span className="dot" style={typingDotStyles}></span>
                      <span
                        className="dot"
                        style={{ ...typingDotStyles, animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="dot"
                        style={{ ...typingDotStyles, animationDelay: "0.4s" }}
                      ></span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chat-footer" style={footerStyles}>
        <form className="footer-form" onSubmit={handleSendMessage}>
          <div className="chat-footer-wrap" style={footerFormStyles}>
            <div className="form-item">
              <button
                type="button"
                className={`btn btn-sm rounded-circle ${
                  recording ? "btn-danger" : "btn-light"
                }`}
                onClick={toggleRecording}
                style={footerButtonStyles}
              >
                <i
                  className={`ti ti-${recording ? "square" : "microphone"}`}
                ></i>
              </button>
            </div>

            <div className="form-wrap flex-grow-1">
              <input
                type="text"
                className="form-control"
                placeholder="Type Your Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={messageInputStyles}
              />
            </div>

            <div className="form-item position-relative">
              <button
                type="button"
                className="btn btn-light btn-sm rounded-circle"
                style={footerButtonStyles}
                onClick={() => fileInputRef.current.click()}
              >
                <i className="ti ti-photo-plus"></i>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="position-absolute opacity-0"
                style={fileInputStyles}
                onChange={handleFileChange}
                accept="image/*,audio/*"
              />
            </div>

            <div className="form-item">
              <div className="dropdown">
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle"
                  data-bs-toggle="dropdown"
                  style={footerButtonStyles}
                >
                  <i className="ti ti-dots-vertical"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end p-2">
                  <a
                    href="#"
                    className="dropdown-item small"
                    onClick={() => handleStatusChange("Selected")}
                  >
                    <i className="ti ti-check me-2"></i>Mark as Selected
                  </a>
                  <a
                    href="#"
                    className="dropdown-item small"
                    onClick={() => handleStatusChange("Rejected")}
                  >
                    <i className="ti ti-x me-2"></i>Mark as Rejected
                  </a>
                  <a
                    href="#"
                    className="dropdown-item small"
                    onClick={() => handleStatusChange("Hold")}
                  >
                    <i className="ti ti-hand-stop me-2"></i>Mark as Hold
                  </a>
                  <a
                    href="#"
                    className="dropdown-item small"
                    onClick={() => handleStatusChange("Interview Scheduled")}
                  >
                    <i className="ti ti-calendar me-2"></i>Schedule Interview
                  </a>
                </div>
              </div>
            </div>
            <div className="form-btn">
              <button
                className="btn btn-primary btn-sm rounded-circle"
                type="submit"
                style={footerButtonStyles}
              >
                <i className="ti ti-send"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles remain the same as in your original component
const sidebarStyles = {
  position: "fixed",
  top: "0",
  right: "0",
  width: "400px",
  height: "100vh",
  backgroundColor: "#fff",
  boxShadow: "-2px 0 15px rgba(0, 0, 0, 0.15)",
  zIndex: 1050,
  transition: "right 0.3s ease-in-out",
  display: "flex",
  flexDirection: "column",
  borderLeft: "1px solid #e0e0e0",
};

const headerStyles = {
  flexShrink: 0,
  borderBottom: "1px solid #e0e0e0",
  padding: "15px",
};

const userDetailsStyles = {
  display: "flex",
  alignItems: "center",
};

const chatBodyStyles = {
  flex: 1,
  overflowY: "auto",
  padding: "15px",
  maxHeight: "calc(100vh - 140px)",
};

const myMessageStyles = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  position: "relative",
};

const myMessageContentStyles = {
  maxWidth: "70%",
  marginRight: "10px",
};

const myMessageBubbleStyles = {
  backgroundColor: "#007bff",
  color: "white",
  padding: "10px 15px",
  borderRadius: "18px 18px 4px 18px",
  position: "relative",
};

const myMessageActionsStyles = {
  position: "absolute",
  left: "-30px",
  top: "50%",
  transform: "translateY(-50%)",
};

const theirMessageStyles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  position: "relative",
};

const theirMessageContentStyles = {
  maxWidth: "70%",
};

const theirMessageBubbleStyles = {
  backgroundColor: "#f8f9fa",
  color: "#333",
  padding: "10px 15px",
  borderRadius: "18px 18px 18px 4px",
  position: "relative",
};

const theirMessageActionsStyles = {
  position: "absolute",
  right: "-30px",
  top: "50%",
  transform: "translateY(-50%)",
};

const dropdownMenuStyles = {
  position: "absolute",
  left: "30px",
  top: "316%",
  transform: "translateY(-50%)",
  zIndex: 1100,
  minWidth: "200px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  backgroundColor: "white",
  borderRadius: "8px",
};

const theirDropdownMenuStyles = {
  position: "absolute",
  right: "20px",
  top: "226%",
  transform: "translateY(-50%)",
  zIndex: 1100,
  minWidth: "200px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  backgroundColor: "white",
  borderRadius: "8px",
};

const typingIndicatorStyles = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const avatarStyles = {
  width: "35px",
  height: "35px",
  objectFit: "cover",
};

const threeDotsButtonStyles = {
  color: "#007bff",
  backgroundColor: "white",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const typingDotStyles = {
  display: "inline-block",
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  backgroundColor: "#333",
  marginLeft: "2px",
  animation: "typing 1.4s infinite both",
};

const footerStyles = {
  flexShrink: 0,
  borderTop: "1px solid #e0e0e0",
  padding: "15px",
};

const footerFormStyles = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const footerButtonStyles = {
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const messageInputStyles = {
  borderRadius: "25px",
  padding: "10px 15px",
};

const fileInputStyles = {
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
};

export default EmployeerChatSidebar;
