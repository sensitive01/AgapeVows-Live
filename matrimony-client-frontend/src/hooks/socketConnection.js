// hooks/useSocket.js - Simple socket hook
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useSocket = (userId, userName) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:4000", {
      query: { userId, userName },
    });

    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("users_online", setOnlineUsers);

    return () => socket.close();
  }, [userId, userName]);

  return {
    socket: socketRef.current,
    isConnected,
    onlineUsers,
    isUserOnline: (checkUserId) => onlineUsers.includes(checkUserId),
  };
};

export default useSocket;
