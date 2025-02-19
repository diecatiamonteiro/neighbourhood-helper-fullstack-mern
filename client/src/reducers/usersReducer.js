export const usersInitialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
    case "LOGIN_USER":
    case "GET_USER_DATA":
      return {
        ...state,
        user: {
          ...action.payload,
          requests: action.payload.requests || [],
          offers: action.payload.offers || [],
          offersReceived: action.payload.offersReceived || [],
        },
        isAuthenticated: true,
        error: null,
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.updatedUser,
          requests: action.payload.updatedUser.requests || state.user.requests,
          offers: action.payload.updatedUser.offers || state.user.offers,
          offersReceived: action.payload.updatedUser.offersReceived || state.user.offersReceived,
        },
        error: null,
      };

    case "LOGOUT_USER":
    case "DELETE_USER":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    case "SET_LOADING_USERS":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR_USERS":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
