import React from "react";

const LiveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-black opacity-70" />
      <div className="absolute inset-0 bg-[url('/images/grass-texture.jpg')] bg-cover bg-center opacity-30" />

      {/* Animated color lights */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse-slow opacity-20" />
        <div className="w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse-medium opacity-20 ml-48" />
        <div className="w-96 h-96 bg-green-500 rounded-full filter blur-3xl animate-pulse-fast opacity-20 mt-48" />
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm" />
    </div>
  );
};

export default LiveBackground;
