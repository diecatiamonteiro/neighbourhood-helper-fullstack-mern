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
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        user: action.payload,
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
