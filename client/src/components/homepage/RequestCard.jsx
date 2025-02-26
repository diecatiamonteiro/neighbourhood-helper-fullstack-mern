import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DataContext } from "../../contexts/Context";
import { postOffer, getUserOffers } from "../../api/offersApi";
import formatWhen from "../../utils/formatDate";
import { toast } from "react-toastify";
import OfferHelpModal from "./OfferHelpModal";
import "react-toastify/dist/ReactToastify.css";

export default function RequestCard({ request }) {
  const navigate = useNavigate();
  const { usersState, offersDispatch, offersState } = useContext(DataContext);
  const { isAuthenticated, user } = usersState;
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserOffers(offersDispatch);
    }
  }, [isAuthenticated, user, offersDispatch]);

  const hasUserMadeOffer = () => {
    if (!offersState?.userOffers) return false;

    return offersState.userOffers.some(
      (offer) =>
        offer?.requestId?._id === request?._id && offer.status !== "cancelled"
    );
  };

  const handleOfferHelp = () => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  const handleSubmitOffer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await postOffer(request._id, message, offersDispatch);
      await getUserOffers(offersDispatch);

      setShowModal(false);
      setMessage("");
      toast.success(`Your offer has been sent to ${request.userId.username}!`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit offer. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative">
        <div className="flex items-center justify-center mb-6">
          <span className="px-4 py-2 bg-olive/10 text-olive rounded-full border border-olive text-sm font-semibold">
            {request.category}
          </span>
        </div>

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

        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-600 space-y-2">
            <p className="text-sm">
              Posted: {format(new Date(request.createdAt), "MMM d, yyyy")}
            </p>
          </div>

          <button
            onClick={handleOfferHelp}
            disabled={
              isAuthenticated &&
              (request.status !== "open" ||
                user?.user?._id === request?.userId?._id ||
                hasUserMadeOffer())
            }
            className={`bg-brick hover:bg-brickHover text-white px-8 py-3 rounded-lg text-base font-semibold 
              transition-all duration-300 transform hover:-translate-y-1
              ${
                isAuthenticated &&
                (request.status !== "open" ||
                  user?.user?._id === request?.userId?._id ||
                  hasUserMadeOffer())
                  ? "opacity-50 cursor-not-allowed hover:transform-none"
                  : ""
              }`}
          >
            {isAuthenticated
              ? user?.user?._id === request?.userId?._id
                ? "Your Request"
                : hasUserMadeOffer()
                ? "Offer Sent"
                : "Offer Help"
              : "Offer Help"}
          </button>
        </div>
      </div>

      {showModal && (
        <OfferHelpModal
          showModal={showModal}
          setShowModal={setShowModal}
          message={message}
          setMessage={setMessage}
          isSubmitting={isSubmitting}
          handleSubmitOffer={handleSubmitOffer}
        />
      )}
    </>
  );
}
