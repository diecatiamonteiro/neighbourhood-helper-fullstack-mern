import React from "react";
import heroHomepage from "../../assets/heroHomepage.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleJoinCommunity = () => {
    navigate("/register");
  };

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <div className="relative h-screen">
      <img
        src={heroHomepage}
        alt="Neighbours helping neighbours image"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      {/* Gradient overlay div */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 to-transparent">
        <div className="h-full flex items-center">
          {/* Text content div */}
          <div className="max-w-xl px-8 md:px-16 py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-offwhite mb-6">
              Connecting
              <span
                className="text-brick block mt-2"
                style={{ textShadow: "1px 1px 1px black" }}
              >
                Alt-West Leipzig
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-white font-light leading-relaxed mb-12">
              Join your neighbours in building a connected community through
              mutual support and assistance.
            </h2>
            <h3 className="text-xl md:text-2xl text-offwhite font-bold leading-relaxed mb-12">
              Give Help. Get Help. Stay Connected.
            </h3>
            {/* CTA div */}
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
              <button
                onClick={handleJoinCommunity}
                className="bg-brick hover:bg-brickHover text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                Join Community
              </button>
              <button
                onClick={handleLearnMore}
                className="border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </button>
            </div>

            {/* Stats section */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm">
              <div className="container mx-auto px-8 py-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-beige text-center font-semibold">
                  <div>
                    <div className="text-3xl font-bold text-offwhite">500+</div>
                    <div className="text-sm mt-1">Community Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-offwhite">200+</div>
                    <div className="text-sm mt-1">Successful Connections</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-offwhite">24/7</div>
                    <div className="text-sm mt-1">Community Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
