import axios from "axios";

export const getAllRequests = async (requestsDispatch) => {
  try {
    const response = await axios.get("/requests");
    console.log("getAllRequests Response:", response.data);
    requestsDispatch({
      type: "GET_ALL_REQUESTS",
      payload: response.data.allRequests,
    }); // send just allRequests array from the response to the reducer
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

export const getSpecificRequest = async (requestsDispatch, requestId) => {
  try {
    const response = await axios.get(`/requests/${requestId}`);
    console.log("getSpecificRequest Response:", response.data);
    requestsDispatch({
      type: "GET_SPECIFIC_REQUEST",
      payload: response.data,
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

export const getUserRequests = async (requestsDispatch) => {
  try {
    const response = await axios.get(`/requests/my-requests`);
    console.log("getUserRequests Response:", response.data);
    requestsDispatch({
      type: "GET_USER_REQUESTS",
      payload: response.data,
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

export const createRequest = async (requestsDispatch, requestData) => {
  try {
    const response = await axios.post(`/requests`, requestData);
    console.log("createRequest Response:", response.data);
    requestsDispatch({
      type: "CREATE_REQUEST",
      payload: response.data,
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

export const updateRequest = async (
  requestsDispatch,
  requestId,
  updateRequestData
) => {
  try {
    const response = await axios.patch(
      `/requests/${requestId}`,
      updateRequestData
    );
    console.log("updateRequest Response:", response.data);
    requestsDispatch({
      type: "UPDATE_REQUEST",
      payload: response.data,
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

export const deleteRequest = async (requestsDispatch, requestId) => {
  try {
    const response = await axios.delete(`/requests/${requestId}`);
    console.log("deleteRequest Response:", response.data);
    requestsDispatch({
      type: "DELETE_REQUEST",
      payload: response.data,
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
