// import React from "react";
// import LiveBackground from "../components/LiveRoom/LiveBackground";
// import LiveHeader from "../components/LiveRoom/LiveHeader";
// import LiveChat from "../components/LiveRoom/LiveChat";
// import LiveChatSendText from "../components/LiveRoom/LiveChatSendText";
// import LiveSpeakers from "../components/LiveRoom/LiveSpeakers";

// const LiveRoom = () => {
//   return (
//     <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
//       <LiveBackground />
//       <LiveHeader />
//       <div className="flex-1 flex overflow-hidden mt-16">
//         <div className="flex-1 flex flex-col bg-opacity-70 backdrop-filter backdrop-blur-sm">
//           <div className="flex-1 overflow-auto">
//             <LiveChat />
//             <LiveSpeakers />
//           </div>
//           <LiveChatSendText />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveRoom;

import React from "react";
import LiveBackground from "../components/LiveRoom/LiveBackground";
import LiveHeader from "../components/LiveRoom/LiveHeader";
import LiveChat from "../components/LiveRoom/LiveChat";
import LiveChatSendText from "../components/LiveRoom/LiveChatSendText";
import LiveSpeakers from "../components/LiveRoom/LiveSpeakers";

// const LiveStreamLayout = () => {
//   return (
//     <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
//       {/* <LiveBackground className="absolute inset-0" /> */}

//       <LiveHeader className="relative z-10" />

//       <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
//         <div className="flex-1 flex flex-col bg-opacity-70 ">
//           <div className="flex-1 flex overflow-hidden">
//             <div className="w-3/4 flex flex-col overflow-hidden">
//               <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
//                 <LiveChat />
//               </div>
//             </div>
//             <div className="w-1/4 border-l border-gray-700">
//               <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
//                 <div className="h-3"></div>
//                 <LiveSpeakers />
//               </div>
//             </div>
//           </div>
//           <div className="flex-shrink-0 w-full border-t border-gray-700">
//             <LiveChatSendText />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const LiveStreamLayout = () => {
  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900 overflow-hidden z-50">
      <LiveHeader className="relative z-10" />

      <div className="flex-1 flex overflow-hidden mt-16 relative z-9">
        <div className="flex-1 flex flex-col bg-opacity-70">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <LiveChat />
              </div>
            </div>

            <div className="w-1/5 border-l border-gray-700 flex flex-col">
              <div className="flex-grow"></div>
              <div className="h-1/1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <LiveSpeakers />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full border-t border-gray-700">
            <LiveChatSendText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamLayout;
