import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const RecommendedForYou = () => {
  const recommendations = [
    { title: "Top 10 AI Breakthroughs", image: "vite.svg" },
    { title: "Future of Sustainable Energy", image: "vite.svg" },
    { title: "Revolutionary Quantum Computing", image: "vite.svg" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaStar className="text-yellow-500 mr-2" />
        Recommended For You
      </h3>
      <div className="space-y-4">
        {recommendations.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <p className="text-sm font-medium text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedForYou;
