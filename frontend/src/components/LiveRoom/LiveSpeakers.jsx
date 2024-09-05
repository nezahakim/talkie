// import React, { useState } from "react";
// import { FaMicrophone, FaPlus, FaUserPlus } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const speakers = [
//   {
//     id: 1,
//     name: "Alice",
//     isCreator: true,
//     profilePic: "/path-to-alice-profile.jpg",
//   },
//   {
//     id: 2,
//     name: "Bob",
//     isCreator: false,
//     profilePic: "/path-to-bob-profile.jpg",
//   },
//   {
//     id: 3,
//     name: "Charlie",
//     isCreator: false,
//     profilePic: "/path-to-charlie-profile.jpg",
//   },
//   // More speakers...
// ];

// const LiveSpeakers = () => {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [showAllSpeakers, setShowAllSpeakers] = useState(false);

//   const toggleFollow = () => setIsFollowing(!isFollowing);

//   const creator = speakers.find((speaker) => speaker.isCreator);
//   const nonCreators = speakers.filter((speaker) => !speaker.isCreator);

//   return (
//     <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-4">
//       {/* Creator */}
//       <motion.div
//         className="relative"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <img
//           src={creator.profilePic}
//           alt={`${creator.name}'s profile`}
//           className="w-12 h-12 rounded-full object-cover border-2 border-white"
//         />
//         <motion.button
//           className={`absolute -bottom-2 -left-2 p-2 rounded-full text-white ${
//             isFollowing ? "bg-gray-500" : "bg-red-500"
//           }`}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={toggleFollow}
//         >
//           {isFollowing ? <FaUserPlus size={14} /> : <FaPlus size={14} />}
//         </motion.button>
//       </motion.div>

//       {/* Non-Creators */}
//       <div className="relative">
//         <motion.div className="flex -space-x-2">
//           <AnimatePresence>
//             {nonCreators
//               .slice(0, showAllSpeakers ? undefined : 3)
//               .map((speaker, index) => (
//                 <motion.div
//                   key={speaker.id}
//                   className="relative"
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0, opacity: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.1 }}
//                 >
//                   <img
//                     src={speaker.profilePic}
//                     alt={`${speaker.name}'s profile`}
//                     className="w-8 h-8 rounded-full object-cover border-2 border-white"
//                   />
//                   <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                     {index + 1}
//                   </div>
//                 </motion.div>
//               ))}
//           </AnimatePresence>
//         </motion.div>
//         {nonCreators.length > 3 && (
//           <motion.button
//             className="ml-2 text-sm text-blue-500 font-semibold"
//             onClick={() => setShowAllSpeakers(!showAllSpeakers)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {showAllSpeakers ? "Show less" : `+${nonCreators.length - 3} more`}
//           </motion.button>
//         )}
//       </div>

//       {/* Request Mic Button */}
//       <motion.button
//         className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <FaMicrophone size={14} />
//         <span>Request Mic</span>
//       </motion.button>
//     </div>
//   );
// };

// export default LiveSpeakers;

import React, { useState } from "react";
import { FaMicrophone, FaPlus, FaUserPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const speakers = [
  {
    id: 1,
    name: "Alice",
    isCreator: true,
    profilePic: "/path-to-alice-profile.jpg",
  },
  {
    id: 2,
    name: "Bob",
    isCreator: false,
    profilePic: "/path-to-bob-profile.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    isCreator: false,
    profilePic: "/path-to-charlie-profile.jpg",
  },
  // More speakers...
];

const LiveSpeakers = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllSpeakers, setShowAllSpeakers] = useState(false);

  const toggleFollow = () => setIsFollowing(!isFollowing);

  const creator = speakers.find((speaker) => speaker.isCreator);
  const nonCreators = speakers.filter((speaker) => !speaker.isCreator);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col-reverse items-end space-y-reverse space-y-2">
      {/* Request Mic Button */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <FaPlus size={14} className="text-gray-600" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          <FaMicrophone size={10} />
        </div>
      </motion.div>

      {/* Non-Creators */}
      <AnimatePresence>
        {nonCreators
          .slice(0, showAllSpeakers ? undefined : 3)
          .map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <img
                src={speaker.profilePic}
                alt={`${speaker.name}'s profile`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div className="absolute -bottom-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {index + 1}
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {nonCreators.length > 3 && (
        <motion.button
          className="text-sm text-blue-500 font-semibold"
          onClick={() => setShowAllSpeakers(!showAllSpeakers)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAllSpeakers ? "Show less" : `+${nonCreators.length - 3} more`}
        </motion.button>
      )}

      {/* Creator */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={creator.profilePic}
          alt={`${creator.name}'s profile`}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <motion.button
          className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
            isFollowing ? "bg-gray-500" : "bg-red-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFollow}
        >
          {isFollowing ? <FaUserPlus size={12} /> : <FaPlus size={12} />}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LiveSpeakers;
