import React, { useEffect, useContext } from "react";
import { DataContext } from "../contexts/Context";
import { getUserData } from "../api/usersApi";
import { getUserRequests } from "../api/requestsApi";
import { getUserOffers } from "../api/offersApi";
import { format } from "date-fns";
import LoadingSpinner from "../components/LoadingSpinner";

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

  return (
    <div className="bg-offwhite/80 backdrop-blur-sm py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center">
          {/* User Info */}
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

          {/* User Requests */}
          <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
            <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
              My Requests
            </h2>
            <div className="text-left">
              {requestsState.userRequests && requestsState.userRequests.length > 0 ? (
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
                        <span className={`capitalize ${
                          request.status === 'open' ? 'text-green-600' :
                          request.status === 'in progress' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
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

                    {/* Offers Section */}
                    <div className="ml-4 mt-3 border-l-2 border-olive/20 pl-4">
                      <p className="font-semibold text-charcoal mb-2">
                        Offers of Help ({(request.receivedOffers || []).length}):
                      </p>
                      {request.receivedOffers && request.receivedOffers.length > 0 ? (
                        request.receivedOffers.map((offer) => (
                          <div key={offer._id} className="mb-3 bg-offwhite/50 p-3 rounded-lg">
                            <p>
                              <span className="font-semibold">From:</span>{" "}
                              {offer.helperId?.username || "Unknown User"}
                            </p>
                            <p>
                              <span className="font-semibold">Message:</span>{" "}
                              {offer.message}
                            </p>
                            <p>
                              <span className="font-semibold">Status:</span>{" "}
                              <span className={`capitalize ${
                                offer.status === 'pending' ? 'text-yellow-600' :
                                offer.status === 'accepted' ? 'text-green-600' :
                                'text-red-600'
                              }`}>
                                {offer.status}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Offered on: {format(new Date(offer.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                        ))
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

          {/* User Offers */}
          <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
            <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
              My Offers
            </h2>
            <div className="text-left">
              {offersState.userOffers &&
                offersState.userOffers.map((offer) => (
                  <div
                    key={offer._id}
                    className="border-b border-gray-200 pb-3 last:border-0 mb-3"
                  >
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
                    <p>
                      <span className="font-semibold">Offer Status:</span>{" "}
                      <span
                        className={`capitalize ${
                          offer.status === "pending"
                            ? "text-yellow-600"
                            : offer.status === "accepted"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Offered on:{" "}
                      {format(new Date(offer.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                ))}
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
  );
}
