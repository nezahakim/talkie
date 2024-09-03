import React, { useState, useEffect } from "react";
import {
  FaUserFriends,
  FaMicrophone,
  FaHeadphones,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from your API
    setUser({
      username: "johndoe",
      displayName: "John Doe",
      bio: "Voice enthusiast | Tech lover | Always curious",
      profilePicture: "https://via.placeholder.com/150",
      followers: 1337,
      following: 420,
      totalTalks: 42,
      listeningHours: 128,
    });
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-black bg-opacity-40">
              <div className="flex items-center">
                <img
                  src={user.profilePicture}
                  alt={user.displayName}
                  className="h-24 w-24 rounded-full border-4 border-white mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {user.displayName}
                  </h1>
                  <p className="text-sm text-gray-200">@{user.username}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="px-4 py-4">
            <p className="text-gray-700">{user.bio}</p>
          </div>

          {/* Stats */}
          <div className="flex border-t border-gray-200 divide-x divide-gray-200">
            <div className="flex-1 px-4 py-4 text-center">
              <span className="text-2xl font-bold text-gray-900">
                {user.followers}
              </span>
              <span className="block text-sm text-gray-500">Followers</span>
            </div>
            <div className="flex-1 px-4 py-4 text-center">
              <span className="text-2xl font-bold text-gray-900">
                {user.following}
              </span>
              <span className="block text-sm text-gray-500">Following</span>
            </div>
            <div className="flex-1 px-4 py-4 text-center">
              <span className="text-2xl font-bold text-gray-900">
                {user.totalTalks}
              </span>
              <span className="block text-sm text-gray-500">Talks</span>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Activity
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <FaMicrophone className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Talks
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {user.totalTalks}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <FaHeadphones className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Listening Hours
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {user.listeningHours}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FaUserFriends className="mr-2 h-5 w-5" /> Follow
          </button>
          <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FaEnvelope className="mr-2 h-5 w-5" /> Message
          </button>
          <button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <FaCog className="mr-2 h-5 w-5" /> Settings
          </button>
        </div>
      </div>
    </div>
  );
}
