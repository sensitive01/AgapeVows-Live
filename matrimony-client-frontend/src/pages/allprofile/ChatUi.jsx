import React, { useRef, useEffect, useState, useCallback } from "react";
import EmojiPicker from "emoji-picker-react";

// Utility function to handle both timestamp formats
const formatTimestamp = (timestamp) => {
  // If timestamp is already in human-readable format (like "08:53 PM"), return as is
  if (typeof timestamp === 'string' && timestamp.match(/^\d{1,2}:\d{2}\s?(AM|PM)$/i)) {
    return timestamp;
  }
  
  // If timestamp is already in simple time format (like "15:30"), return as is
  if (typeof timestamp === 'string' && timestamp.match(/^\d{1,2}:\d{2}$/)) {
    return timestamp;
  }
  
  // If it's an ISO string or Date object, convert to human-readable format
  try {
    const date = new Date(timestamp);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return timestamp; // Return original if can't parse
    }
    
    const now = new Date();
    const isToday = now.toDateString() === date.toDateString();
    
    if (isToday) {
      // Show time for today's messages
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    // Check if it's yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === date.toDateString();
    
    if (isYesterday) {
      return 'Yesterday';
    }
    
    // Check if it's within this week
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    if (date > weekAgo) {
      return date.toLocaleDateString([], { weekday: 'short' }); // Mon, Tue, etc.
    }
    
    // For older messages, show date
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric' 
    });
    
  } catch (error) {
    // If there's any error parsing, return the original timestamp
    return timestamp;
  }
};

