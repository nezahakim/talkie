import React from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaUsers } from "react-icons/fa";

const LiveRooms = () => {
  const liveRooms = [
    {
      name: "Tech Talk: AI and the Future",
      participants: 120,
      host: "Sarah Johnson",
    },
    { name: "Mindfulness Meditation", participants: 45, host: "Mike Chen" },
    { name: "Cooking Italian Pasta", participants: 78, host: "Giulia Romano" },
    { name: "Indie Music Showcase", participants: 200, host: "Alex Turner" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaMicrophone className="text-red-500 mr-2" />
        Live Rooms
      </h2>
      <div className="space-y-4">
        {liveRooms.map((room, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-4 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="font-medium text-gray-800">{room.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">Hosted by {room.host}</p>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <FaUsers />
                <span>{room.participants}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out">
        See All Live Rooms
      </button>
    </div>
  );
};

export default LiveRooms;
