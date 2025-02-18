import React from "react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white text-sm md:text-base md:p-2">
      <p className="text-center">
        &copy; {new Date().getFullYear()} Alt-West Connect. All rights reserved.
      </p>
    </footer>
  );
}

// Footer does not need to be sticky because the main content area takes up the remaining space. This is set up in Layout.jsx.
