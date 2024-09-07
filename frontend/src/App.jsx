// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./pages/Header";
// import Explore from "./pages/Explore";
// import Live from "./pages/Live";
// import Profile from "./pages/Profile";
// import LiveStreamLayout from "./pages/LiveRoom";
// import PrivateChat from "./pages/PrivateChat";
// import LiveButton from "./components/LiveButton";
// import useMinimizeMaximize from "./hooks/useMinimizeMaximize";
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";

// function App() {
//   const [activeTab, setActiveTab] = useState("live");
//   const { maximize, minimize, isMinimized } = useMinimizeMaximize();

//   return (
//     <>
//       {" "}
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         <Header activeTab={activeTab} setActiveTab={setActiveTab} />
//         <main className="flex-grow container mx-auto">
//           {activeTab === "explore" && <Explore />}
//           {activeTab === "live" && <Live />}
//           {activeTab === "profile" && <Profile />}
//           {activeTab === "privateChat" && <PrivateChat />}
//         </main>

//         <LiveButton onClick={maximize} />
//         {isMinimized && <LiveStreamLayout minimize={minimize} />}
//       </div>
//       <Router>
//         <Routes>
//           <Route path="/register" element={<Registration />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Login />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
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
import PrivateChat from "./pages/PrivateChat";
import LiveButton from "./components/LiveButton";
import useMinimizeMaximize from "./hooks/useMinimizeMaximize";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function MainApp() {
  const [activeTab, setActiveTab] = useState("live");
  const { maximize, minimize, isMinimized } = useMinimizeMaximize();

  const renderContent = () => {
    switch (activeTab) {
      case "explore":
        return <Explore />;
      case "live":
        return <Live />;
      case "profile":
        return <Profile />;
      case "privateChat":
        return <PrivateChat />;
      default:
        return <Live />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto">{renderContent()}</main>
      <LiveButton onClick={maximize} />
      {isMinimized && <LiveStreamLayout minimize={minimize} />}
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <MainApp onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
