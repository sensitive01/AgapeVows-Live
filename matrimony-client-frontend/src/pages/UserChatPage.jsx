import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import profile1 from "../assets/images/profiles/1.jpg";
import profile2 from "../assets/images/profiles/2.jpg";
import profile3 from "../assets/images/profiles/3.jpg";
import user1 from "../assets/images/user/1.jpg";

import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import MembershipBadge from "../components/common/MembershipBadge";
import ChatUi from "../pages/allprofile/ChatUi";
import {
  getMyChatList,
  getChatMessages,
  sendChatMessage,
  blockUser,
  clearChatHistory,
} from "../api/axiosService/userAuthService.js";

const UserChatPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Socket.IO states
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_ROUTE;

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(baseUrl, {
      query: { userId },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setSocket(newSocket);
    });

    // Listen for incoming messages
    newSocket.on("receive_message", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          id: message.id,
          senderId: message.senderId,
          sender: message.senderId === userId ? "user" : "profile",
          text: message.text,
          message: message.text,
          timestamp: new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    // Listen for online users
    newSocket.on("users_online", (userIds) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("user_joined", (joinedUserId) => {
      setOnlineUsers((prev) => [...prev, joinedUserId]);
    });

    newSocket.on("user_left", (leftUserId) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== leftUserId));
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userId]);

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        setLoading(true);
        const response = await getMyChatList(userId);
        if (response.status === 200) {
          setChatList(response.data.chatList);
        }
      } catch (error) {
        console.error("Error fetching chat list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchChatList();
    }
  }, [userId]);

  const handleChatClick = async (chat) => {
    try {
      setMessagesLoading(true);
      setSelectedChat(chat);
      setIsChatOpen(true);

      // Join the chat room via socket
      if (socket) {
        const roomId = `chat_${[userId, chat.participant._id]
          .sort()
          .join("_")}`;
        socket.emit("join_chat_room", { roomId });
      }

      // Open chatbox
      const chatbox = document.querySelector(".chatbox");
      if (chatbox) {
        chatbox.classList.add("open");
      }

      // Fetch messages for this chat
      const response = await getChatMessages(chat.chatId);
      if (response.status === 200) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleCloseChatbox = () => {
    const chatbox = document.querySelector(".chatbox");
    if (chatbox) {
      chatbox.classList.remove("open");
    }
    setSelectedChat(null);
    setMessages([]);
    setIsChatOpen(false);
  };

  const handleBlockUser = async (profileId) => {
    try {
      const response = await blockUser(userId, profileId);
      if (response.status === 200) {
        // Remove from chat list
        setChatList((prev) => prev.filter((chat) => chat.participant._id !== profileId));
        handleCloseChatbox();
        alert("User blocked successfully! They will appear in the Blocked section.");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("Failed to block user.");
    }
  };

  const handleClearChat = async (chatId) => {
    try {
      const response = await clearChatHistory(chatId);
      if (response.status === 200) {
        setMessages([]);
        // Update last message in chat list
        setChatList((prev) => prev.map(c =>
          c.chatId === chatId ? { ...c, lastMessage: null } : c
        ));
      }
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const messageData = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: newMessage,
        senderId: userId,
        recipientId: selectedChat.participant._id,
        roomId: `chat_${[userId, selectedChat.participant._id]
          .sort()
          .join("_")}`,
        timestamp: new Date().toISOString(),
      };

      // Add optimistic update
      const tempMessage = {
        id: messageData.id,
        senderId: userId,
        sender: "user",
        text: newMessage,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, tempMessage]);

      // Send via socket for real-time delivery
      if (socket) {
        socket.emit("send_message", messageData);
      }

      // Also send via API for persistence
      await sendChatMessage(userId, tempMessage, selectedChat.participant._id);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLastMessageTime = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatTime(timestamp);
    } else {
      return messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Transform messages to match ChatUi expected format
  const transformedMessages = messages.map((msg) => ({
    id: msg.id || msg._id || Date.now() + Math.random(),
    sender: msg.senderId === userId ? "user" : "profile",
    text: msg.message || msg.text,
    timestamp: msg.timestamp ? msg.timestamp : formatTime(new Date()),
  }));

  // Profile data for ChatUi
  const profileData = selectedChat
    ? {
      userName: selectedChat.participant.name,
      profileImage: selectedChat.participant.profileImage || profile1,
      receiverId: selectedChat.participant._id,
      isOnline: onlineUsers.includes(selectedChat.participant._id),
    }
    : {
      userName: "User",
      profileImage: profile1,
      isOnline: false,
    };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <LayoutComponent />
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh", paddingTop: "90px" }}
        >
          <div>Loading Chats...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              <div
                className="col-md-9 col-lg-10"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12 db-sec-com">
                    <h2 className="db-tit">Chat List</h2>
                    <div className="db-pro-stat">
                      <div className="db-chat">
                        <ul>
                          {chatList.length === 0 ? (
                            <li
                              style={{ textAlign: "center", padding: "20px" }}
                            >
                              No Chats Available
                            </li>
                          ) : (
                            chatList
                              .filter((chat) => chat && chat.participant)
                              .map((chat) => (
                              <li
                                key={chat.chatId}
                                className="db-chat-trig"
                                onClick={() => handleChatClick(chat)}
                                style={{ cursor: "pointer" }}
                              >
                                <div
                                  className="db-chat-pro"
                                  style={{ position: "relative" }}
                                >
                                  <div
                                    className="db-chat-pro"
                                    style={{
                                      position: "relative",
                                      width: "50px",
                                      height: "60px" // 👈 extra space for badge
                                    }}
                                  >
                                    {/* ✅ Badge - TOP CENTER */}
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "0px",
                                        left: "50%",
                                        transform: "translateX(-50%) scale(0.7)",
                                        zIndex: 10
                                      }}
                                    >
                                      <MembershipBadge user={chat.participant} isMini={true} />
                                    </div>

                                    {/* ✅ Profile Image (pushed down) */}
                                    <img
                                      src={chat.participant.profileImage || profile1}
                                      alt={chat.participant.name}
                                      onError={(e) => {
                                        e.target.src = profile1;
                                      }}
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginTop: "20px" // 👈 space for badge
                                      }}
                                    />
                                  </div>
                                  {/* Online indicator */}
                                  {onlineUsers.includes(
                                    chat.participant._id,
                                  ) && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          bottom: "2px",
                                          right: "2px",
                                          width: "12px",
                                          height: "12px",
                                          backgroundColor: "#4CAF50",
                                          borderRadius: "50%",
                                          border: "2px solid white",
                                        }}
                                      />
                                    )}
                                </div>
                                <div className="db-chat-bio">
                                  <h5>{chat.participant.name}</h5>
                                  <span style={{
                                    display: 'block',
                                    maxWidth: '180px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden'
                                  }}>
                                    {chat?.lastMessage ? (
                                      <>
                                        <strong>{chat.lastMessage.isMyMessage ? "You: " : `${chat.participant.name.split(' ')[0]}: `}</strong>
                                        {chat.lastMessage.message}
                                      </>
                                    ) : (
                                      "No messages yet"
                                    )}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/profile-more-details/${chat.participant._id}`);
                                    }}
                                    style={{
                                      backgroundColor: "#ff5e62",
                                      color: "#fff",
                                      border: "none",
                                      padding: "3px 8px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontSize: "0.8rem",
                                      fontWeight: "500",
                                      transition: "0.3s ease"
                                    }}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e14b50")}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ff5e62")}
                                  >
                                    View Full Profile
                                  </button>
                                </div>
                                <div className="db-chat-info">
                                  <div className="time">
                                    <span className="timer">
                                      {formatLastMessageTime(
                                        chat?.lastMessage?.timestamp || "",
                                      )}
                                    </span>
                                    {/* You can add unread count here if available in your API */}
                                    {/* <span className="cont">3</span> */}
                                  </div>
                                </div>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* <CopyRights /> */}

      {/* ChatUi with proper props */}
      {isChatOpen && selectedChat && (
        <ChatUi
          setIsChatOpen={setIsChatOpen}
          handleChatSubmit={handleChatSubmit}
          profileData={profileData}
          chatMessages={transformedMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          socket={socket}
          userId={userId}
          setChatMessages={setMessages}
          onBlockUser={handleBlockUser}
          onClearChat={() => handleClearChat(selectedChat.chatId)}
        />
      )}
    </div>
  );
};

export default UserChatPage;
