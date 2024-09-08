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
  const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/live" element={<Live />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? <MainApp /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
