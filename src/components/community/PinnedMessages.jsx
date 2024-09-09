import React from 'react';
import { FaThumbtack } from 'react-icons/fa';

const PinnedMessages = ({ messages, onUnpin, isAdmin }) => {
  if (messages.length === 0) return null;

  return (
    <div className="bg-gray-800 p-4 mb-4 rounded-lg">
      <h3 className="text-white font-bold mb-2">Pinned Messages</h3>
      {messages.map((message) => (
        <div key={message.message_id} className="flex items-start space-x-3 mb-2">
          <FaThumbtack className="text-yellow-500 mt-1" />
          <div className="flex-1">
            <span className="text-xs font-semibold text-blue-300">{message.username}</span>
            <p className="text-white">{message.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(message.created_at).toLocaleString()}
            </span>
          </div>
          {isAdmin && (
            <button
              onClick={() => onUnpin(message.message_id)}
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Unpin
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PinnedMessages;
