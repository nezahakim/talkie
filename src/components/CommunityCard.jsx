import React from "react";
import { FaUsers } from "react-icons/fa";

const CommunityCard = ({ community }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
      <p className="text-gray-600 mb-4">{community.description}</p>
      <div className="flex items-center text-gray-500">
        <FaUsers className="mr-2" />
        <span>{community.memberCount} members</span>
      </div>
    </div>
  );
};

export default CommunityCard;
