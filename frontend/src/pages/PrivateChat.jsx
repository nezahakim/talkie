import React from "react";
import LiveBackground from "../components/LiveRoom/LiveBackground";
import LiveHeader from "../components/LiveRoom/LiveHeader";
import LiveChat from "../components/LiveRoom/LiveChat";
import LiveChatSendText from "../components/LiveRoom/LiveChatSendText";
import LiveSpeakers from "../components/LiveRoom/LiveSpeakers";

const PrivateChat = ({ minimize }) => {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      <LiveHeader minimize={minimize} className="relative z-10" />

      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <LiveChat />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full border-t border-gray-700">
            <LiveChatSendText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChat;
