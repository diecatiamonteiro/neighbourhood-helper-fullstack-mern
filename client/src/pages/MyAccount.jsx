import React, { useEffect, useContext } from "react";
import { DataContext } from "../contexts/Context";
import { getUserData } from "../api/usersApi";
import { getUserRequests } from "../api/requestsApi";
import { getUserOffers } from "../api/offersApi";
import { format } from "date-fns";
export default function MyAccount() {
  const { usersState, usersDispatch } = useContext(DataContext);
  const { requestsState, requestsDispatch } = useContext(DataContext);
  const { offersState, offersDispatch } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      await getUserData(usersDispatch);
      await getUserRequests(requestsDispatch);
      await getUserOffers(offersDispatch);
    };
    fetchData();
  }, []);

  if (
    usersState.isLoading ||
    requestsState.isLoading ||
    offersState.isLoading
  ) {
    return <div>Loading...</div>;
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
              {requestsState.userRequests &&
                requestsState.userRequests.map((request) => (
                  <div
                    key={request._id}
                    className="border-b border-gray-200 pb-3 last:border-0 mb-3"
                  >
                    <p>
                      <span className="font-semibold">Description:</span>{" "}
                      {request.description}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {request.status}
                    </p>
                    <p>
                      <span className="font-semibold">When:</span>{" "}
                      {request.when}
                    </p>
                    <p>
                      <span className="font-semibold">Posted:</span>{" "}
                      {format(new Date(request.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                ))}
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
                      <span className="font-semibold">Message:</span>{" "}
                      {offer.message}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {offer.status}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
