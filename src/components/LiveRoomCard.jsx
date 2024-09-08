import React from "react";
import { FaUsers } from "react-icons/fa";

const LiveRoomCard = ({ room }) => (
  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
    <div>
      <h3 className="font-bold text-lg mb-2">{room.title}</h3>
      <p className="text-purple-100 text-sm mb-4">{room.description}</p>
    </div>
    <div className="flex justify-between items-center">
      <span className="flex items-center text-sm">
        <FaUsers className="mr-2" />
        {room.listeners} listeners
      </span>
      <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-purple-100 transition-colors duration-300">
        Join Room
      </button>
    </div>
  </div>
);

export default LiveRoomCard;
