import React from "react";
import { FaUsers, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

function ActiveRooms() {
    const rooms = [
        {
            id: 1,
            name: "Tech Talk: AI and the Future",
            participants: 120,
            speakers: ["John Doe", "Jane Smith"],
        },
        {
            id: 2,
            name: "Mindfulness Meditation",
            participants: 45,
            speakers: ["Alice Johnson"],
        },
        {
            id: 3,
            name: "Music Jam Session",
            participants: 80,
            speakers: ["Bob Wilson", "Carol Taylor"],
        },
    ];

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Active Rooms
            </h2>
            <div className="space-y-4">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">
                            {room.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-2 text-gray-600">
                            <FaUsers className="text-indigo-500" />
                            <span>{room.participants} listening</span>
                        </div>
                        <div className="mt-2">
                            {room.speakers.map((speaker, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mr-2 mb-2"
                                >
                                    {index === 0 ? (
                                        <FaMicrophone className="mr-1 text-green-500" />
                                    ) : (
                                        <FaMicrophoneSlash className="mr-1 text-gray-500" />
                                    )}
                                    {speaker}
                                </span>
                            ))}
                        </div>
                        <button className="mt-3 w-full bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-300">
                            Join Room
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ActiveRooms;
