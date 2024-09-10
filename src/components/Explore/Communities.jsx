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
        const response = await Api.getCommunities();
        const comms = response.data;

        // Fetch all members concurrently
        const membersPromises = comms.map(async (community) => {
          const membersResponse = await Api.getCommunityMembers(
            community.community_id,
          );
          return { ...community, membersCount: membersResponse.data.length };
        });

        // Wait for all member fetches to complete
        const communitiesWithMembers = await Promise.all(membersPromises);

        setCommunities(communitiesWithMembers);
      } catch (error) {
        console.error("Error fetching communities or members:", error);
      }
    };

    fetchAll();
  }, []);

  const handleClick = (community_id) => {
    navigate("/community/" + community_id);
  };

  // const communities = [
  //   { name: "Tech Enthusiasts", members: 5200, image: "vite.svg" },
  //   { name: "Fitness Fanatics", members: 3800, image: "vite.svg" },
  //   { name: "Book Lovers", members: 4500, image: "vite.svg" },
  //   { name: "Foodies Unite", members: 6100, image: "vite.svg" },
  // ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FaUsers className="text-indigo-500 mr-2" />
        Popular Communities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {communities.map((community, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleClick(community.community_id)}
          >
            <img
              src={community?.image}
              alt={community.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-800">{community.name}</h3>
              <p className="text-sm text-gray-500">
                {community.membersCount} members
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
