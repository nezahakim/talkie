import React from "react";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

const TrendingTopics = () => {
  const trendingTopics = [
    "AI in Healthcare",
    "Sustainable Fashion",
    "Space Exploration",
    "Crypto Trends",
    "Remote Work",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaFire className="text-orange-500 mr-2" />
        Trending Topics
      </h2>
      <div className="flex flex-wrap gap-3">
        {trendingTopics.map((topic, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05, originX: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {topic}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
