import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import defaultEmployeeAvatar from "../../../assets/employer-admin/assets/img/profiles/avatar-01.jpg";
import defaultEmployerAvatar from "../../../assets/employer-admin/assets/img/profiles/avatar-14.jpg";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";

const AdminSupport = () => {
  const VITE_BASE_URL = "https://api.edprofio.com";
  const [employerAdminData, setEmployerAdminData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioRecorderRef = useRef(null);

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("EmployerAdminToken");
  };

  // Get employer admin data from localStorage on component mount
  useEffect(() => {
    const storedEmployerAdminData = localStorage.getItem("EmployerAdminData");
    if (storedEmployerAdminData) {
      const parsedData = JSON.parse(storedEmployerAdminData);
      setEmployerAdminData(parsedData);
      fetchChats(parsedData._id);
    }
  }, []);

  // Fetch chats for the employer admin
  const fetchChats = async (employerAdminId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${VITE_BASE_URL}/employer/employer/${employerAdminId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const enhancedChats = await Promise.all(
        response.data.data.map(async (chat) => {
          try {
            const employeeResponse = await axios.get(
              `${VITE_BASE_URL}/fetchemployee/${chat.employeeId}`,
              {
                headers: {
                  Authorization: `Bearer ${getToken()}`,
                },
              }
            );

            return {
              ...chat,
              employeeName: employeeResponse.data.userName,
              employeeImage: employeeResponse.data.userProfilePic,
              unreadCount: chat.unreadCount || 0,
            };
          } catch (error) {
            console.error("Error fetching employee data:", error);
            return {
              ...chat,
              employeeName: "Unknown Employee",
              employeeImage: "assets/img/profiles/avatar-01.jpg",
              unreadCount: 0,
            };
          }
        })
      );

      setChats(enhancedChats);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setIsLoading(false);
    }
  };

  // Fetch employee data when a chat is selected
  const fetchEmployeeData = async (employeeId) => {
    try {
      const response = await axios.get(
        `${VITE_BASE_URL}/fetchemployee/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // Mark messages as read when chat is selected
  const markMessagesAsRead = async (employeeId, jobId) => {
    try {
      await axios.post(
        `${VITE_BASE_URL}/employer/mark-as-read`,
        {
          employeeId,
          employerId: employerAdminData._id,
          jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      // Update the chats to reflect the read status
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.employeeId === employeeId && chat.jobId === jobId
            ? { ...chat, unreadCount: 0 }
            : chat
        )
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // Fetch messages for the selected chat
  const fetchMessages = async (employeeId, jobId) => {
    try {
      if (!employerAdminData) return;

      const response = await axios.get(`${VITE_BASE_URL}/employer/view`, {
        params: {
          employeeId,
          employerId: employerAdminData._id,
          jobId,
        },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setMessages(response.data.messages || []);
      scrollToBottom();

      // Mark messages as read when fetched
      await markMessagesAsRead(employeeId, jobId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    fetchEmployeeData(chat.employeeId);
    fetchMessages(chat.employeeId, chat.jobId);
  };

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() && !file && !audioBlob) return;
    if (!selectedChat || !employerAdminData) return;

    const tempId = Date.now().toString();
    const tempMessage = {
      _id: tempId,
      message: newMessage,
      sender: "employer",
      createdAt: new Date().toISOString(),
      mediaUrl: file
        ? URL.createObjectURL(file)
        : audioBlob
        ? URL.createObjectURL(audioBlob)
        : null,
      mediaType: file
        ? file.type.startsWith("image")
          ? "image"
          : "file"
        : audioBlob
        ? "audio"
        : null,
    };

    // Add the message immediately to the UI
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");
    setFile(null);
    setAudioBlob(null);
    scrollToBottom();

    try {
      const formData = new FormData();
      formData.append("employeeId", selectedChat.employeeId);
      formData.append("employerId", employerAdminData._id);
      formData.append("jobId", selectedChat.jobId);
      formData.append("message", newMessage);
      formData.append("sender", "employer");

      if (file) {
        formData.append("file", file);
        formData.append(
          "fileType",
          file.type.startsWith("image") ? "image" : "file"
        );
      } else if (audioBlob) {
        formData.append("file", audioBlob, "audio.webm");
        formData.append("fileType", "audio");
      }

      await axios.post(`${VITE_BASE_URL}/employer/sendchats`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // Refresh messages to get the actual message from server
      fetchMessages(selectedChat.employeeId, selectedChat.jobId);
      fetchChats(employerAdminData._id);
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message if sending failed
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
    }
  };

  useEffect(() => {
    if (!selectedChat) return;

    const fetchAndUpdateMessages = async () => {
      try {
        const response = await axios.get(`${VITE_BASE_URL}/employer/view`, {
          params: {
            employeeId: selectedChat.employeeId,
            employerId: employerAdminData._id,
            jobId: selectedChat.jobId,
          },
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (response.data?.messages) {
          setMessages(response.data.messages);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchAndUpdateMessages();
    const intervalId = setInterval(fetchAndUpdateMessages, 2000);

    return () => clearInterval(intervalId);
  }, [selectedChat, employerAdminData]);

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type.startsWith("image") ? "image" : "file");
    }
  };

  // Start audio recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRecorderRef.current = new MediaRecorder(stream);
      const audioChunks = [];

      audioRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      audioRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setAudioBlob(audioBlob);
      };

      audioRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Stop audio recording
  const stopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatMessageDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    messageDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    if (messageDate.getTime() === today.getTime()) {
      return `Today, ${messageDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      })}`;
    } else if (messageDate.getTime() === yesterday.getTime()) {
      return `Yesterday, ${messageDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      })}`;
    } else {
      return messageDate.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) => {
    const employeeName = chat.employeeName || "";
    const latestMessage = chat.latestMessage?.message || "";

    return (
      employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      latestMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <AdminHeader />
      <div>
        <div className="content">
          <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-5"></div>

          <div
            className="chat-wrapper"
            style={{ display: "flex", height: "calc(100vh - 150px)" }}
          >
            {/* Left Sidebar - Chat List */}
            <div
              className="sidebar-group border border-dark shadow p-2"
              style={{
                width: "350px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                id="chats"
                className="sidebar-content active"
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div className="chat-search-header">
                    <div className="header-title d-flex align-items-center justify-content-between">
                      <h4 className="mb-3">Candidate Communications</h4>
                    </div>

                    {/* Chat Search */}
                    <div className="search-wrap">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search For Contacts or Messages"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="input-group-text">
                          <i className="ti ti-search"></i>
                        </span>
                      </div>
                    </div>
                    {/* /Chat Search */}
                  </div>
                </div>

                <div
                  className="sidebar-body chat-body"
                  id="chatsidebar"
                  style={{ flex: 1, overflowY: "auto" }}
                >
                  {/* Left Chat Title */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="chat-title">All Chats</h5>
                    <div className="chat-pin">
                      <i className="ti ti-pin me-2"></i>
                      <i className="ti ti-heart-filled text-warning"></i>
                    </div>
                  </div>
                  {/* /Left Chat Title */}

                  <div className="chat-users-wrap">
                    {/* Chat User List Items */}
                    {isLoading ? (
                      <div className="text-center py-4">Loading chats...</div>
                    ) : filteredChats.length === 0 ? (
                      <div className="text-center py-4">No chats found</div>
                    ) : (
                      filteredChats.map((chat, index) => (
                        <div
                          className={`chat-list ${
                            selectedChat?._id === chat._id ? "active" : ""
                          }`}
                          key={index}
                          onClick={() => handleChatSelect(chat)}
                        >
                          <a
                            href="javascript:void(0)"
                            className="chat-user-list"
                          >
                            <div className="avatar avatar-lg online me-2">
                              <img
                                src={
                                  chat.employeeImage || defaultEmployeeAvatar
                                }
                                className="rounded-circle"
                                alt={chat.employeeName}
                                onError={(e) => {
                                  e.target.src = defaultEmployeeAvatar;
                                }}
                              />
                            </div>
                            <div className="chat-user-info">
                              <div className="chat-user-msg">
                                <h6>
                                  {chat.employeeName || "Unknown Employee"}
                                </h6>
                                <p>
                                  {chat.latestMessage?.message ||
                                    "No messages yet"}
                                </p>
                              </div>
                              <div className="chat-user-time">
                                <span className="time">
                                  {new Date(chat.updatedAt).toLocaleTimeString(
                                    [],
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                                </span>
                                <div className="chat-pin">
                                  {index % 3 === 0 && (
                                    <i className="ti ti-pin me-2"></i>
                                  )}
                                  {index % 4 === 0 && (
                                    <i className="ti ti-heart-filled text-warning"></i>
                                  )}
                                  {chat.unreadCount > 0 && (
                                    <span className="count-message fs-12 fw-semibold">
                                      {chat.unreadCount}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </a>
                          <div className="chat-dropdown">
                            <a className="#" href="#" data-bs-toggle="dropdown">
                              <i className="ti ti-dots-vertical"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="ti ti-box-align-right me-2"></i>
                                  Archive Chat
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="ti ti-heart me-2"></i>Mark as
                                  Favourite
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="ti ti-check me-2"></i>Mark as
                                  Unread
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="ti ti-pinned me-2"></i>Pin Chats
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="ti ti-trash me-2"></i>Delete
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Chat Messages */}
            <div
              className="chat chat-messages show border border-dark shadow p-2"
              id="middle"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {selectedChat ? (
                <>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <div className="chat-header" style={{ flexShrink: 0 }}>
                      <div className="user-details">
                        <div className="d-xl-none">
                          <a className="text-muted chat-close me-2" href="#">
                            <i className="fas fa-arrow-left"></i>
                          </a>
                        </div>
                        <div className="avatar avatar-lg online flex-shrink-0">
                          <img
                            src={
                              selectedChat.employeeImage ||
                              "assets/img/profiles/avatar-01.jpg"
                            }
                            className="rounded-circle"
                            alt={selectedChat.employeeName}
                            onError={(e) => {
                              e.target.src =
                                "assets/img/profiles/avatar-01.jpg";
                            }}
                          />
                        </div>
                        <div className="ms-2 overflow-hidden">
                          <h6>
                            {selectedChat.employeeName || "Unknown Employee"}
                          </h6>
                          <span className="last-seen">Online</span>
                        </div>
                      </div>
                      <div className="chat-options">
                        <ul>
                          <li>
                            <a
                              href="javascript:void(0)"
                              className="btn chat-search-btn"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Search"
                            >
                              <i className="ti ti-search"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              className="btn no-bg"
                              href="#"
                              data-bs-toggle="dropdown"
                            >
                              <i className="ti ti-dots-vertical"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                              <li>
                                <a href="#" className="dropdown-item">
                                  <i className="ti ti-volume-off me-2"></i>Mute
                                  Notification
                                </a>
                              </li>
                              <li>
                                <a href="#" className="dropdown-item">
                                  <i className="ti ti-clock-hour-4 me-2"></i>
                                  Disappearing Message
                                </a>
                              </li>
                              <li>
                                <a href="#" className="dropdown-item">
                                  <i className="ti ti-clear-all me-2"></i>Clear
                                  Message
                                </a>
                              </li>
                              <li>
                                <a href="#" className="dropdown-item">
                                  <i className="ti ti-trash me-2"></i>Delete
                                  Chat
                                </a>
                              </li>
                              <li>
                                <a href="#" className="dropdown-item">
                                  <i className="ti ti-ban me-2"></i>Block
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      {/* Chat Search */}
                      <div className="chat-search search-wrap contact-search">
                        <form>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Contacts"
                            />
                            <span className="input-group-text">
                              <i className="ti ti-search"></i>
                            </span>
                          </div>
                        </form>
                      </div>
                      {/* /Chat Search */}
                    </div>

                    <div
                      className="chat-body chat-page-group"
                      style={{
                        flex: 1,
                        overflowY: "auto",
                        paddingBottom: "80px",
                      }}
                    >
                      <div className="messages">
                        {messages.length === 0 ? (
                          <div className="text-center py-4">
                            No messages yet. Start the conversation!
                          </div>
                        ) : (
                          messages.map((message, index) => {
                            const messageDate = new Date(
                              message.createdAt
                            ).toLocaleDateString([], {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            });
                            const prevMessageDate =
                              index > 0
                                ? new Date(
                                    messages[index - 1].createdAt
                                  ).toLocaleDateString([], {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : null;
                            const showDate =
                              index === 0 || messageDate !== prevMessageDate;

                            return (
                              <React.Fragment key={index}>
                                {showDate && (
                                  <div className="chat-line">
                                    <span className="chat-date">
                                      {formatMessageDate(message.createdAt)}
                                    </span>
                                  </div>
                                )}

                                <div
                                  className={`chats ${
                                    message.sender === "employer"
                                      ? "chats-right"
                                      : ""
                                  }`}
                                >
                                  {message.sender !== "employer" && (
                                    <div className="chat-avatar">
                                      <img
                                        src={
                                          selectedChat.employeeImage ||
                                          "assets/img/profiles/avatar-01.jpg"
                                        }
                                        className="rounded-circle"
                                        alt={selectedChat.employeeName}
                                        onError={(e) => {
                                          e.target.src =
                                            "assets/img/profiles/avatar-01.jpg";
                                        }}
                                      />
                                    </div>
                                  )}

                                  <div className="chat-content">
                                    <div className="chat-info">
                                      <div className="message-content">
                                        {message.mediaUrl ? (
                                          message.mediaType === "image" ? (
                                            <img
                                              src={
                                                message.mediaUrl ||
                                                defaultEmployeeAvatar
                                              }
                                              alt="Sent image"
                                              style={{
                                                maxWidth: "200px",
                                                maxHeight: "200px",
                                                borderRadius: "8px",
                                              }}
                                              onError={(e) => {
                                                e.target.src =
                                                  defaultEmployeeAvatar;
                                              }}
                                            />
                                          ) : message.mediaType === "audio" ? (
                                            <audio controls>
                                              <source
                                                src={message.mediaUrl}
                                                type="audio/webm"
                                              />
                                              Your browser does not support the
                                              audio element.
                                            </audio>
                                          ) : (
                                            <div className="file-message">
                                              <i className="ti ti-file me-2"></i>
                                              <a
                                                href={message.mediaUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                Download File
                                              </a>
                                            </div>
                                          )
                                        ) : (
                                          message.message
                                        )}
                                        <div className="emoj-group">
                                          <ul>
                                            <li className="emoj-action">
                                              <a href="javascript:void(0);">
                                                <i className="ti ti-mood-smile"></i>
                                              </a>
                                              <div className="emoj-group-list">
                                                <ul>
                                                  <li>
                                                    <a href="javascript:void(0);">
                                                      <img
                                                        src="assets/img/icons/emonji-02.svg"
                                                        alt="Icon"
                                                      />
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="javascript:void(0);">
                                                      <img
                                                        src="assets/img/icons/emonji-05.svg"
                                                        alt="Icon"
                                                      />
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="javascript:void(0);">
                                                      <img
                                                        src="assets/img/icons/emonji-06.svg"
                                                        alt="Icon"
                                                      />
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="javascript:void(0);">
                                                      <img
                                                        src="assets/img/icons/emonji-07.svg"
                                                        alt="Icon"
                                                      />
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="javascript:void(0);">
                                                      <img
                                                        src="assets/img/icons/emonji-08.svg"
                                                        alt="Icon"
                                                      />
                                                    </a>
                                                  </li>
                                                  <li className="add-emoj">
                                                    <a href="javascript:void(0);">
                                                      <i className="ti ti-plus"></i>
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <i className="ti ti-arrow-forward-up"></i>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="chat-actions">
                                        <a
                                          className="#"
                                          href="#"
                                          data-bs-toggle="dropdown"
                                        >
                                          <i className="ti ti-dots-vertical"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-heart me-2"></i>
                                              Reply
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-pinned me-2"></i>
                                              Forward
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-file-export me-2"></i>
                                              Copy
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-heart me-2"></i>
                                              Mark as Favourite
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-trash me-2"></i>
                                              Delete
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-check me-2"></i>
                                              Mark as Unread
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-box-align-right me-2"></i>
                                              Archeive Chat
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="ti ti-pinned me-2"></i>
                                              Pin Chat
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div
                                      className={`chat-profile-name ${
                                        message.sender === "employer"
                                          ? "text-end"
                                          : ""
                                      }`}
                                    >
                                      <h6>
                                        {message.sender === "employer"
                                          ? "You"
                                          : selectedChat.employeeName}
                                        <i className="ti ti-circle-filled fs-7 mx-2"></i>
                                        <span className="chat-time">
                                          {new Date(
                                            message.createdAt
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          })}
                                        </span>
                                        {message.sender === "employer" && (
                                          <span className="msg-read success">
                                            <i className="ti ti-checks"></i>
                                          </span>
                                        )}
                                      </h6>
                                    </div>
                                  </div>

                                  {message.sender === "employer" && (
                                    <div className="chat-avatar">
                                      <img
                                        src={
                                          employerAdminData?.userProfilePic ||
                                          defaultEmployerAvatar
                                        }
                                        className="rounded-circle dreams_chat"
                                        alt="You"
                                        onError={(e) => {
                                          e.target.src = defaultEmployerAvatar;
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </React.Fragment>
                            );
                          })
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  </div>

                  <div className="chat-footer" style={{ flexShrink: 0 }}>
                    <form
                      className="footer-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                      }}
                    >
                      <div className="chat-footer-wrap">
                        <div className="form-item">
                          <button
                            type="button"
                            className="action-circle"
                            onClick={
                              isRecording ? stopRecording : startRecording
                            }
                            style={{ border: "none" }}
                          >
                            <i
                              className={`ti ti-${
                                isRecording ? "microphone-off" : "microphone"
                              }`}
                            ></i>
                          </button>
                          {audioBlob && (
                            <div className="audio-preview ms-2">
                              <audio
                                controls
                                src={URL.createObjectURL(audioBlob)}
                              />
                              <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2"
                                onClick={() => setAudioBlob(null)}
                              >
                                <i className="ti ti-x"></i>
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="form-wrap">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Type Your Message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                        </div>
                        <div className="form-item emoj-action-foot">
                          <a href="#" className="action-circle">
                            <i className="ti ti-mood-smile"></i>
                          </a>
                          <div className="emoj-group-list-foot down-emoji-circle">
                            <ul>
                              <li>
                                <a href="javascript:void(0);">
                                  <img
                                    src="assets/img/icons/emonji-02.svg"
                                    alt="Icon"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0);">
                                  <img
                                    src="assets/img/icons/emonji-05.svg"
                                    alt="Icon"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0);">
                                  <img
                                    src="assets/img/icons/emonji-06.svg"
                                    alt="Icon"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0);">
                                  <img
                                    src="assets/img/icons/emonji-07.svg"
                                    alt="Icon"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="javascript:void(0);">
                                  <img
                                    src="assets/img/icons/emonji-08.svg"
                                    alt="Icon"
                                  />
                                </a>
                              </li>
                              <li className="add-emoj">
                                <a href="javascript:void(0);">
                                  <i className="ti ti-plus"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="form-item position-relative d-flex align-items-center justify-content-center">
                          <button
                            type="button"
                            className="action-circle file-action position-absolute"
                            onClick={() => fileInputRef.current.click()}
                            style={{ border: "none" }}
                          >
                            <i className="ti ti-folder"></i>
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="open-file position-relative d-none"
                            name="files"
                            id="files"
                            onChange={handleFileChange}
                          />
                          {file && (
                            <div className="file-preview ms-2">
                              <span>{file.name}</span>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger ms-2"
                                onClick={() => setFile(null)}
                              >
                                <i className="ti ti-x"></i>
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="form-item">
                          <a href="#" data-bs-toggle="dropdown">
                            <i className="ti ti-dots-vertical"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-end p-3">
                            <a href="#" className="dropdown-item">
                              <i className="ti ti-camera-selfie me-2"></i>Camera
                            </a>
                            <a href="#" className="dropdown-item">
                              <i className="ti ti-photo-up me-2"></i>Gallery
                            </a>
                            <a href="#" className="dropdown-item">
                              <i className="ti ti-music me-2"></i>Audio
                            </a>
                            <a href="#" className="dropdown-item">
                              <i className="ti ti-map-pin-share me-2"></i>
                              Location
                            </a>
                            <a href="#" className="dropdown-item">
                              <i className="ti ti-user-check me-2"></i>Contact
                            </a>
                          </div>
                        </div>
                        <div className="form-btn">
                          <button className="btn btn-primary" type="submit">
                            <i className="ti ti-send"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-center">
                    <i className="ti ti-message-circle fs-1 text-muted mb-3"></i>
                    <h5>Select a chat to start messaging</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
          <br />
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminSupport;
