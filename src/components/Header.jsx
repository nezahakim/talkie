import React from "react";
import { FaUser, FaSearch, FaMicrophone, FaBell } from "react-icons/fa";

export default function Header({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "live", icon: <FaMicrophone />, label: "Live" },
        { id: "p", icon: <FaUser />, label: "Profile" },
    ];

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-2 sm:py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
                            Talkie+
                        </h1>
                        <div className="hidden md:flex space-x-4">
                            {tabs.map((tab) => (
                                <a
                                    key={tab.id}
                                    href={`#${tab.id}`}
                                    className={`flex items-center space-x-1 text-sm font-medium ${
                                        activeTab === tab.id
                                            ? "text-indigo-600"
                                            : "text-gray-600 hover:text-indigo-600"
                                    }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full sm:w-64 py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button className="sm:hidden bg-gray-100 p-2 rounded-full">
                            <FaSearch className="text-gray-600" />
                        </button>
                        <button className="bg-gray-100 p-2 rounded-full">
                            <FaBell className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        href={`#${tab.id}`}
                        className={`flex flex-col items-center p-2 ${
                            activeTab === tab.id
                                ? "text-indigo-600"
                                : "text-gray-600"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span className="text-xs mt-1">{tab.label}</span>
                    </a>
                ))}
            </nav>
        </header>
    );
}
