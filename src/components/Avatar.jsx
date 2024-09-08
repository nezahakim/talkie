import React from "react";

const Avatar = ({ src, size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <img
      src={"/vite.svg"}
      alt="User avatar"
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
    />
  );
};

export default Avatar;
