import axios from "axios";

// Register a user
export const registerUser = async (usersDispatch, registerFormData) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.post("/users/register", registerFormData);
    usersDispatch({
      type: "REGISTER_USER",
      payload: { user: response.data.data },
    });
    return response.data;
  } catch (error) {
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Registration failed",
    });
    throw error; // Need to throw error to stop the function and show error message on RegisterForm.jsx
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Login a user
export const loginUser = async (usersDispatch, loginFormData) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.post("/users/login", loginFormData);
    usersDispatch({
      type: "LOGIN_USER",
      payload: { user: response.data.data },
    });
    return response.data;
  } catch (error) {
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: "Invalid email or password.",
    }); // Provide a consistent user-friendly message regardless of the error type
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Login with Google
export const loginWithGoogle = async (usersDispatch, accessToken) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.post("/users/login/google", { accessToken });
    usersDispatch({
      type: "LOGIN_USER",
      payload: { user: response.data.data },
    });
    return response.data;
  } catch (error) {
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to login with Google.",
    });
    throw error;
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Logout a user
export const logoutUser = async (usersDispatch) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.get("/users/logout");
    usersDispatch({ type: "LOGOUT_USER" });
  } catch (error) {
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Logout failed.",
    });
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Get logged in user data
export const getUserData = async (usersDispatch) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.get("/users/data");
    usersDispatch({
      type: "GET_USER_DATA",
      payload: { user: response.data.user },
    });
  } catch (error) {
    // Don't dispatch error if it's just that no user is logged in (avoids error message on login & register forms)
    if (error.response?.status !== 401) {
      usersDispatch({
        type: "SET_ERROR_USERS",
        payload: error.response?.data?.message || "Failed to get user data.",
      });
    }
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Update user data
export const updateUserData = async (usersDispatch, updateFormData) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.patch("/users/update", updateFormData);
    usersDispatch({
      type: "UPDATE_USER_DATA",
      payload: { updatedUser: response.data.updatedUser },
    });
    return response.data; // Return the response data to be used in MyAccount.jsx to display user data after update
  } catch (error) {
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to update user data.",
    });
    throw error;
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Delete a user
export const deleteUser = async (usersDispatch) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.delete("/users/delete");
    usersDispatch({ type: "DELETE_USER", payload: response.data.deletedUser });
  } catch (error) {
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to delete user.",
    });
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};
