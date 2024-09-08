import React from "react";

function LiveButton({ onClick }) {
  return (
    <>
      <div className="relative">
        <button
          className="fixed right-6 bottom-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full z-50 shadow-2xl hover:scale-110 transition-all duration-500 ease-in-out flex items-center justify-center"
          onClick={onClick}
        >
          🎙️
        </button>

        <div className="fixed right-6 bottom-20 w-10 h-10 rounded-full animate-wave bg-blue-500 opacity-50 z-40"></div>
        <div className="fixed right-6 bottom-20 w-10 h-10 rounded-full animate-wave bg-blue-500 opacity-30 z-30"></div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2.3);
            opacity: 0;
          }
        }

        .animate-wave {
          animation: wave 2s infinite;
        }
      `}</style>
    </>
  );
}

export default LiveButton;
