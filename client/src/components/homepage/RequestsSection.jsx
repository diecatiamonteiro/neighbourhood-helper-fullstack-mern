import React, { useEffect, useContext } from 'react';
import { DataContext } from '../../contexts/Context';
import { getAllRequests } from '../../api/requestsApi';
import RequestCard from './RequestCard';
import LoadingSpinner from '../LoadingSpinner';

export default function RequestsSection() {
  const { requestsState, requestsDispatch } = useContext(DataContext);
  const { allRequests, isLoading, error } = requestsState;

  useEffect(() => {
    getAllRequests(requestsDispatch);
  }, []); // fetch all requests on mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-brick/10 text-brick text-center py-8 rounded-lg mx-4">
        Error loading requests: {error}
      </div>
    );
  }

  return (
    <div id="requests-section" className="bg-offwhite/80 backdrop-blur-sm py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center">
          Community Requests
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.isArray(allRequests) && allRequests.length > 0 ? (
            allRequests.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 py-12 bg-white rounded-xl shadow-lg">
              <p className="text-xl font-semibold mb-2">No requests found.</p>
              <p className="text-gray-500">Be the first to ask for help!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
