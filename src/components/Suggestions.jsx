import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function Suggestions() {
    const getUsers = useState({
        name: "",
        username: "",
        avatar: "",
    });

    useEffect(() => {
        const fetch = axios.get("https://randomuser.me/api/?results=10");
        fetch
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const suggestedUsers = [
        {
            name: "Jane Smith",
            username: "@janesmith",
            avatar: "https://via.placeholder.com/100",
        },
        {
            name: "John Doe",
            username: "@johndoe",
            avatar: "https://via.placeholder.com/100",
        },
        {
            name: "Alice Johnson",
            username: "@alicej",
            avatar: "https://via.placeholder.com/100",
        },
    ];

    return (
        <aside className="bg-white rounded-lg shadow p-6 ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Who to follow
            </h2>
            <ul className="space-y-4">
                {suggestedUsers.map((user, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium text-gray-800">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.username}
                                </p>
                            </div>
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800 focus:outline-none">
                            <FaUserPlus />
                        </button>
                    </li>
                ))}
            </ul>
            <a
                href="#"
                className="block mt-6 text-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
                Show more
            </a>
        </aside>
    );
}

export default Suggestions;
