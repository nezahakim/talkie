import React, { useState } from "react";
import Header from "./pages/Header";
import Explore from "./pages/Explore";
import Live from "./pages/Live";
import Profile from "./pages/Profile";

function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto">
        {activeTab === "explore" && <Explore />}
        {activeTab === "live" && <Live />}
        {activeTab === "profile" && <Profile />}
      </main>
      <div className="py-8"></div>
    </div>
  );
}

export default App;
