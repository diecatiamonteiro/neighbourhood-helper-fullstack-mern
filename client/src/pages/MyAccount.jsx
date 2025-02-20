import React, { useEffect, useContext } from "react";
import { DataContext } from "../contexts/Context";
import { getUserData } from "../api/usersApi";
import { getUserRequests } from "../api/requestsApi";
import { acceptOffer, getUserOffers, rejectOffer } from "../api/offersApi";
import { format } from "date-fns";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyAccount() {
  const {
    usersState,
    usersDispatch,
    requestsState,
    requestsDispatch,
    offersState,
    offersDispatch,
  } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      await getUserData(usersDispatch);
      await getUserRequests(requestsDispatch);
      await getUserOffers(offersDispatch);
    };
    fetchData();
  }, []);

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

  if (
    usersState.isLoading ||
    requestsState.isLoading ||
    offersState.isLoading
  ) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (usersState.error || requestsState.error || offersState.error) {
    return (
      <div>
        Error: {usersState.error || requestsState.error || offersState.error}
      </div>
    );
  }

  const handleAcceptHelp = async (offerId) => {
    console.log('Accepting offer with ID:', offerId);
    const result = await acceptOffer(offerId, offersDispatch);
    if (result.success) {
      // Refresh both requests and offers to update their status
      await getUserRequests(requestsDispatch);
      await getUserOffers(offersDispatch);
      
      toast.success(`We will notify ${result.helperUsername} that you've accepted their help!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Failed to accept offer. Please try again.");
    }
  };

  const handleRejectHelp = async (offerId) => {
    try {
      await rejectOffer(offerId, offersDispatch);
      // Refresh the requests to update the status
      await getUserRequests(requestsDispatch);
      toast.success("Offer rejected successfully");
    } catch (error) {
      toast.error("Failed to reject offer. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-offwhite/80 backdrop-blur-sm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
            My Account
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
            {/* User Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
              <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
                User Information
              </h2>
              {usersState.user?.user && (
                <div className="space-y-2 text-left">
                  <p>
                    <span className="font-semibold">Username:</span>{" "}
                    {usersState.user.user.username}
                  </p>
                  <p>
                    <span className="font-semibold">First Name:</span>{" "}
                    {usersState.user.user.firstName}
                  </p>
                  <p>
                    <span className="font-semibold">Last Name:</span>{" "}
                    {usersState.user.user.lastName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {usersState.user.user.email}
                  </p>
                  <p>
                    <span className="font-semibold">Zip Code:</span>{" "}
                    {usersState.user.user.zipCode}
                  </p>
                  <p>
                    <span className="font-semibold">Member Since:</span>{" "}
                    {new Date(
                      usersState.user.user.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            {/* My Requests */}
            <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
              <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
                My Requests
              </h2>
              <div className="text-left">
                {requestsState.userRequests &&
                requestsState.userRequests.length > 0 ? (
                  requestsState.userRequests.map((request) => (
                    <div
                      key={request._id}
                      className="border-b border-gray-200 pb-4 last:border-0 mb-4"
                    >
                      <div className="mb-3">
                        <p className="font-semibold text-lg text-olive mb-2">
                          {request.description}
                        </p>
                        <p>
                          <span className="font-semibold">Category:</span>{" "}
                          {request.category}
                        </p>
                        <p>
                          <span className="font-semibold">Status:</span>{" "}
                          <span
                            className={`capitalize ${
                              request.status === "open"
                                ? "text-green-600"
                                : request.status === "in progress"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {request.status}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold">When:</span>{" "}
                          {formatWhen(request.when)}
                        </p>
                        <p>
                          <span className="font-semibold">Posted:</span>{" "}
                          {format(new Date(request.createdAt), "MMM d, yyyy")}
                        </p>
                      </div>

                      {/* Offers for each request */}
                      <div className="ml-4 mt-3 border-l-2 border-olive/20 pl-4">
                        <p className="font-semibold text-charcoal mb-2">
                          Offers of Help (
                          {(request.receivedOffers || []).length}):
                        </p>
                        {request.receivedOffers &&
                        request.receivedOffers.length > 0 ? (
                          request.receivedOffers.map((offer) => {
                            console.log('Offer data:', offer);
                            return (
                              <div
                                key={offer._id}
                                className="mb-3 bg-offwhite/50 p-3 rounded-lg"
                              >
                                <p>
                                  <span className="font-semibold">From:</span>{" "}
                                  {offer.helperId?.username ||
                                    "Unknown Neighbour"}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Message:
                                  </span>{" "}
                                  {offer.message}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Offered on:{" "}
                                  {format(
                                    new Date(offer.createdAt),
                                    "MMM d, yyyy"
                                  )}
                                </p>

                                {/* Show buttons only if request is open and offer is pending */}
                                {request.status === 'open' && !offer.status && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <button
                                      onClick={() =>
                                        handleAcceptHelp(offer._id)
                                      }
                                      className="text-sm bg-olive text-white p-2 rounded-md"
                                    >
                                      Accept Help
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleRejectHelp(offer._id)
                                      }
                                      className="text-sm bg-red-500 text-white p-2 rounded-md"
                                    >
                                      Reject Help
                                    </button>
                                  </div>
                                )}

                                {/* Show status message */}
                                {request.status === 'helped' && (
                                  <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md">
                                    Help Accepted from {offer.helperId?.username}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-gray-500 italic">No offers yet</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    You haven't made any requests yet.
                  </p>
                )}
              </div>
            </div>

            {/* My Offers */}
            <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
              <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
                My Offers
              </h2>
              <div className="text-left">
                {offersState.userOffers &&
                  offersState.userOffers.map((offer) => {
                    console.log('My offer data:', offer);
                    const isAcceptedOffer = offer.requestId.status === 'helped' && 
                                           offer.requestId.acceptedHelperId === offer.helperId._id;
                    const isRejectedOffer = offer.requestId.status === 'helped' && 
                                           offer.requestId.acceptedHelperId !== offer.helperId._id;
                    
                    return (
                      <div key={offer._id} className="border-b border-gray-200 pb-3 last:border-0 mb-3">
                        <p>
                          <span className="font-semibold">My Message:</span>{" "}
                          {offer.message}
                        </p>
                        <p className="font-semibold text-lg text-olive mb-2">
                          Request: {offer.requestId.description}
                        </p>
                        <p>
                          <span className="font-semibold">When:</span>{" "}
                          {formatWhen(offer.requestId.when)}
                        </p>
                        <p>
                          <span className="font-semibold">Neighbour:</span>{" "}
                          {offer.requestId.userId.username}
                        </p>
                        
                        {/* Updated status display */}
                        <div className={`mt-2 p-2 rounded-md ${
                          isAcceptedOffer ? 'bg-green-100 text-green-700' :
                          isRejectedOffer ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {isAcceptedOffer ? (
                            <p>{offer.requestId.userId.username} accepted your help!</p>
                          ) : isRejectedOffer ? (
                            <p>Your offer was declined</p>
                          ) : (
                            <p>Waiting for response</p>
                          )}
                        </div>
                        
                        {/* Show Contact button only for accepted offers */}
                        {isAcceptedOffer && (
                          <div className="mt-3">
                            <button 
                              className="bg-olive text-white px-4 py-2 rounded-md hover:bg-olive/90 transition-colors"
                              onClick={() => alert('Contact feature coming soon!')}
                            >
                              Contact {offer.requestId.userId.username}
                            </button>
                            <p className="text-sm text-gray-600 mt-2">
                              You can now coordinate with {offer.requestId.userId.username} to help with their request.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                {offersState.userOffers.length === 0 && (
                  <p className="text-center text-gray-500">
                    You haven't made any offers yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
