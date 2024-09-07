import React from "react";

function RecommendationCards() {
    return (
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 flex-grow perspective-1000">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl group hover:rotate-1 cursor-pointer">
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/400x250"
                        alt="Avatar"
                        className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110 filter group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                        <h3 className="text-2xl font-extrabold text-white group-hover:text-indigo-300 transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0">
                            John Doe
                        </h3>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus lacinia odio vitae vestibulum vestibulum. Cras
                        porttitor metus justo, ut fringilla felis pharetra vel.
                    </p>
                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-full hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl">
                        Follow
                    </button>
                </div>
            </div>
            {/* Repeat similar card structure for more recommendations */}
        </section>
    );
}

export default RecommendationCards;
