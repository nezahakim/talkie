import React, { createContext, useState, useContext, useEffect } from "react";

const LiveHeaderContext = createContext();

export const LiveHeaderProvider = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(() => {
    const storedValue = localStorage.getItem("isLiveMinimized");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLiveMinimized", JSON.stringify(isMinimized));
  }, [isMinimized]);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
    return !isMinimized; // Return the new state
  };

  const minimize = () => {
    setIsMinimized(true);
    return true;
  };

  const maximize = () => {
    setIsMinimized(false);
    return false;
  };

  return (
    <LiveHeaderContext.Provider
      value={{ isMinimized, toggleMinimize, minimize, maximize }}
    >
      {children}
    </LiveHeaderContext.Provider>
  );
};

export const useLiveHeader = () => useContext(LiveHeaderContext);
