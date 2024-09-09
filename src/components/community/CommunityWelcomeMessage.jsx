import React from "react";
import { FaUsers, FaStar, FaInfoCircle } from "react-icons/fa";
import { format } from "date-fns";
import { motion } from "framer-motion";

const CommunityWelcomeMessage = ({ communityInfo, membersCount }) => {
  const getRandomEmoji = () => {
    const emojis = [
      "🚀",
      "🌟",
      "🎉",
      "🎊",
      "🔥",
      "💡",
      "🌈",
      "🦄",
      "🍕",
      "🎸",
      "🏆",
      "🌺",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-6 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-6xl mb-4 text-center" variants={itemVariants}>
        {getRandomEmoji()}
      </motion.div>
      <motion.h2
        className="text-3xl font-bold text-white text-center mb-4"
        variants={itemVariants}
      >
        Welcome to {communityInfo.name}!
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center">
          <FaUsers className="mr-2" />
          <span>{membersCount} members</span>
        </div>
        <div className="flex items-center justify-center">
          <FaStar className="mr-2" />
          <span>Level {communityInfo.level || 1}</span>
        </div>
        <div className="flex items-center justify-center">
          <FaInfoCircle className="mr-2" />
          <span>
            Created on{" "}
            {format(new Date(communityInfo.created_at), "MMM d, yyyy")}
          </span>
        </div>
      </motion.div>
      <motion.p
        className="text-gray-200 mt-4 text-center"
        variants={itemVariants}
      >
        {communityInfo.description}
      </motion.p>
      <motion.div className="mt-6 flex justify-center" variants={itemVariants}>
        <button className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300">
          Get Started
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CommunityWelcomeMessage;
