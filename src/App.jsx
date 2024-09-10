// import React, { useState, useContext } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Header from "./components/Header";
// import Explore from "./pages/Explore";
// import Live from "./pages/Live";
// import Profile from "./pages/Profile";
// import LiveStreamLayout from "./pages/LiveRoom";
// import LiveButton from "./components/LiveButton";
// import useMinimizeMaximize from "./hooks/useMinimizeMaximize";
// import Community from "./pages/Community";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import { AuthContext } from "./contexts/AuthContext";

// function App() {
//   const { isAuthenticated, login, logout } = useContext(AuthContext);
//   const [activeTab, setActiveTab] = useState("live");
//   const { maximize, minimize, isMinimized } = useMinimizeMaximize();

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <main className="flex-grow container mx-auto">
//         {isAuthenticated && (
//           <>
//             <Header activeTab={activeTab} setActiveTab={setActiveTab} />
//             <Router>
//               <Routes>
//                 <Route
//                   path="/*"
//                   element={<Navigate to={`/${activeTab}`} replace />}
//                 />
//               </Routes>
//             </Router>
//             <LiveButton onClick={maximize} />
//             {isMinimized && <LiveStreamLayout minimize={minimize} />}
//           </>
//         )}
//         <Router>
//           <Routes>
//             {isAuthenticated ? (
//               <>
//                 <Route
//                   path="/profile/:username"
//                   element={<Profile onLogout={logout} />}
//                 />
//                 <Route path="/community/:chatId" element={<Community />} />
//                 <Route
//                   path="/profile"
//                   element={<Profile onLogout={logout} />}
//                 />
//                 <Route path="/explore" element={<Explore />} />
//                 <Route path="/live" element={<Live />} />
//                 <Route path="/" element={<Live />} />
//               </>
//             ) : (
//               <>
//                 {" "}
//                 <Route path="/*" element={<Navigate to="/login" replace />} />
//                 <Route
//                   path="/register"
//                   element={<Registration onLogin={login} />}
//                 />
//                 <Route path="/login" element={<Login onLogin={login} />} />
//               </>
//             )}
//             <Route path="/*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </Router>
//         <div className="md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-4 z-50 flex flex-col items-center p-2 text-xs mt-1">
//           From Notifycode Inc.
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Explore from "./pages/Explore";
import Live from "./pages/Live";
import Profile from "./pages/Profile";
import LiveStreamLayout from "./pages/LiveRoom";
import LiveButton from "./components/LiveButton";
import useMinimizeMaximize from "./hooks/useMinimizeMaximize";
import Community from "./pages/Community";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("live");
  const { maximize, minimize, isMinimized } = useMinimizeMaximize();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <main className="flex-grow container mx-auto">
          {isAuthenticated ? (
            <>
              <Header activeTab={activeTab} setActiveTab={setActiveTab} />
              <Routes>
                <Route path="/" element={<Live />} />
                <Route
                  path="/profile/:username"
                  element={<Profile onLogout={logout} />}
                />
                <Route path="/community/:chatId" element={<Community />} />
                <Route
                  path="/profile"
                  element={<Profile onLogout={logout} />}
                />
                <Route path="/explore" element={<Explore />} />
                <Route path="/live" element={<Live />} />
                <Route path="/*" element={<Navigate to="/" replace />} />
              </Routes>
              <LiveButton onClick={maximize} />
              {isMinimized && <LiveStreamLayout minimize={minimize} />}
            </>
          ) : (
            <Routes>
              <Route
                path="/register"
                element={<Registration onLogin={login} />}
              />
              <Route path="/login" element={<Login onLogin={login} />} />
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
          <div className="md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-4 z-50 flex flex-col items-center p-2 text-xs mt-1">
            From Notifycode Inc.
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
