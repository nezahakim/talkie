import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../services/Api";
import Header from "../components/community/Header";
import ChatSendText from "../components/community/ChatSendText";
import MembersList from "../components/community/MembersList";
import useRealTimeUpdates from "../hooks/useRealTimeUpdates";
import { format } from "date-fns";

const privateChat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [showMembers, setShowMembers] = useState(false);
  const chatRef = useRef(null);

  const fetchCommunityData = async () => {
    const [communityInfo, messages, members] = await Promise.all([
      Api.getCommunityInfo(chatId),
      Api.getChatMessages(chatId),
      Api.getCommunityMembers(chatId),
    ]);

    const isAdmin = members.some(
      (member) =>
        (member.user_id === localStorage.getItem("user_id") &&
          member.role === "admin") ||
        "creator",
    );

    return {
      communityInfo,
      messages: messages.reverse(),
      members,
      isAdmin,
    };
  };

  const {
    data: communityData,
    loading,
    error,
    refetch,
  } = useRealTimeUpdates(fetchCommunityData, 5000, [chatId]);

  const handleSendMessage = async (message) => {
    try {
      await Api.sendMessage(chatId, message);
      refetch();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLeaveChat = async () => {
    try {
      await Api.leaveCommunityChat(chatId);
      navigate("/communities");
    } catch (error) {
      console.error("Error leaving chat:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center mt-8">Loading community...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  const { communityInfo, messages, members, isAdmin } = communityData || {};

  const getRandomEmoji = () => {
    const emojis = ["😀", "😍", "🚀", "🎉", "🌈", "🦄", "🍕", "🎸", "🏆", "💡"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const getRandomColor = () => {
    const colors = [
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
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      <Header
        communityInfo={communityInfo}
        membersCount={members?.length}
        onLeave={handleLeaveChat}
        onToggleMembers={() => setShowMembers(!showMembers)}
      />
      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden">
              <div
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 p-4"
                ref={chatRef}
              >
                {messages?.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-3 mb-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      {getRandomEmoji()}
                    </div>
                    <div className="flex-grow">
                      <div className="bg-gray-800 rounded-lg p-3 shadow-md">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="font-bold text-lg"
                            style={{ color: getRandomColor() }}
                          >
                            {message.username}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {format(
                              new Date(message.created_at),
                              "MMM d, yyyy HH:mm",
                            )}
                          </span>
                        </div>
                        <p className="text-white">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-full border-t border-gray-700">
            <ChatSendText onSendMessage={handleSendMessage} />
          </div>
        </div>
        {showMembers && (
          <MembersList
            members={members}
            isAdmin={isAdmin}
            onClose={() => setShowMembers(false)}
          />
        )}
      </div>
    </div>
  );
};

export default privateChat;
