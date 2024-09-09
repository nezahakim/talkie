// import React from "react";
// import Header from "../components/community/Header";
// import Chat from "../components/community/Chat";
// import { useParams } from "react-router-dom";

// const Community = () => {
//   const { chatId } = useParams();

//   return (
//     <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
//       <Header className="relative z-10" />

//       <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
//         <div className="flex-1 flex flex-col bg-opacity-70">
//           <div className="flex-1 flex overflow-hidden">
//             <div className="flex-grow flex flex-col overflow-hidden">
//               <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
//                 <Chat />
//               </div>
//             </div>
//           </div>

//           <div className="flex-shrink-0 w-full border-t border-gray-700">
//             <ChatSendText />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Community;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../services/Api";
import Header from "../components/community/Header";
import Chat from "../components/community/Chat";
import ChatSendText from "../components/community/ChatSendText";
import PinnedMessages from "../components/community/PinnedMessages";
import MembersList from "../components/community/MembersList";

const Community = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchCommunityInfo(),
          fetchMessages(),
          fetchPinnedMessages(),
          fetchMembers(),
        ]);
        initWebSocket();
      } catch (error) {
        console.error("Error fetching community data:", error);
        setError("Failed to load community data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [chatId]);

  const fetchCommunityInfo = async () => {
    const response = await Api.getCommunityChats();
    const community = response.find((c) => c.chat_id === chatId);
    if (community) {
      setCommunityInfo(community);
    } else {
      throw new Error("Community not found");
    }
  };

  const fetchMessages = async () => {
    const fetchedMessages = await Api.getChatMessages(chatId);
    setMessages(fetchedMessages.reverse());
  };

  const fetchPinnedMessages = async () => {
    const fetchedPinnedMessages = await Api.getChatMessages(
      chatId,
      10,
      0,
      true,
    );
    setPinnedMessages(fetchedPinnedMessages);
  };

  const fetchMembers = async () => {
    const fetchedMembers = await Api.getCommunityMembers(chatId);
    setMembers(fetchedMembers);
    setIsAdmin(
      fetchedMembers.some(
        (member) =>
          member.user_id === localStorage.getItem("user_id") &&
          member.role === "admin",
      ),
    );
  };

  const initWebSocket = () => {
    wsRef.current = Api.connectToChat(chatId, {
      onMessage: (data) => {
        if (data.type === "new_message") {
          setMessages((prevMessages) => [data.message, ...prevMessages]);
        } else if (data.type === "pin_message") {
          setPinnedMessages((prevPinned) => [data.message, ...prevPinned]);
        } else if (data.type === "unpin_message") {
          setPinnedMessages((prevPinned) =>
            prevPinned.filter((msg) => msg.message_id !== data.message_id),
          );
        }
      },
      onError: (error) => {
        console.error("WebSocket error:", error);
        setError("Lost connection to the server. Please refresh the page.");
      },
    });
  };

  const handleSendMessage = async (message) => {
    try {
      const sentMessage = await Api.sendMessage(chatId, message);
      setMessages((prevMessages) => [sentMessage, ...prevMessages]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    }
  };

  const handlePinMessage = async (messageId) => {
    try {
      await Api.pinMessage(chatId, messageId);
      fetchPinnedMessages();
    } catch (error) {
      console.error("Error pinning message:", error);
      setError("Failed to pin message. Please try again.");
    }
  };

  const handleUnpinMessage = async (messageId) => {
    try {
      await Api.unpinMessage(chatId, messageId);
      fetchPinnedMessages();
    } catch (error) {
      console.error("Error unpinning message:", error);
      setError("Failed to unpin message. Please try again.");
    }
  };

  const handleLeaveChat = async () => {
    try {
      await Api.leaveCommunityChat(chatId);
      navigate("/communities");
    } catch (error) {
      console.error("Error leaving chat:", error);
      setError("Failed to leave the community. Please try again.");
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

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      <Header
        communityInfo={communityInfo}
        membersCount={members.length}
        onLeave={handleLeaveChat}
        onToggleMembers={() => setShowMembers(!showMembers)}
      />
      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden">
              <div
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300"
                ref={chatRef}
              >
                <PinnedMessages
                  messages={pinnedMessages}
                  onUnpin={handleUnpinMessage}
                  isAdmin={isAdmin}
                />
                <Chat
                  messages={messages}
                  onPin={handlePinMessage}
                  isAdmin={isAdmin}
                />
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

export default Community;
