import React, { useState } from "react";
import { FaUsers, FaMicrophone, FaUserFriends, FaTimes } from "react-icons/fa";

export default function CreateModal({
  isOpen,
  onClose,
  onCreateRoom,
  onCreateChat,
  onCreateCommunity,
}) {
  const [creationType, setCreationType] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (creationType) {
      case "room":
        onCreateRoom(formData);
        setCreationType(null);
        break;
      case "chat":
        onCreateChat(formData);
        setCreationType(null);
        break;
      case "community":
        onCreateCommunity(formData);
        setCreationType(null);
        break;
    }
    onClose();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {!creationType ? (
          <div className="space-y-4">
            <button
              onClick={() => setCreationType("room")}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-100 text-indigo-600 p-4 rounded-lg hover:bg-indigo-200"
            >
              <FaMicrophone />
              <span>Create Room</span>
            </button>
            <button
              onClick={() => setCreationType("chat")}
              className="w-full flex items-center justify-center space-x-2 bg-green-100 text-green-600 p-4 rounded-lg hover:bg-green-200"
            >
              <FaUserFriends />
              <span>Create Chat</span>
            </button>
            <button
              onClick={() => setCreationType("community")}
              className="w-full flex items-center justify-center space-x-2 bg-yellow-100 text-yellow-600 p-4 rounded-lg hover:bg-yellow-200"
            >
              <FaUsers />
              <span>Create Community</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {creationType === "room" && (
              <>
                <input
                  type="text"
                  name="session_title"
                  placeholder="Room Title"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                ></textarea>
                <select
                  name="language"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  {/* Add more language options */}
                </select>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_private"
                      onChange={(e) =>
                        handleInputChange({
                          target: {
                            name: "is_private",
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                    <span className="ml-2">Private Room</span>
                  </label>
                </div>
              </>
            )}

            {creationType === "chat" && (
              <input
                type="text"
                name="recipient"
                placeholder="Recipient Username"
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            )}

            {creationType === "community" && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Community Name"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Community Description"
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                ></textarea>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
            >
              Create{" "}
              {creationType.charAt(0).toUpperCase() + creationType.slice(1)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
