import React, { useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThumbtack } from "react-icons/fa";
import ChatSendText from "../components/community/ChatSendText";
import Header from "../components/pc/Header";
import PcStartChat from "../components/pc/PcStartChat";

import { format } from "date-fns";
import { useChatController } from "../hooks/useChatController";
import Api from "../services/Api";
import useRealTimeUpdates from "../hooks/useRealTimeUpdates";

const PrivateChat = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("user_id");
  const chatRef = useRef(null);

  const fetchUserData = async () => {
    const [userData] = await Api.getUserByUserId(userId);

    return {
      userData,
    };
  };

  const {
    data: userData,
    error,
    refetch,
  } = useRealTimeUpdates(fetchUserData, 2000, [userId]);

  const userColors = useMemo(() => {
    const colors = {};
    const colorOptions = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F67280",
      "#C06C84",
      "#6C5B7B",
      "#355C7D",
      "#99B898",
    ];
    userData?.forEach((member, index) => {
      colors[member.user_id] = colorOptions[index % colorOptions.length];
    });
    return colors;
  }, [userData]);

  const {
    messages,
    ListAllChats,
    sendMessage,
    deleteMessage,
    pinMessage,
    unpinMessage,
  } = useChatController(userId, currentUserId, token);

  if (messages.length < 1) {
    ListAllChats();
  }

  const handleSendMessage = (message) => {
    sendMessage(message);
  };

  const userInfo = {
    username: " hello",
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      <Header userInfo={userData} />
      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70 w-full">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden w-full">
              <div
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 py-4 w-full"
                ref={chatRef}
              >
                {<PcStartChat userInfo={userData} />}

                <div className="bg-gray-800 p-4 rounded-lg w-full">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3 mb-2 w-full"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        {message?.profile_picture}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <FaThumbtack className="text-yellow-500 text-xs" />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: userColors[message.user_id] }}
                          >
                            {message.user_id === currentUserId
                              ? "You"
                              : message.full_name}
                          </span>
                        </div>
                        <p className="text-white mt-1">{message.message}</p>
                        <span className="text-xs text-gray-400">
                          {format(
                            new Date(message.created_at),
                            "MMM d, yyyy HH:mm",
                          )}
                        </span>
                      </div>
                      {isAdmin && (
                        <div>
                          <button
                            onClick={() =>
                              message.pinned
                                ? unpinMessage(message.id)
                                : pinMessage(message.id)
                            }
                            className="text-gray-400 hover:text-white transition duration-300 mr-2"
                          >
                            {message.pinned ? "Unpin" : "Pin"}
                          </button>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="text-gray-400 hover:text-white transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-full border-t border-gray-700">
            <ChatSendText onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
