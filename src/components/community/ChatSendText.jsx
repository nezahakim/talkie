// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaArrowUp,
//   FaMicrophone,
//   FaDice,
//   FaGift,
//   FaGamepad,
// } from "react-icons/fa6";

// const ChatSendText = () => {
//   const [message, setMessage] = useState("");
//   const [isExpanded, setIsExpanded] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (isExpanded && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isExpanded]);

//   const handleSend = () => {
//     if (message.trim()) {
//       console.log("Message sent:", message);
//       setMessage("");
//       setIsExpanded(false);
//     }
//   };

//   const handleInputClick = () => {
//     setIsExpanded(true);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="bg-gray-900 p-2 rounded-lg transition-all duration-300">
//       <div className="flex items-center space-x-2">
//         <div
//           className={`flex-grow transition-all duration-300 ${isExpanded ? "w-full" : "w-100vh"}`}
//         >
//           <input
//             ref={inputRef}
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onClick={handleInputClick}
//             onKeyPress={handleKeyPress}
//             placeholder="Send a message"
//             className="w-full bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
//           />
//         </div>
//         {isExpanded ? (
//           <button
//             onClick={handleSend}
//             className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300"
//           >
//             <FaArrowUp size={20} />
//           </button>
//         ) : (
//           <>
//             <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
//               <FaDice size={20} />
//             </button>
//             <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
//               <FaGift size={20} />
//             </button>
//             <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
//               <FaGamepad size={20} />
//             </button>
//             <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
//               <FaMicrophone size={20} />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatSendText;

import React, { useState, useRef, useEffect } from "react";
import {
  FaArrowUp,
  FaMicrophone,
  FaDice,
  FaGift,
  FaGamepad,
} from "react-icons/fa";

const ChatSendText = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setIsExpanded(false);
    }
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gray-900 p-2 rounded-lg transition-all duration-300">
      <div className="flex items-center space-x-2">
        <div
          className={`flex-grow transition-all duration-300 ${isExpanded ? "w-full" : "w-100vh"}`}
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onClick={handleInputClick}
            onKeyPress={handleKeyPress}
            placeholder="Send a message"
            className="w-full bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
        </div>
        {isExpanded ? (
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaArrowUp size={20} />
          </button>
        ) : (
          <>
            <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
              <FaDice size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
              <FaGift size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
              <FaGamepad size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors duration-300">
              <FaMicrophone size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatSendText;
