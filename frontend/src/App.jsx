import React, { useState } from "react";
import Header from "./pages/Header";
import Explore from "./pages/Explore";
import Live from "./pages/Live";
import Profile from "./pages/Profile";
import LiveStreamLayout from "./pages/LiveRoom";
import LiveButton from "./components/LiveButton";
import useMinimizeMaximize from "./hooks/useMinimizeMaximize";

function App() {
  const [activeTab, setActiveTab] = useState("live");
  const { maximize, minimize, isMinimized } = useMinimizeMaximize();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto">
        {activeTab === "explore" && <Explore />}
        {activeTab === "live" && <Live />}
        {activeTab === "profile" && <Profile />}
      </main>

      <LiveButton onClick={maximize} />
      {isMinimized && <LiveStreamLayout minimize={minimize} />}
    </div>
  );
}

export default App;
