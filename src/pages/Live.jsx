import React, { useState, useEffect } from "react";
import { FaPlus, FaMicrophone, FaSearch } from "react-icons/fa";
import CreateModal from "../components/CreateModal";
import LiveRoomCard from "../components/LiveRoomCard";
import ChatCard from "../components/ChatCard";
import Api from "../services/Api";

import TrendingTopics from "../components/Explore/TrendingTopics";
import Communities from "../components/Explore/Communities";
import LiveRooms from "../components/Explore/LiveRooms";
import TagCloud from "../components/Explore/TagCloud";

export default function Live() {
  const [activeSection, setActiveSection] = useState("chats");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [audioRooms, setAudioRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchChats();
    fetchAudioRooms();
  }, []);

  const fetchChats = async () => {
    try {
      const allChats = await Api.getAllChats();
      setChats(allChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchAudioRooms = async () => {
    try {
      const rooms = await Api.getRooms();
      setAudioRooms(rooms);
    } catch (error) {
      console.error("Error fetching audio rooms:", error);
    }
  };

  const handleCreateRoom = async (roomData) => {
    try {
      const newRoom = await Api.createRoom(roomData);
      setAudioRooms([...audioRooms, newRoom]);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleCreateChat = async (chatData) => {
    try {
      const newChat = await Api.createPrivateChat(chatData.userId);
      setChats([...chats, newChat]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleCreateCommunity = async (communityData) => {
    try {
      const newCommunity = await Api.createCommunity(communityData);
      setChats([...chats, newCommunity]);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.chat_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredAudioRooms = audioRooms.filter((room) =>
    room.session_title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {activeSection === "chats" && (
        <div className="space-y-4">
          {filteredChats.map((chat) => (
            <ChatCard key={chat.chat_id} chat={chat} />
          ))}
        </div>
      )}
      {activeSection === "talkieLive" && (
        <>
          <TrendingTopics />
          <div className="py-4  mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaMicrophone className="text-red-500 mr-2" />
              Quick Live Rooms
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAudioRooms.map((room) => (
                <LiveRoomCard key={room.session_id} room={room} />
              ))}
            </div>
          </div>
          <Communities />
          <LiveRooms rooms={filteredAudioRooms} />
          <TagCloud />
        </>
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
