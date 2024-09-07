// import React from "react";

// function StartRoom() {
//     return (
//         <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl">
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 animate-pulse">
//                 Start a Room
//             </h2>
//             <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//                 <input
//                     type="text"
//                     placeholder="Room name"
//                     className="w-full sm:w-2/3 p-3 sm:p-4 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 ease-in-out shadow-inner"
//                 />
//                 <button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl text-lg">
//                     Create Room
//                 </button>
//             </div>
//             <p className="mt-4 text-gray-600 text-sm">
//                 Start a new room and invite your friends to join the
//                 conversation!
//             </p>
//         </section>
//     );
// }

// export default StartRoom;

import React, { useState } from "react";
import { FaMicrophone, FaVideo, FaLock, FaGlobe } from "react-icons/fa";

function StartRoom() {
    const [isPrivate, setIsPrivate] = useState(false);
    const [roomType, setRoomType] = useState("audio");

    return (
        <section className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Start a Room
            </h2>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Room name"
                    className="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300"
                />
                <div className="flex space-x-4">
                    <button
                        onClick={() => setRoomType("audio")}
                        className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                            roomType === "audio"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        <FaMicrophone className="inline-block mr-2" /> Audio
                    </button>
                    <button
                        onClick={() => setRoomType("video")}
                        className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                            roomType === "video"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        <FaVideo className="inline-block mr-2" /> Video
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                            />
                            <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner transition-all duration-300"></div>
                            <div
                                className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 left-1 transition-all duration-300 ${isPrivate ? "transform translate-x-4" : ""}`}
                            ></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium">
                            {isPrivate ? "Private" : "Public"}
                        </div>
                    </label>
                    {isPrivate ? (
                        <FaLock className="text-gray-600" />
                    ) : (
                        <FaGlobe className="text-gray-600" />
                    )}
                </div>
                <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0">
                    Create Room
                </button>
            </div>
        </section>
    );
}

export default StartRoom;
