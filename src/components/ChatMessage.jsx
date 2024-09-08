import React from "react";
import Avatar from "./Avatar";

export default function ChatMessage({ message }) {
  return (
    <div className="flex items-start space-x-3">
      <Avatar src={`/vite.svg`} size="small" />
      <div className="flex-grow bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-sm">{message.user}</span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-sm">{message.message}</p>
      </div>
    </div>
  );
}
