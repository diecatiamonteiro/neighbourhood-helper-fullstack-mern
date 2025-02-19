import React from "react";
import HeroSection from "../components/homepage/HeroSection";
import IntroSection from "../components/homepage/IntroSection";
import RequestsSection from "../components/homepage/RequestsSection";

export default function Homepage() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <RequestsSection />
    </main>
  );
}
