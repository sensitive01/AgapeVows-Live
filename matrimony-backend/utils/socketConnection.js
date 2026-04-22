const { Server } = require("socket.io");

const onlineUsers = new Map(); // userId -> socketId

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Optional: restrict to frontend domain in production
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const { userId, userName } = socket.handshake.query;
    console.log(`🔌 ${userName || userId} connected`);

    if (userId) {
      onlineUsers.set(userId, socket.id);
      io.emit("users_online", Array.from(onlineUsers.keys()));
      io.emit("user_joined", userId);
    }

    socket.on("join_chat_room", ({ roomId }) => {
      socket.join(roomId);
      console.log(`📥 ${userId} joined room ${roomId}`);
    });

    socket.on(
      "typing",
      ({ senderId, recipientId, isTyping, userName, roomId }) => {
        socket.to(roomId).emit("user_typing", {
          userId: senderId,
          userName,
          isTyping,
          recipientId,
        });
      }
    );

    socket.on("send_message", (message) => {
      const { roomId, recipientId, id } = message;
      socket.to(roomId).emit("receive_message", message);

      // Optional: emit delivery confirmation
      socket.to(roomId).emit("message_delivered", {
        messageId: id,
        userId: recipientId,
      });
    });

    socket.on("message_read", ({ messageId, roomId, userId }) => {
      socket.to(roomId).emit("message_read", { messageId, userId });
    });

    socket.on("disconnect", () => {
      if (userId) {
        onlineUsers.delete(userId);
        io.emit("user_left", userId);
        io.emit("users_online", Array.from(onlineUsers.keys()));
        console.log(`❌ ${userId} disconnected`);
      }
    });
  });
};

module.exports = initializeSocket;
