import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Main container <div> needs a min-height of 100vh to ensure the footer is always at the bottom of the page. Flex-grow ensures the main content area takes up the remaining space.
