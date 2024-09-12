import React from "react";
import { motion } from "framer-motion";
import { FaTags } from "react-icons/fa";

const TagCloud = () => {
  const tags = [
    "#NezaAI",
    "#AI",
    "#Notifycast+",
    "#Technology",
    "#Travel",
    "#Food",
    "#Fashion",
    "#Sports",
    "#Music",
    "#Art",
    "#Science",
  ];

  return (
    <div className="bg-white rounded-lg py-4">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <FaTags className="text-blue-500 mr-2" />
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm cursor-pointer hover:bg-blue-200 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
