import React, { useState } from "react";
import formatWhen from "../../utils/formatDate";

export default function MyOffers({ offers }) {
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, accepted, rejected

  // Organize offers by status
  const categorizedOffers = offers?.reduce((acc, offer) => {
    if (!offer.requestId) return acc;

    const isAccepted = 
      offer.requestId?.status === "helped" &&
      offer.requestId?.acceptedHelper === offer.helperId;

    const isRejected = 
      offer.requestId?.status === "helped" &&
      offer.requestId?.acceptedHelper !== offer.helperId;

    const status = isAccepted ? "accepted" : isRejected ? "rejected" : "pending";
    acc[status].push(offer);
    return acc;
  }, { pending: [], accepted: [], rejected: [] });

  // Filter offers based on selected status
  const filteredOffers = filterStatus === "all" 
    ? offers 
    : offers?.filter(offer => {
        if (!offer.requestId) return false;
        const isAccepted = 
          offer.requestId?.status === "helped" &&
          offer.requestId?.acceptedHelper === offer.helperId;
        const isRejected = 
          offer.requestId?.status === "helped" &&
          offer.requestId?.acceptedHelper !== offer.helperId;
        
        return filterStatus === "accepted" ? isAccepted 
          : filterStatus === "rejected" ? isRejected 
          : !isAccepted && !isRejected; // pending
      });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
      <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
        My Offers
      </h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1 rounded-full text-sm ${
            filterStatus === "all"
              ? "bg-olive text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-3 py-1 rounded-full text-sm ${
            filterStatus === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Pending ({categorizedOffers.pending.length})
        </button>
        <button
          onClick={() => setFilterStatus("accepted")}
          className={`px-3 py-1 rounded-full text-sm ${
            filterStatus === "accepted"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Accepted ({categorizedOffers.accepted.length})
        </button>
        <button
          onClick={() => setFilterStatus("rejected")}
          className={`px-3 py-1 rounded-full text-sm ${
            filterStatus === "rejected"
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Rejected ({categorizedOffers.rejected.length})
        </button>
      </div>

      <div className="text-left max-h-[600px] overflow-y-auto">
        {filteredOffers && filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => {
            if (!offer.requestId) return null;

            const isAcceptedOffer =
              offer.requestId?.status === "helped" &&
              offer.requestId?.acceptedHelper === offer.helperId;

            const isRejectedOffer =
              offer.requestId?.status === "helped" &&
              offer.requestId?.acceptedHelper !== offer.helperId;

            return (
              <div
                key={offer._id}
                className="bg-offwhite/50 p-4 rounded-lg pb-4 last:border-0 mb-4"
              >
                <p>
                  <span className="font-semibold">My Message:</span>{" "}
                  {offer.message}
                </p>
                <p className="font-semibold text-lg text-olive mb-2">
                  Request:{" "}
                  {offer.requestId?.description ||
                    "Request no longer available"}
                </p>
                <p>
                  <span className="font-semibold">When:</span>{" "}
                  {formatWhen(offer.requestId?.when || "N/A")}
                </p>
                <p>
                  <span className="font-semibold">Neighbour:</span>{" "}
                  {offer.requestId?.userId?.username || "Unknown"}
                </p>

                <div
                  className={`mt-2 p-2 rounded-md ${
                    isAcceptedOffer
                      ? "bg-green-100 border border-green-300 text-green-700"
                      : isRejectedOffer
                      ? "bg-red-100 border border-red-300 text-red-700"
                      : "bg-yellow-100 border border-yellow-300 text-yellow-700"
                  }`}
                >
                  {isAcceptedOffer ? (
                    <p>
                      Your neighbour{" "}
                      {offer.requestId?.userId?.username || "Neighbour"}{" "}
                      accepted your help and will contact you to coordinate the
                      help.
                    </p>
                  ) : isRejectedOffer ? (
                    <p>
                      Your neighbour{" "}
                      {offer.requestId?.userId?.username || "Neighbour"}{" "}
                      declined your help offer.
                    </p>
                  ) : (
                    <p>Waiting for response.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            {filterStatus === "all"
              ? "You haven't made any offers yet."
              : `No ${filterStatus} offers found.`}
          </p>
        )}
      </div>
    </div>
  );
}
