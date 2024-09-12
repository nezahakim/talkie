import React from "react";
import { FaTimes, FaCrown, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MembersList = ({ members, isAdmin, onClose }) => {
  const navigate = useNavigate();
  const ClickUser = (username) => {
    navigate("/p/" + username);
  };

  return (
    <div className="w-64 bg-gray-800 h-full overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h3 className="text-white font-bold">Members</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <FaTimes size={20} />
        </button>
      </div>
      <ul className="p-2">
        {members.map((member) => (
          <li
            key={member.user_id}
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
            onClick={() => ClickUser(member.username)}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              {member.profile_picture ? (
                <img
                  src={member.profile_picture}
                  alt={member.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle size={32} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <span className="text-white">{member.username}</span>
              {member.role === "admin" && (
                <FaCrown
                  className="text-yellow-500 inline-block ml-1"
                  size={12}
                />
              )}
            </div>
            {isAdmin &&
              member.role !== "admin" &&
              member.role !== "creator" && (
                <button className="text-red-500 hover:text-red-400 text-sm">
                  Kick
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersList;
