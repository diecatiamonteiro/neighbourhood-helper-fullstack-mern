import React from "react";
import { useNavigate } from "react-router-dom";
import { FaDownLong } from "react-icons/fa6";

export default function IntroSection() {
  const navigate = useNavigate();

  const handleAskForHelp = () => {
    navigate("/askforhelp");
  };

  const handleViewRequests = () => {
    document
      .getElementById("requests-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-8">
          Need a hand? Or ready to help?
        </h2>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Need Help Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              Need Support?
            </h3>
            <p className="text-gray-600 mb-6">
              Connect with neighbours ready to lend a helping hand. Post your
              request and find support in your community.
            </p>
            <button
              onClick={handleAskForHelp}
              className="bg-brick hover:bg-brickHover text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              Ask for Help
            </button>
          </div>

          {/* Give Help Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-charcoal mb-4">
              Want to Help?
            </h3>
            <p className="text-gray-600 mb-6">
              Make a difference in your community. Browse requests and offer
              your support to neighbours in need.
            </p>
            <button
              onClick={handleViewRequests}
              className="text-brick px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              View Community Requests
              <span className="text-charcoal inline-block ml-2 animate-bounce-slow">
                <FaDownLong />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
