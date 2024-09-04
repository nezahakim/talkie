// import React from "react";
// import Header from "./Home/Header";
// import RecommendationCards from "./Home/RecommendationCards";
// import Suggestions from "./Home/Suggestions";
// import StartRoom from "./Home/StartRoom";
// import Footer from "./Home/Footer";

// function Home() {
//     return (
//         <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen font-sans antialiased text-gray-900 selection:bg-indigo-500 selection:text-white pb-16 sm:pb-0">
//             <Header />
//             <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
//                 <StartRoom />
//                 <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
//                     <RecommendationCards />
//                     <Suggestions />
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default Home;

import React from "react";
import RecommendationCards from "./Home/RecommendationCards";
import Suggestions from "./Home/Suggestions";
import StartRoom from "./Home/StartRoom";
import Footer from "./Home/Footer";
import ActiveRooms from "../components/ActiveRooms";
import TrendingCommunities from "../components/TrendingCommunities";
import UpcomingEvents from "../components/UpcomingEvents";

function Explore() {
    return (
        <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-900 pb-16 sm:pb-0">
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <StartRoom />
                        <ActiveRooms />
                        <RecommendationCards />
                        <TrendingCommunities />
                    </div>
                    <div className="lg:col-span-1">
                        <Suggestions />
                        <UpcomingEvents />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Explore;