const ChatUi = ({
  setIsChatOpen,
  handleChatSubmit,
  profileData,
  chatMessages,
  newMessage,
  setNewMessage,
  socket,
  userId,
  setChatMessages, // NEW PROP
  onBlockUser,     // NEW PROP
  onClearChat      // NEW PROP
}) => {
  console.log(chatMessages)
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState(null);

  const typingTimeoutRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const menuRef = useRef(null);

  const roomId = `chat_${[userId, profileData.receiverId].sort().join("_")}`;

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Listen for typing indicators
    const handleUserTyping = ({ userId: typingUserId, isTyping }) => {
      if (typingUserId === profileData.receiverId) {
        setOtherUserTyping(isTyping);
      }
    };

    socket.on("user_typing", handleUserTyping);

    return () => {
      socket.off("user_typing", handleUserTyping);
    };
  }, [socket, profileData.receiverId]);

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!socket) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", {
        senderId: userId,
        recipientId: profileData.receiverId,
        isTyping: true,
        roomId,
      });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", {
        senderId: userId,
        recipientId: profileData.receiverId,
        isTyping: false,
        roomId,
      });
    }, 1000);
  }, [socket, isTyping, userId, profileData.receiverId, roomId]);

  // Handle emoji selection
  const handleEmojiClick = useCallback(
    (emojiData) => {
      setNewMessage((prev) => prev + emojiData.emoji);
      setShowEmojiPicker(false);
      handleTyping(); // Trigger typing indicator when emoji is added
    },
    [handleTyping]
  );

  // Enhanced message submit with Socket.IO
  const handleEnhancedSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      // Stop typing indicator
      if (isTyping) {
        setIsTyping(false);
        if (socket) {
          socket.emit("typing", {
            senderId: userId,
            recipientId: profileData.receiverId,
            isTyping: false,
            roomId,
          });
        }
      }

      // Close emoji picker if open
      setShowEmojiPicker(false);

      // Call the original submit handler
      handleChatSubmit(e);
    },
    [
      newMessage,
      isTyping,
      socket,
      userId,
      profileData.receiverId,
      roomId,
      handleChatSubmit,
    ]
  );

  const displayedMessages = chatMessages ? chatMessages.filter(msg => {
    if (searchMode && searchQuery) {
      if (!msg.text?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    }
    if (filterMode === 'media') {
      const hasLink = msg.text?.match(/https?:\/\/[^\s]+/) || msg.text?.match(/\.(jpeg|jpg|gif|png|pdf|doc|docx)/i);
      return hasLink;
    }
    return true;
  }) : [];

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear this entire chat history?")) {
      if (onClearChat) {
        onClearChat();
      } else if (setChatMessages) {
        setChatMessages([]);
      }
      setIsMenuOpen(false);
    }
  };

  const handleBlockAction = () => {
    if (window.confirm("Are you sure you want to block this user?")) {
      if (onBlockUser) {
        onBlockUser(profileData.receiverId);
      } else {
        alert("User blocked! They will appear in the Blocked section.");
      }
      setIsMenuOpen(false);
      setIsChatOpen(false);
    }
  };

  return (
    <div
      className="chatbox active"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "380px",
        height: "500px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #e1e5e9",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#fafafa",
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={profileData.profileImage || "images/profiles/2.jpg"}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          {/* Online/Offline indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "12px",
              height: "12px",
              backgroundColor: profileData.isOnline ? "#4CAF50" : "#999",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            {profileData.userName || "User"}
          </h4>
          <span
            style={{
              fontSize: "12px",
              color: otherUserTyping
                ? "#2196F3"
                : profileData.isOnline
                ? "#4CAF50"
                : "#999",
              fontWeight: "500",
            }}
          >
            {otherUserTyping
              ? "Typing..."
              : profileData.isOnline
              ? "Online"
              : "Offline"}
          </span>
        </div>

        <div style={{ position: "relative", display: "flex", gap: "10px" }} ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#999",
              fontSize: "18px",
            }}
          >
            ⋮
          </button>
          
          {isMenuOpen && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: "0",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1000,
              minWidth: "160px",
              overflow: "hidden",
            }}>
              <div 
                style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #eee", fontSize: "14px", color: "#d32f2f", fontWeight: "600" }}
                onClick={handleBlockAction}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >Block</div>
              <div 
                style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #eee", fontSize: "14px", color: "#333" }}
                onClick={handleClearChat}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >Clear Chat</div>
              <div 
                style={{ padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #eee", fontSize: "14px", color: "#333" }}
                onClick={() => { setIsMenuOpen(false); setSearchMode(true); }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9f9f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >Search Chat</div>
              <div 
                style={{ padding: "10px 14px", cursor: "pointer", fontSize: "14px", color: "#333", backgroundColor: filterMode === 'media' ? '#e3f2fd' : 'transparent' }}
                onClick={() => { setIsMenuOpen(false); setFilterMode(filterMode === 'media' ? null : 'media'); }}
                onMouseEnter={(e) => e.target.style.backgroundColor = filterMode === 'media' ? '#e3f2fd' : '#f9f9f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = filterMode === 'media' ? '#e3f2fd' : 'transparent'}
              >
                {filterMode === 'media' ? 'Show All Messages' : 'Media, Links & Docs'}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsChatOpen(false)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#999",
            fontSize: "18px",
          }}
        >
          ✕
        </button>
      </div>

      {/* Search Bar Area */}
      {searchMode && (
        <div style={{ padding: "10px 16px", backgroundColor: "#eef2f5", display: "flex", gap: "8px", alignItems: "center", borderBottom: "1px solid #e1e5e9" }}>
          <i className="fa fa-search" style={{ color: "#999" }}></i>
          <input 
            type="text" 
            placeholder="Search within chat..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: "6px 12px", borderRadius: "20px", border: "1px solid #ccc", outline: "none", fontSize: "13px" }}
            autoFocus
          />
          <button onClick={() => { setSearchMode(false); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#666" }}>✕</button>
        </div>
      )}

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          backgroundColor: "#f8f9fa",
          position: "relative",
        }}
      >
        {displayedMessages.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#e3f2fd",
                padding: "12px 20px",
                borderRadius: "20px",
                color: "#1976d2",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Start a new chat!!! now
            </div>
          </div>
        ) : (
          <div>
            {displayedMessages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                {message.sender !== "user" && (
                  <img
                    src={profileData.profileImage || "images/profiles/2.jpg"}
                    alt=""
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "8px",
                      alignSelf: "flex-end",
                    }}
                  />
                )}

                <div
                  style={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius:
                      message.sender === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    backgroundColor:
                      message.sender === "user" ? "#007bff" : "#ffffff",
                    color: message.sender === "user" ? "white" : "#333",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    boxShadow:
                      message.sender !== "user"
                        ? "0 1px 2px rgba(0,0,0,0.1)"
                        : "none",
                    position: "relative",
                  }}
                >
                  <div>{message.text}</div>
                  <div
                    style={{
                      fontSize: "11px",
                      opacity: 0.7,
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    {/* This will handle both timestamp formats */}
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div
            ref={emojiPickerRef}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              right: "10px",
              zIndex: 1001,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width="100%"
              height={300}
              theme="light"
              searchDisabled={false}
              skinTonesDisabled={false}
              previewConfig={{
                defaultEmoji: "1f60a",
                defaultCaption: "What's on your mind?",
              }}
            />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid #f0f0f0",
          backgroundColor: "white",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{
              background: showEmojiPicker ? "#e3f2fd" : "none",
              border: "1px solid #e1e5e9",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              cursor: "pointer",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              color: showEmojiPicker ? "#1976d2" : "#666",
            }}
            onMouseEnter={(e) => {
              if (!showEmojiPicker) {
                e.target.style.backgroundColor = "#f0f0f0";
              }
            }}
            onMouseLeave={(e) => {
              if (!showEmojiPicker) {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            😊
          </button>

          <input
            type="text"
            name="chat_message"
            placeholder="Type a message here.."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEnhancedSubmit(e);
              }
            }}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid #e1e5e9",
              borderRadius: "24px",
              outline: "none",
              fontSize: "14px",
              backgroundColor: "#f8f9fa",
              resize: "none",
              minHeight: "24px",
              maxHeight: "80px",
            }}
          />
          <button
            onClick={handleEnhancedSubmit}
            disabled={!newMessage.trim()}
            style={{
              padding: "12px 16px",
              backgroundColor: newMessage.trim() ? "#007bff" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "24px",
              cursor: newMessage.trim() ? "pointer" : "not-allowed",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              minWidth: "60px",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}
          >
            SEND
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ transform: "rotate(-45deg)" }}
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUi;