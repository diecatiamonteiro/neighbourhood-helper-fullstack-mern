import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeroSection from "../components/homepage/HeroSection";
import IntroSection from "../components/homepage/IntroSection";
import RequestsSection from "../components/homepage/RequestsSection";

export default function Homepage() {
  return (
    <main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HeroSection />
      <IntroSection />
      <RequestsSection />
    </main>
  );
}
