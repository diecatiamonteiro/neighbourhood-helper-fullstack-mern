import React from "react";

export default function Spinner({ size = "md", variant = "primary" }) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-4",
  };

  const variants = {
    primary: "border-t-olive",
    secondary: "border-t-brick",
    white: "border-t-white",
    charcoal: "border-t-charcoal",
  };

  return (
    <div
      className={`
        ${sizes[size]} 
        ${variants[variant]}
        rounded-full 
        border-gray-200/25
        animate-spin 
        mx-auto
      `}
      role="status"
      aria-label="loading"
    />
  );
}
