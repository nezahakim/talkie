import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const ExploreCard = ({ item }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <button className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition duration-300 ease-in-out">
            <FaHeart />
            <span>{item.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">
            <FaComment />
            <span>{item.comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-green-500 hover:text-green-600 transition duration-300 ease-in-out">
            <FaShare />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExploreCard;
