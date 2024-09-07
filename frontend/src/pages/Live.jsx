import React, { useState } from "react";
import {
  FaPlus,
  FaMicrophone,
  FaUsers,
  FaComments,
  FaUserFriends,
  FaSearch,
} from "react-icons/fa";
import CreateModal from "../components/CreateModal";
import LiveRoomCard from "../components/LiveRoomCard";
import ChatCard from "../components/ChatCard";

export default function Live() {
  const [activeSection, setActiveSection] = useState("chats");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [chats, setChats] = useState([
    {
      id: 1,
      type: "community",
      name: "Tech Enthusiasts",
      lastMessage: "Check out this new gadget!",
      unread: 3,
    },
    {
      id: 2,
      type: "private",
      name: "Alice Johnson",
      lastMessage: "Are you joining the audio chat later?",
      unread: 1,
    },
    // Add more chat data as needed
  ]);
  const [audioRooms, setAudioRooms] = useState([
    {
      id: 1,
      title: "Tech Talk",
      participants: 120,
      speakers: ["John Doe", "Jane Smith"],
      listeners: 1200,
    },
    {
      id: 2,
      title: "Music Lovers",
      participants: 85,
      speakers: ["Alice Johnson"],
      listeners: 50,
    },
    // Add more room data as needed
  ]);

  const handleCreateRoom = (roomData) => {
    // Implement API call to create a new room
    console.log("Creating room:", roomData);
    // After successful creation, you might want to add the new room to the audioRooms state
    // setAudioRooms([...audioRooms, newRoom]);
  };

  const handleCreateChat = (chatData) => {
    // Implement API call to create a new chat
    console.log("Creating chat:", chatData);
    // After successful creation, you might want to add the new chat to the chats state
    // setChats([...chats, newChat]);
  };

  const handleCreateCommunity = (communityData) => {
    // Implement API call to create a new community
    console.log("Creating community:", communityData);
    // After successful creation, you might want to add the new community to the chats state
    // setChats([...chats, newCommunity]);
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Live</h2>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-md"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <FaPlus className="inline-block mr-2" />
          Create
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-3 px-6 font-medium text-lg transition duration-300 ease-in-out ${
            activeSection === "chats"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveSection("chats")}
        >
          Chats
        </button>
        <button
          className={`py-3 px-6 font-medium text-lg transition duration-300 ease-in-out ${
            activeSection === "talkieLive"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setActiveSection("talkieLive")}
        >
          Talkie Live
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {activeSection === "chats" && (
        <div className="space-y-4">
          {chats.map((chat) => (
            <ChatCard key={chat.id} chat={chat} />
          ))}
        </div>
      )}

      {activeSection === "talkieLive" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audioRooms.map((room) => (
            <LiveRoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateRoom={handleCreateRoom}
        onCreateChat={handleCreateChat}
        onCreateCommunity={handleCreateCommunity}
      />
    </div>
  );
}
