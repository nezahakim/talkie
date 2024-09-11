import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://talkie-back.vercel.app";
// const SOCKET_SERVER_URL =
//   "https://0d3a37b3-590d-4da3-892e-347bbc5cb91e-00-1gsjkthjnxlbp.spock.replit.dev/";

export const useChatController = (chatId, userId, token) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io.connect(SOCKET_SERVER_URL, {
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
      // console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("ListAllChats", (message) => {
      // console.log(message);
      setMessages(message);
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

  const ListAllChats = useCallback(() => {
    if (socket) {
      socket.emit("listAllChats", { chatId });
    }
  }, [socket, chatId]);

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
    ListAllChats,
  };
};

//   return (
//     <div className="chat-container">
//       <div className="message-list">
//         {messages.map((msg) => (
//           <div key={msg.id} className="message">
//             <p>{msg.content}</p>
//             <button onClick={() => deleteMessage(msg.id)}>Delete</button>
//             <button onClick={() => pinMessage(msg.id)}>Pin</button>
//             <button onClick={() => unpinMessage(msg.id)}>Unpin</button>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };
