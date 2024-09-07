import React from "react";
import { FaFire, FaUsers } from "react-icons/fa";

function TrendingCommunities() {
    const communities = [
        {
            id: 1,
            name: "Tech Enthusiasts",
            members: 15000,
            description: "Discuss the latest in technology",
        },
        {
            id: 2,
            name: "Bookworms Unite",
            members: 8000,
            description: "For avid readers and book lovers",
        },
        {
            id: 3,
            name: "Fitness Fanatics",
            members: 12000,
            description: "Share fitness tips and motivation",
        },
    ];

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaFire className="text-orange-500 mr-2" />
                Trending Communities
            </h2>
            <div className="space-y-4">
                {communities.map((community) => (
                    <div
                        key={community.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">
                            {community.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                            {community.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-2 text-gray-600">
                            <FaUsers className="text-indigo-500" />
                            <span>
                                {community.members.toLocaleString()} members
                            </span>
                        </div>
                        <button className="mt-3 w-full bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-300">
                            Join Community
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TrendingCommunities;
