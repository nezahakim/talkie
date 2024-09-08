import React from "react";

export const Button = ({ children, variant = "primary", ...props }) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline:
      "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 focus:ring-blue-500",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div className="flex flex-col">
    {label && (
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    )}
    <input
      ref={ref}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
));

export const Select = React.forwardRef(({ label, children, ...props }, ref) => (
  <div className="flex flex-col">
    {label && (
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    )}
    <select
      ref={ref}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    >
      {children}
    </select>
  </div>
));

export const Alert = ({ children, variant = "info" }) => {
  const variantStyles = {
    info: "bg-blue-100 text-blue-800 border-blue-500",
    success: "bg-green-100 text-green-800 border-green-500",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-500",
    error: "bg-red-100 text-red-800 border-red-500",
  };

  return (
    <div className={`p-4 mb-4 rounded-md border-l-4 ${variantStyles[variant]}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);

export const Textarea = React.forwardRef(({ label, ...props }, ref) => (
  <div className="flex flex-col">
    {label && (
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    )}
    <textarea
      ref={ref}
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      {...props}
    />
  </div>
));

export const Switch = React.forwardRef(({ label, ...props }, ref) => (
  <div className="flex items-center">
    {label && (
      <label className="mr-2 text-sm font-medium text-gray-700">{label}</label>
    )}
    <div className="relative">
      <input type="checkbox" ref={ref} className="sr-only" {...props} />
      <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner">
        <div
          className={`absolute top-0 left-0 w-6 h-6 bg-blue-500 rounded-full transform transition-transform ${
            props.checked ? "translate-x-4" : ""
          }`}
        />
      </div>
    </div>
  </div>
));
