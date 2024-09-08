// import React from "react";
// import Suggestions from "../components/Suggestions";
// import Footer from "../components/Footer";
// import ActiveRooms from "../components/ActiveRooms";
// import TrendingCommunities from "../components/TrendingCommunities";
// import UpcomingEvents from "../components/UpcomingEvents";

// function Explore() {
//     return (
//         <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-900 pb-16 sm:pb-0">
//             <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     <div className="lg:col-span-2 space-y-8">
//                         <ActiveRooms />
//                         <TrendingCommunities />
//                     </div>
//                     <div className="lg:col-span-1">
//                         <Suggestions />
//                         <UpcomingEvents />
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default Explore;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaTags } from "react-icons/fa";
import ExploreCard from "../components/Explore/ExploreCard";
import FilterModal from "../components/Explore/FilterModal";
import TagCloud from "../components/Explore/TagCloud";
import TrendingTopics from "../components/Explore/TrendingTopics";
import RecommendedForYou from "../components/Explore/RecommendedForYou";
import Communities from "../components/Explore/Communities";
import LiveRooms from "../components/Explore/LiveRooms";

const Explore = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        const filtered = items.filter(
            (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                applyFilters(item, filters),
        );
        setFilteredItems(filtered);
    }, [searchQuery, items, filters]);

    const fetchItems = async () => {
        const response = await fetch("/api/explore-items");
        const data = await response.json();
        setItems(data);
    };

    const applyFilters = (item, filters) => {
        return Object.entries(filters).every(
            ([key, value]) => item[key] === value || value === "",
        );
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setIsFilterModalOpen(false);
    };
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="relative h-44 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                    src="/vite.svg"
                    alt="Explore"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white shadow-lg">
                        Explore
                    </h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                            onClick={toggleFilterModal}
                            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out"
                        >
                            <FaFilter />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                <TrendingTopics />

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <Communities />
                        <LiveRooms />
                        <h2 className="text-2xl font-semibold mb-4">
                            Discover
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {filteredItems.map((item) => (
                                <ExploreCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/3 space-y-8">
                        <RecommendedForYou />
                        <TagCloud />
                    </div>
                </div>
            </div>

            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={toggleFilterModal}
                onApply={handleFilterChange}
                currentFilters={filters}
            />
        </div>
    );
};

export default Explore;
