import axios from "axios";

// Get all requests
export const getAllRequests = async (requestsDispatch) => {
  requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: true });
  try {
    const response = await axios.get("/requests");
    console.log("getAllRequests Response:", response.data);
    requestsDispatch({
      type: "GET_ALL_REQUESTS",
      payload: {
        allRequests: response.data.allRequests,
        totalRequests: response.data.totalRequests,
      },
    });
  } catch (error) {
    console.log("getAllRequests Error:", error.response.data);
    requestsDispatch({
      type: "SET_ERROR_REQUESTS",
      payload: error.response?.data?.message || "Failed to get all requests.",
    });
  } finally {
    requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: false });
  }
};

// Get a specific request
export const getSpecificRequest = async (requestsDispatch, requestId) => {
  requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: true });
  try {
    const response = await axios.get(`/requests/${requestId}`);
    console.log("getSpecificRequest Response:", response.data);
    requestsDispatch({
      type: "GET_SPECIFIC_REQUEST",
      payload: response.data.request,
    });
  } catch (error) {
    console.log("getSpecificRequest Error:", error.response.data);
    requestsDispatch({
      type: "SET_ERROR_REQUESTS",
      payload:
        error.response?.data?.message || "Failed to get specific request.",
    });
  } finally {
    requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: false });
  }
};

// Get all requests for a user
export const getUserRequests = async (requestsDispatch) => {
  requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: true });
  try {
    const response = await axios.get(`/requests/my-requests`);
    console.log("getUserRequests Response:", response.data);
    requestsDispatch({
      type: "GET_USER_REQUESTS",
      payload: {
        userRequests: response.data.userRequests,
        totalRequests: response.data.totalRequests,
      },
    });
  } catch (error) {
    console.log("getUserRequests Error:", error.response.data);
    requestsDispatch({
      type: "SET_ERROR_REQUESTS",
      payload: error.response?.data?.message || "Failed to get user requests.",
    });
  } finally {
    requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: false });
  }
};

// Create a request
export const createRequest = async (requestsDispatch, requestData) => {
  requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: true });
  try {
    const response = await axios.post(`/requests`, requestData);
    console.log("createRequest Response:", response.data);
    requestsDispatch({
      type: "CREATE_REQUEST",
      payload: response.data.newRequest,
    });
  } catch (error) {
    console.log("createRequest Error:", error.response.data);
    requestsDispatch({
      type: "SET_ERROR_REQUESTS",
      payload: error.response?.data?.message || "Failed to create request.",
    });
  } finally {
    requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: false });
  }
};

// Update a request
export const updateRequest = async (
  requestsDispatch,
  requestId,
  updateRequestData
) => {
  requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: true });
  try {
    const response = await axios.patch(
      `/requests/${requestId}`,
      updateRequestData
    );
    console.log("updateRequest Response:", response.data);
    requestsDispatch({
      type: "UPDATE_REQUEST",
      payload: response.data.updatedRequest,
    });
  } catch (error) {
    console.log("updateRequest Error:", error.response.data);
    requestsDispatch({
      type: "SET_ERROR_REQUESTS",
      payload: error.response?.data?.message || "Failed to update request.",
    });
  } finally {
    requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: false });
  }
};

// Delete a request
export const deleteRequest = async (requestsDispatch, requestId) => {
  requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: true });
  try {
    const response = await axios.delete(`/requests/${requestId}`);
    console.log("deleteRequest Response:", response.data);
    requestsDispatch({
      type: "DELETE_REQUEST",
      payload: requestId, // We only need the ID to remove it from state
    });
  } catch (error) {
    console.log("deleteRequest Error:", error.response.data);
    requestsDispatch({
      type: "SET_ERROR_REQUESTS",
      payload: error.response?.data?.message || "Failed to delete request.",
    });
  } finally {
    requestsDispatch({ type: "SET_LOADING_REQUESTS", payload: false });
  }
};
