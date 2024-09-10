import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Api from "../../services/Api";

const Communities = () => {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await Api.getAllCommunities();
        setCommunities(response);
      } catch (error) {
        console.error("Error fetching communities or members:", error);
      }
    };

    fetchAll();
  }, []);

  const handleClick = (community_id) => {
    navigate("/community/" + community_id);
  };

  const getRandomEmoji = () => {
    const emojis = [
      "😀",
      "😍",
      "🚀",
      "🎉",
      "🦄",
      "🍕",
      "🎸",
      "🏆",
      "💡",
      "🌸",
      "🎙️",
      "✈️",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaUsers className="text-indigo-500 mr-2" />
        Popular Communities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {communities.map((community) => (
          <motion.div
            key={community.community_id}
            className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleClick(community.community_id)}
          >
            {/* <img
              src={community.image || "/default-community-image.png"}
              alt={community.name}
              className="w-12 h-12 rounded-full object-cover"
            /> */}
            <span className="h-12 w-12 text-4xl rounded-full border-4 border-white bg-gray-100 flex items-center justify-center left-0 shadow-lg object-cover">
              {getRandomEmoji}
            </span>
            <div>
              <h3 className="font-medium text-gray-800">{community.name}</h3>
              <p className="text-sm text-gray-500">
                {community.member_count} members
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out">
        Explore All Communities
      </button>
    </div>
  );
};

export default Communities;
