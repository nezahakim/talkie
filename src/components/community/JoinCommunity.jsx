import React, { useState, useEffect } from "react";
import { FaUsers, FaStar, FaInfoCircle, FaMinusCircle } from "react-icons/fa";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";

const JoinCommunity = ({ Join }) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/live");
  };

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
        Welcome!
      </motion.h2>
      <motion.p
        className="text-gray-200 mt-4 text-center"
        variants={itemVariants}
      >
        Join This Community To Start Discussing Your Ideas!
      </motion.p>
      <motion.div className="mt-6 flex justify-center" variants={itemVariants}>
        <button
          className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300"
          onClick={Join}
        >
          Get Started
        </button>{" "}
        <button className="text-gray-300 px-3 sm:px-4 sm:py-2 hover:text-white transition duration-300">
          <FaMinusCircle size={20} onClick={onClose} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default JoinCommunity;
