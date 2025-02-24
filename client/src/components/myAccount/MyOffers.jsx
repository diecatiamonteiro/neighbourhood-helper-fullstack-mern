import React from "react";
import formatWhen from "../../utils/formatDate";

export default function MyOffers({ offers }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
      <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
        My Offers
      </h2>
      <div className="text-left">
        {offers &&
          offers.map((offer) => {
            if (!offer.requestId) return null;

            const isAcceptedOffer =
              offer.requestId?.status === "helped" &&
              offer.requestId?.acceptedHelper === offer.helperId;

            const isRejectedOffer =
              offer.requestId?.status === "helped" &&
              offer.requestId?.acceptedHelper !== offer.helperId;

            console.log('Offer details:', {
              offerId: offer._id,
              helperId: offer.helperId,
              acceptedHelper: offer.requestId?.acceptedHelper,
              status: offer.requestId?.status,
              isAccepted: isAcceptedOffer,
              isRejected: isRejectedOffer
            });

            return (
              <div
                key={offer._id}
                className="border-b border-charcoal/50 pb-3 last:border-0 mb-3"
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
                      ? "bg-green-100 text-green-700"
                      : isRejectedOffer
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {isAcceptedOffer ? (
                    <p>
                      {offer.requestId?.userId?.username || "Neighbour"}{" "}
                      accepted your help and will contact you to coordinate the help.
                    </p>
                  ) : isRejectedOffer ? (
                    <p>Your offer was declined</p>
                  ) : (
                    <p>Waiting for response</p>
                  )}
                </div>

              
              </div>
            );
          })}
        {(!offers || offers.length === 0) && (
          <p className="text-center text-gray-500">
            You haven't made any offers yet.
          </p>
        )}
      </div>
    </div>
  );
}
