import { useState, useEffect } from "react";

// Custom hook for minimizing/maximizing
const useMinimizeMaximize = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Store the state in localStorage whenever it changes
    localStorage.setItem("isLiveMinimized", JSON.stringify(isMinimized));
  }, [isMinimized]);

  // Toggle between minimized and maximized
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
    return !isMinimized; // Return the updated state
  };

  const minimize = () => {
    setIsMinimized(false);
    console.log(isMinimized);
    return true;
  };

  const maximize = () => {
    console.log(isMinimized);
    setIsMinimized(!isMinimized);
    return false;
  };

  return { isMinimized, toggleMinimize, minimize, maximize };
};

export default useMinimizeMaximize;
