import React from "react";

export default function Footer() {
    return (
        <footer className="mt-12 p-6 bg-gray-800 text-white text-center rounded-lg shadow-lg">
            <p>&copy; 2024 Talkie. All rights reserved.</p>
            <nav className="mt-4 flex justify-center space-x-6">
                <a href="#" className="hover:underline">
                    Privacy
                </a>
                <a href="#" className="hover:underline">
                    Terms
                </a>
                <a href="#" className="hover:underline">
                    Contact
                </a>
            </nav>
        </footer>
    );
}
