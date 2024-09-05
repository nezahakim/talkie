import React from "react";
import LiveBackground from "../components/LiveRoom/LiveBackground";
import LiveHeader from "../components/LiveRoom/LiveHeader";
import LiveChat from "../components/LiveRoom/LiveChat";
import LiveChatSendText from "../components/LiveRoom/LiveChatSendText";
import LiveSpeakers from "../components/LiveRoom/LiveSpeakers";

const LiveRoom = () => {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      <LiveBackground />
      <LiveHeader />
      <div className="flex-1 flex overflow-hidden mt-16">
        <div className="flex-1 flex flex-col bg-opacity-70 backdrop-filter backdrop-blur-sm">
          <div className="flex-1 overflow-auto">
            <LiveChat />
          </div>
          <LiveChatSendText />
        </div>
      </div>
      <LiveSpeakers />
    </div>
  );
};

export default LiveRoom;
