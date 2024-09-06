import React, { useState } from "react";
import { FaMicrophone, FaPlus, FaUserPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const speakers = [
  { id: 1, name: "Alice", isCreator: true, profilePic: "/vite.svg" },
  { id: 2, name: "Bob", isCreator: false, profilePic: "/vite.svg" },
  { id: 3, name: "Charlie", isCreator: false, profilePic: "/vite.svg" },
  { id: 4, name: "David", isCreator: false, profilePic: "/vite.svg" },
  { id: 5, name: "Eve", isCreator: false, profilePic: "/vite.svg" },
];

const LiveSpeakers = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllSpeakers, setShowAllSpeakers] = useState(false);

  const toggleFollow = () => setIsFollowing(!isFollowing);
  const creator = speakers.find((speaker) => speaker.isCreator);
  const nonCreators = speakers.filter((speaker) => !speaker.isCreator);

  return (
    <div className="flex flex-col items-end items-center space-y-2 p-2">
      {/* Creator */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={creator.profilePic}
          alt={`Creator's profile`}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <motion.button
          className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
            isFollowing ? "bg-gray-500" : "bg-red-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFollow}
        >
          {isFollowing ? <FaUserPlus size={12} /> : <FaPlus size={12} />}
        </motion.button>
      </motion.div>

      {/* Spacer */}
      {/* <div className="h-1"></div> */}

      {/* Non-Creators */}
      <div className="shadow-sm bg-gray-100 py-2 px-1 rounded-full flex flex-col items-end items-center space-y-2">
        <AnimatePresence>
          {nonCreators
            .slice(0, showAllSpeakers ? undefined : 3)
            .map((speaker, index) => (
              <motion.div
                key={speaker.id}
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <img
                  src={speaker.profilePic}
                  alt={`Speaker's profile`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-800"
                />
                <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        {nonCreators.length > 3 && (
          <motion.button
            className="text-sm text-blue-500 font-semibold"
            onClick={() => setShowAllSpeakers(!showAllSpeakers)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllSpeakers ? "<<" : `+${nonCreators.length - 3}`}
          </motion.button>
        )}
      </div>

      {/* Request Mic Button */}
      <motion.div
        className="relative mt-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <FaPlus size={14} className="text-gray-600" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          <FaMicrophone size={10} />
        </div>
      </motion.div>
    </div>
  );
};

export default LiveSpeakers;
