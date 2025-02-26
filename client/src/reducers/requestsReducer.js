export const requestsInitialState = {
  allRequests: [], // requests from all users (for homepage)
  userRequests: [], // all requests from a logged-in user (for /my-requests)
  totalRequests: 0,
  currentRequest: null, // single request view (when clicking on a request to view its details, edit it)
  isLoading: false,
  error: null,
};

export const requestsReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_REQUESTS":
      return {
        ...state,
        allRequests: action.payload.allRequests.filter(
          (request) => request.status !== "helped"
        ),
        totalRequests: action.payload?.totalRequests || 0,
        error: null,
      }; // filters out requests that have been helped showing only open requests on homepage

    case "GET_SPECIFIC_REQUEST":
      return {
        ...state,
        currentRequest: action.payload,
        error: null,
      };

    case "GET_USER_REQUESTS":
      return {
        ...state,
        userRequests: action.payload.userRequests,
        totalRequests: action.payload.totalRequests,
        error: null,
      };

    case "CREATE_REQUEST":
      return {
        ...state,
        userRequests: Array.isArray(state.userRequests)
          ? [...state.userRequests, action.payload.newRequest]
          : [action.payload.newRequest], // Checks if userRequests is an array. If so, it spreads the existing requests and adds the new one (newRequest) to the array. If not, it creates a new array with the newRequest. newRequest is the response defined in the BE.
        totalRequests: state.totalRequests + 1,
        error: null,
      };

    case "UPDATE_REQUEST":
      return {
        ...state,
        userRequests: state.userRequests.map((request) =>
          request._id === action.payload._id ? action.payload : request
        ),
        currentRequest:
          state.currentRequest?._id === action.payload._id
            ? action.payload
            : state.currentRequest, // creates a new array with the updated request (map()); means that the request with the same id as the payload will be updated with the new payload; if not, the request will remain the same.
        error: null,
      };

    case "DELETE_REQUEST":
      return {
        ...state,
        userRequests: state.userRequests.filter(
          (request) => request._id !== action.payload
        ), // creates a new array with the filtered requests (filter()), keeping only requests where ID does NOT match the deleted ID; means that the request with the same id as the payload will be removed from the userRequests array
        totalRequests: state.totalRequests - 1,
        currentRequest:
          state.currentRequest?._id === action.payload
            ? null
            : state.currentRequest,
        error: null,
      };

    case "SET_LOADING_REQUESTS":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR_REQUESTS":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
