import React, { useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThumbtack } from "react-icons/fa";
import Api from "../services/Api";
import Header from "../components/community/Header";
import ChatSendText from "../components/community/ChatSendText";
import MembersList from "../components/community/MembersList";
import useRealTimeUpdates from "../hooks/useRealTimeUpdates";
import CommunityWelcomeMessage from "../components/community/CommunityWelcomeMessage";
import { format } from "date-fns";

const Community = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [showMembers, setShowMembers] = useState(false);
  const chatRef = useRef(null);

  const currentUserId = localStorage.getItem("userId");

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
  const handleJoinCommunity = async () => {
    try {
      await Api.joinCommunityChat(chatId);
      // navigate("/communities/" + chatId);
    } catch (error) {
      console.error("Error leaving chat:", error);
    }
  };

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
    communityData?.members?.forEach((member, index) => {
      colors[member.user_id] = colorOptions[index % colorOptions.length];
    });
    return colors;
  }, [communityData?.members]);

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

  // if (loading) {
  //   return (
  //     <div className="text-white text-center mt-8">Loading community...</div>
  //   );
  // }

  // if (error) {
  //   return <div className="text-red-500 text-center mt-8">{error}</div>;
  // }

  const { communityInfo, messages, members, isAdmin } = communityData || {};

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      {/* <Header
        communityInfo={communityInfo}
        membersCount={members?.length}
        onLeave={handleLeaveChat}
        onToggleMembers={() => setShowMembers(!showMembers)}
      /> */}
      <Header
        communityInfo={communityInfo}
        members={members}
        currentUserId={localStorage.getItem("user_id")} // You'll need to provide this
        onLeave={handleLeaveChat}
        onToggleMembers={() => setShowMembers(!showMembers)}
      />
      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70 w-full">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden w-full">
              <div
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 py-4 w-full"
                ref={chatRef}
              >
                {communityInfo && (
                  <CommunityWelcomeMessage
                    communityInfo={communityInfo}
                    membersCount={members?.length || 0}
                  />
                )}
                <div className="bg-gray-800 p-4 rounded-lg w-full">
                  {messages?.map((message) => (
                    <div
                      key={message.message_id}
                      className="flex items-start space-x-3 mb-2 w-full"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        {getRandomEmoji()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <FaThumbtack className="text-yellow-500 text-xs" />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: userColors[message.user_id] }}
                          >
                            {message.username}
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
                        <button
                          onClick={() => {
                            /* Add pin functionality here */
                          }}
                          className="text-gray-400 hover:text-white transition duration-300"
                        >
                          Pin
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-full border-t border-gray-700">
            {member.user_id == currentUserId ? (
              <ChatSendText onSendMessage={handleSendMessage} />
            ) : (
              <button
                className="text-gray-400 hover:text-white transition duration-300"
                onClick={handleJoinCommunity}
              >
                Join Community
              </button>
            )}
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

export default Community;
