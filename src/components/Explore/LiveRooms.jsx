import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaUsers } from "react-icons/fa";

const LiveRooms = ({ rooms }) => {
  const [getAll, setGetAll] = useState(false);

  const showAll = () => {
    setGetAll(!getAll);
  };

  return (
    <div className="bg-white rounded-lg py-4 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaMicrophone className="text-red-500 mr-2" />
        Live Rooms
      </h2>
      <div className="space-y-4">
        {rooms
          .slice(0, getAll ? rooms.length : 4)
          .reverse()
          .map((room, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-4 rounded-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-medium text-gray-800">
                {room.session_title}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Hosted by {room.host_username}
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <FaUsers />
                  <span>{room.participant_count}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
      <button
        className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
        onClick={showAll}
      >
        {getAll ? "See Less" : "See All Live Rooms"}
      </button>
    </div>
  );
};

export default LiveRooms;
