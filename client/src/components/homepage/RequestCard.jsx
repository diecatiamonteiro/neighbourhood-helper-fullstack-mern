import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DataContext } from "../../contexts/Context";
import { postOffer } from "../../api/offersApi";

export default function RequestCard({ request }) {
  const navigate = useNavigate();
  const { usersState, offersDispatch } = useContext(DataContext);
  const { isAuthenticated, user } = usersState;
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOfferHelp = () => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    // Don't allow users to offer help on their own requests
    if (user._id === request.userId._id) {
      console.log("You cannot offer help on your own request");
      return;
    }

    setShowModal(true);
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await postOffer(request._id, message, offersDispatch);
      setShowModal(false);
      setMessage("");
    } catch (error) {
      console.error("Error submitting offer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatWhen = (whenString) => {
    // Try to parse the string as a date
    const date = new Date(whenString);

    // Check if it's a valid date (will be true for datetime strings like "2025-02-19T02:24")
    if (date instanceof Date && !isNaN(date)) {
      return format(date, "MMM d, yyyy, HH:mm");
    }

    // If it's not a valid date, return the original string (e.g., "Next week")
    return whenString;
  };

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative">
        {/* Category & Status */}
        <div className="flex items-center justify-center mb-6">
          <span className="px-4 py-2 bg-olive/10 text-olive rounded-full border border-olive text-sm font-semibold">
            {request.category}
          </span>
        </div>

        {/* Description, When & Username */}
        <div className="flex flex-col items-start">
          <p className="text-charcoal font-semibold text-lg mb-3 min-h-[80px]">
            {request.description}
          </p>
          <div className="flex flex-col items-start w-full bg-brick/10 p-4 rounded-lg">
            <p className="font-medium">
              <span className="font-semibold text-oliveHover">When:</span>{" "}
              <span>{formatWhen(request.when)}</span>
            </p>
            <p className="font-medium">
              <span className="font-semibold text-oliveHover">Neighbour:</span>{" "}
              <span>{request.userId.username}</span>
            </p>
          </div>
        </div>

        {/* Date of posting & Action Button */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-600 space-y-2">
            <p className="text-sm">
              Posted: {format(new Date(request.createdAt), "MMM d, yyyy")}
            </p>
          </div>

          <button
            onClick={handleOfferHelp}
            disabled={
              request.status !== "open" || user?._id === request.userId._id
            }
            className={`bg-brick hover:bg-brickHover text-white px-8 py-3 rounded-lg text-base font-semibold 
              transition-all duration-300 transform hover:-translate-y-1
              ${
                request.status !== "open" || user?._id === request.userId._id
                  ? "opacity-50 cursor-not-allowed hover:transform-none"
                  : ""
              }`}
          >
            Offer Help
          </button>
        </div>
      </div>

      {/* Offer Help Modal - Positioned next to specific request */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full"
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h3 className="text-xl font-bold text-charcoal mb-4">Offer Help</h3>
            <form onSubmit={handleSubmitOffer}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message to your neighbor..."
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-[100px]"
                required
                autoFocus
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brick hover:bg-brickHover text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Offer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
