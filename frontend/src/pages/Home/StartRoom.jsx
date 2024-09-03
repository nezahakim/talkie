import React from "react";

function StartRoom() {
    return (
        <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 animate-pulse">
                Start a Room
            </h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <input
                    type="text"
                    placeholder="Room name"
                    className="w-full sm:w-2/3 p-3 sm:p-4 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 ease-in-out shadow-inner"
                />
                <button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-full hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl text-lg">
                    Create Room
                </button>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
                Start a new room and invite your friends to join the
                conversation!
            </p>
        </section>
    );
}

export default StartRoom;
