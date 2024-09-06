// import React from "react";
// import { FaMinusCircle, FaUsers } from "react-icons/fa";

// const LiveHeader = () => {
//   return (
//     <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-700/80 border-b border-gray-600 shadow-lg z-10 backdrop-blur-sm">
//       <div className="flex items-center space-x-4">
//         <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg px-4 py-2 rounded-2xl">
//           Live
//         </div>
//         <div className="flex items-center space-x-2">
//           <div className="flex -space-x-2">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <img
//                 key={i}
//                 src={`/images/profile${i}.jpg`}
//                 alt={`Profile ${i}`}
//                 className="w-8 h-8 rounded-full object-cover border-2 border-gray-800 shadow-md transform hover:scale-110 transition-transform duration-200"
//               />
//             ))}
//           </div>
//           <div className="flex items-center justify-center bg-gray-700/60 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md">
//             <FaUsers className="mr-1" size={10} />
//             20
//           </div>
//           <span className="text-white text-sm font-medium">listening...</span>
//         </div>
//       </div>
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center justify-center bg-gray-700/60 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md">
//           01:30
//         </div>
//         <button className="px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition duration-300 shadow-md">
//           Leave
//         </button>
//         <button className="text-gray-300 hover:text-white transition duration-300">
//           <FaMinusCircle size={24} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveHeader;

import React from "react";
import { FaMinusCircle, FaMicrophone, FaUsers } from "react-icons/fa";

const LiveHeader = () => {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 bg-opacity-80 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 border-b border-gray-600 shadow-lg z-10 h-20 sm:h-24 rounded-b-3xl ">
      <div className="flex flex-col items-start">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center px-3 py-1 rounded-full text-white text-14 font-bold shadow-md">
          <FaMicrophone className="mr-1" size={14} />
          Tech Enthusiasm
        </div>
        <div className="flex items-center mt-1 sm:mt-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`/vite.svg`}
                alt={`Profile ${i}`}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-gray-800 shadow-md"
              />
            ))}
          </div>
          <div className="flex items-center justify-center px-0.5 py-0 rounded-full text-white text-xs font-bold shadow-md">
            +
          </div>
          <div className="flex items-center justify-center bg-gray-700/60 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md">
            <FaUsers className="mr-1" size={10} />
            20
          </div>
          <span className="text-white text-xs sm:text-sm font-medium ml-2">
            listening...
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="flex flex-col items-end">
          <div className="flex items-center justify-center bg-gray-700/60 px-3 py-1 rounded-full text-white text-xs font-bold shadow-md">
            01:30
          </div>
        </div>
        <button className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 text-white text-xs sm:text-sm font-bold rounded-full hover:bg-red-700 transition duration-300 shadow-md">
          Leave
        </button>
        <button className="text-gray-300 hover:text-white transition duration-300">
          <FaMinusCircle size={20} sm:size={24} />
        </button>
      </div>
    </div>
  );
};

export default LiveHeader;
