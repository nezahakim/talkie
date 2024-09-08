import React from "react";
import { FaCalendar, FaClock } from "react-icons/fa";

function UpcomingEvents() {
    const events = [
        {
            id: 1,
            name: "AI in Healthcare",
            date: "2023-06-15",
            time: "14:00",
            host: "Dr. Emily Chen",
        },
        {
            id: 2,
            name: "Creative Writing Workshop",
            date: "2023-06-18",
            time: "18:30",
            host: "Author Mark Johnson",
        },
        {
            id: 3,
            name: "Financial Planning 101",
            date: "2023-06-20",
            time: "20:00",
            host: "Sarah Thompson, CFA",
        },
    ];

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Upcoming Events
            </h2>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors duration-300"
                    >
                        <h3 className="text-lg font-semibold text-gray-800">
                            {event.name}
                        </h3>
                        <p className="text-gray-600 mt-1">
                            Hosted by {event.host}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-gray-600">
                            <div className="flex items-center">
                                <FaCalendar className="text-indigo-500 mr-1" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="text-indigo-500 mr-1" />
                                <span>{event.time}</span>
                            </div>
                        </div>
                        <button className="mt-3 w-full bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-md hover:bg-indigo-200 transition-colors duration-300">
                            Set Reminder
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UpcomingEvents;
