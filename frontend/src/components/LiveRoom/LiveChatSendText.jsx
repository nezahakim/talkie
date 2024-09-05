import React, { useState } from "react";
import { FaPaperPlane, FaImage, FaGift, FaSmile } from "react-icons/fa";

const LiveChatSendText = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="flex items-center p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg shadow-inner">
      <div className="flex items-center space-x-3 mr-4">
        <button className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110">
          <FaImage size={20} />
        </button>
        <button className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110">
          <FaGift size={20} />
        </button>
        <button className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110">
          <FaSmile size={20} />
        </button>
      </div>
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="1"
          placeholder="Type your message..."
          className="w-full bg-gray-700 text-white rounded-full py-2 px-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <button
          onClick={handleSend}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
};

export default LiveChatSendText;
