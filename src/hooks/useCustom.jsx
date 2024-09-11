import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://your-server-url.com";

export const useChatController = (chatId, userId, token) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER_URL, {
      auth: { token },
      query: { chatId },
    });

    setSocket(newSocket);

    // Clean up on unmount
    return () => newSocket.close();
  }, [chatId, token]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for deleted messages
    socket.on("messageDeleted", ({ messageId }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId),
      );
    });

    // Clean up listeners on unmount
    return () => {
      socket.off("newMessage");
      socket.off("messageDeleted");
    };
  }, [socket]);

  const sendMessage = useCallback(
    (content) => {
      if (socket) {
        socket.emit("sendMessage", { chatId, message: content });
      }
    },
    [socket, chatId],
  );

  const deleteMessage = useCallback(
    (messageId) => {
      if (socket) {
        socket.emit("deleteMessage", { chatId, messageId });
      }
    },
    [socket, chatId],
  );

  const pinMessage = useCallback(
    (messageId) => {
      if (socket) {
        socket.emit("pinMessage", { chatId, messageId });
      }
    },
    [socket, chatId],
  );

  const unpinMessage = useCallback(
    (messageId) => {
      if (socket) {
        socket.emit("unpinMessage", { chatId, messageId });
      }
    },
    [socket, chatId],
  );

  return {
    messages,
    sendMessage,
    deleteMessage,
    pinMessage,
    unpinMessage,
  };
};
