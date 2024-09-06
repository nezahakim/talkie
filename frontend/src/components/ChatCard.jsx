import React from "react";
import { FaComments, FaUserFriends } from "react-icons/fa";

const ChatCard = ({ chat }) => {
  return (
    <div
      key={chat.id}
      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex items-center">
        {chat.type === "community" ? (
          <FaComments className="mr-3 text-indigo-600 text-xl" />
        ) : (
          <FaUserFriends className="mr-3 text-green-600 text-xl" />
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{chat.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {chat.lastMessage.slice(0, 25) + "..."}
          </p>
        </div>
      </div>
      {chat.unread > 0 && (
        <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {chat.unread}
        </span>
      )}
    </div>
  );
};

export default ChatCard;
