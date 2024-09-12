import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaUserCircle,
  FaUsers,
  FaBell,
  FaGlobe,
  FaLock,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../services/Api";
import { format } from "date-fns";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await Api.getUserProfile(username);
        setUser(result);
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
  }, []);

  const currentUserId = localStorage.getItem("user_id");

  const handleChat = () => {
    navigate("/p/c/" + user.user_id);
  };

  const handleNotify = () => {
    console.log("NotifyOn");
  };
  const handleEditProfile = () => {
    console.log("handleEditProfile");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExpertiseCard topics={user.hashtags} />
          </div>
        );

      case "communities":
        return (
          <div className="bg-white rounded-lg">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                My Communities
              </h3>
              {user.communities
                ? user.communities.map((community) => (
                    <div
                      key={community.id}
                      className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                          {community.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">
                            {community.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            <FaUsers className="inline-block mr-2" />
                            {community.members} members
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {community.isPrivate ? (
                          <FaLock className="text-gray-400 mr-2" />
                        ) : (
                          <FaGlobe className="text-gray-400 mr-2" />
                        )}
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300">
                          View
                        </button>
                      </div>
                    </div>
                  ))
                : " No communities yet Try to Create one"}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Cover Photo */}
        <div
          className="relative h-44 sm:h-60 bg-cover bg-center"
          style={{ backgroundImage: `url(${user.coverPicture})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Profile Info */}
        <div className="relative bg-white px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 relative">
            {/* <img
              src={user.profile_picture}
              alt={user.full_name}
              className="h-24 w-24 rounded-full border-4 border-white absolute -top-12 left-4"
            /> */}
            {/* Profile emoji */}
            <span className="h-24 w-24 text-4xl rounded-full border-4 border-white bg-gray-100 flex items-center justify-center absolute -top-12 left-0 shadow-lg">
              🌸
            </span>
            <div className="mt-12 pt-1 sm:pt-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {user.full_name}
              </h1>
              <p className="text-sm text-gray-500 mb-2">@{user.username}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            {currentUserId === user.user_id ? (
              <ActionButton
                icon={<FaUserCircle />}
                text="Edit Profile"
                primary
                action={handleEditProfile}
              />
            ) : (
              <>
                <ActionButton
                  icon={<FaEnvelope />}
                  text="Chat"
                  action={handleChat}
                />
                <ActionButton
                  icon={<FaBell />}
                  text="Notify"
                  action={handleNotify}
                />
              </>
            )}
          </div>
          <div className="mt-4 flex space-x-6 text-sm text-gray-500">
            <span>
              <strong className="text-gray-900">
                {user.total_live_rooms_created}
              </strong>{" "}
              Talkie Live
            </span>
            <span>
              <strong className="text-gray-900">{user.total_listeners}</strong>{" "}
              Listeners
            </span>
            <span>
              <FaCalendarAlt className="inline mr-1" />
              Joined {format(new Date(user.created_at), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white px-4 py-5 sm:px-6 border-t border-gray-200">
          <p className="text-gray-700">{user.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.hashtags &&
              user.hashtags.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  #{topic.replace("#", "")}
                </span>
              ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-t border-gray-200">
          <nav className="flex">
            {["overview", "communities"].map((tab) => (
              <button
                key={tab}
                className={`${
                  activeTab === tab
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white px-4 py-5 sm:px-6">{renderTabContent()}</div>
        {username ? (
          ""
        ) : (
          <div className="bg-white px-4 py-5 sm:px-6">
            <button
              className="inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium rounded-full transition-colors duration-300"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const ExpertiseCard = ({ topics }) => (
  <div className="bg-white p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Topics of Expertise
    </h3>
    <div className="flex flex-wrap gap-2">
      {topics &&
        topics.map((topic, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
          >
            {topic}
          </span>
        ))}
    </div>
  </div>
);

const ActionButton = ({ icon, text, primary = false, action }) => (
  <button
    onClick={action}
    className={`inline-flex justify-center items-center px-4 py-2 ${
      primary
        ? "bg-purple-600 text-white hover:bg-purple-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    } text-sm font-medium rounded-full transition-colors duration-300`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);
