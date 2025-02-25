import React, { useContext } from "react";
import formatWhen from "../../utils/formatDate";
import { format } from "date-fns";
import { deleteRequest } from "../../api/requestsApi";
import { toast } from "react-toastify";

export default function MyRequests({
  requests,
  handleAcceptHelp,
  handleRejectHelp,
  handleDeleteRequest,
  requestsDispatch,
}) {
  if (!requests) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mx-auto w-full">
      <h2 className="text-xl font-bold text-charcoal mb-4 text-center">
        My Requests
      </h2>
      <div className="text-left">
        {requests && requests.length > 0 ? (
          requests.map((request) => request && (
            <div
              key={request?._id}
              className="bg-offwhite/50 p-4 rounded-lg pb-4 last:border-0 mb-4"
            >
              <div className="mb-3">
                <h3 className="text-xl font-semibold mb-2">
                  {request?.description || 'No description available'}
                </h3>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {request?.category || 'Uncategorized'}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`capitalize ${
                      request?.status === "open"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {request?.status || 'Unknown'}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">When:</span>{" "}
                  {request?.when ? formatWhen(request.when) : 'Not specified'}
                </p>
                <p>
                  <span className="font-semibold">Posted:</span>{" "}
                  {request?.createdAt ? format(new Date(request.createdAt), "MMM d, yyyy") : 'Unknown date'}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 mb-8">
                  <button className="text-sm bg-olive text-white p-2 rounded-md hover:bg-oliveHover transition-colors duration-200">
                    Edit Request
                  </button>
                  <button
                    onClick={() => request?._id && handleDeleteRequest(request._id)}
                    className="text-sm bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                  >
                    Delete Request
                  </button>
                </div>
              </div>

              {/* Offers for each request */}
              <div className="ml-4 mt-3 border-2 border-olive/20 pl-4 p-4 rounded-lg">
                <p className="font-semibold text-charcoal mb-2">
                  Offers of Help ({(request?.receivedOffers || []).length}):
                </p>
                {request?.receivedOffers && request.receivedOffers.length > 0 ? (
                  request.receivedOffers.map((offer) => offer && (
                    <div
                      key={offer._id}
                      className="mb-3 bg-olive/20 p-3 rounded-lg"
                    >
                      <p>
                        <span className="font-semibold">From:</span>{" "}
                        {offer?.helperId?.username || "Unknown Neighbour"}
                      </p>
                      <p>
                        <span className="font-semibold">Message:</span>{" "}
                        {offer?.message || 'No message'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Offered on:{" "}
                        {offer?.createdAt ? format(new Date(offer.createdAt), "MMM d, yyyy") : 'Unknown date'}
                      </p>

                      {/* Show Accept/Reject buttons only if request is open */}
                      {request?.status === "open" && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          <button
                            onClick={() => offer?._id && handleAcceptHelp(offer._id)}
                            className="text-sm bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors duration-200"
                          >
                            Accept Help
                          </button>
                          <button
                            onClick={() => offer?._id && handleRejectHelp(offer._id)}
                            className="text-sm bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
                          >
                            Reject Help
                          </button>
                        </div>
                      )}

                      {/* Show accepted message only if request is helped AND this helper is the accepted one */}
                      {request?.status === "helped" && 
                       request?.acceptedHelper?._id === offer?.helperId?._id && (
                        <div className="flex flex-col mt-2 p-2 bg-green-100 border border-green-300 text-green-700 rounded-md">
                          You accepted help from {offer?.helperId?.username || 'Unknown Neighbour'}. You must contact them to coordinate help.
                          <button
                            className="text-sm bg-olive w-fit text-white px-2 py-1 mt-2 rounded-md hover:bg-oliveHover transition-colors duration-200"
                            onClick={() => alert("Contact feature coming soon!")}
                          >
                            Contact {offer?.helperId?.username || 'Unknown Neighbour'}
                          </button>
                        </div>
                      )}

                      {/* Show rejected message only if request is helped AND this helper is the rejected one */}
                      {request?.status === "helped" &&
                        request?.acceptedHelper?._id !== offer?.helperId?._id && (
                          <div className="mt-2 p-2 bg-red-100 border border-red-300 text-red-700 rounded-md">
                            You rejected help from {offer?.helperId?.username || 'Unknown Neighbour'}.
                          </div>
                        )}
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
  );
}
