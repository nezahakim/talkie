// import React from "react";
// import { FaUserCircle } from "react-icons/fa";

// const messages = [
//   {
//     id: 1,
//     text: "Hello, how are you?",
//     user: "Alice",
//     profilePic: "/images/alice-profile.jpg",
//   },
//   {
//     id: 1,
//     text: "Hello, how are you?",
//     user: "Alice",
//     profilePic: "/images/alice-profile.jpg",
//   },
//   {
//     id: 1,
//     text: "Hello, how are you?",
//     user: "Alice",
//     profilePic: "/images/alice-profile.jpg",
//   },
//   {
//     id: 1,
//     text: "Hello, how are you?",
//     user: "Alice",
//     profilePic: "/images/alice-profile.jpg",
//   },
//   {
//     id: 1,
//     text: "Hello, how are you?",
//     user: "Alice",
//     profilePic: "/images/alice-profile.jpg",
//   },
//   {
//     id: 1,
//     text: "Hello, how are you?",
//     user: "Alice",
//     profilePic: "/images/alice-profile.jpg",
//   },
//   {
//     id: 2,
//     text: "I'm good, thanks! How about you?",
//     user: "Bob",
//     profilePic: "/images/bob-profile.jpg",
//   },
//   // More messages...
// ];

// const Chat = () => {
//   return (
//     <div className="flex flex-col-reverse p-4 space-y-reverse space-y-4 overflow-auto h-full">
//       {messages.map((message) => (
//         <div key={message.id} className="flex items-start space-x-3">
//           <div className="flex-shrink-0 w-8 h-8">
//             <img
//               src={message.profilePic}
//               alt={`${message.user}'s profile`}
//               className="w-full h-full rounded-full object-cover border-2 border-gray-600"
//             />
//           </div>
//           <div className="flex flex-col">
//             <span className="text-xs font-semibold text-blue-300 mb-0">
//               {message.user}
//             </span>
//             <div className="bg-gray-700 text-white p-2 rounded-full rounded-tl-none max-w-xs">
//               {message.text}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chat;

import React from "react";
import { FaUserCircle, FaThumbtack } from "react-icons/fa";

const Chat = ({ messages, onPin, isAdmin }) => {
  return (
    <div className="flex flex-col-reverse p-4 space-y-reverse space-y-4 overflow-auto h-full">
      {messages.map((message) => (
        <div key={message.message_id} className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8">
            <img
              src={message.profile_picture || "/default-avatar.png"}
              alt={`${message.username}'s profile`}
              className="w-full h-full rounded-full object-cover border-2 border-gray-600"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-blue-300 mb-0">
              {message.username}
            </span>
            <div className="bg-gray-700 text-white p-2 rounded-lg rounded-tl-none max-w-xs">
              {message.message}
            </div>
            <span className="text-xs text-gray-400 mt-1">
              {new Date(message.created_at).toLocaleString()}
            </span>
          </div>
          {isAdmin && !message.pinned && (
            <button
              onClick={() => onPin(message.message_id)}
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaThumbtack size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chat;
