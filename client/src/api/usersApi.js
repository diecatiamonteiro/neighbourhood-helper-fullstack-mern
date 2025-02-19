import axios from "axios";

// Register a user
export const registerUser = async (usersDispatch, registerFormData) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.post("/users/register", registerFormData);
    console.log("Registration Response:", response.data);
    usersDispatch({
      type: "REGISTER_USER",
      payload: { user: response.data.data },
    });
    return response.data;
  } catch (error) {
    console.log("Registration Error:", error.response.data);
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
    console.log("Login Error:", error.response?.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: "Invalid email or password.",
    }); // Provide a consistent user-friendly message regardless of the error type
    throw error; // Need to throw error to stop the function and show error message
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Logout a user
export const logoutUser = async (usersDispatch) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.get("/users/logout");
    console.log("Logout Response:", response.data);
    usersDispatch({ type: "LOGOUT_USER" });
  } catch (error) {
    console.log("Logout Error:", error.response.data);
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
    console.log("Get User Data Response:", response.data);
    usersDispatch({
      type: "GET_USER_DATA",
      payload: { user: response.data.user },
    });
  } catch (error) {
    console.log("getUserData Error:", error.response.data);
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
    console.log("updateUserData Response:", response.data);
    usersDispatch({
      type: "UPDATE_USER_DATA",
      payload: { updatedUser: response.data.updatedUser },
    });
  } catch (error) {
    console.log("updateUserData Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to update user data.",
    });
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

// Delete a user
export const deleteUser = async (usersDispatch) => {
  usersDispatch({ type: "SET_LOADING_USERS", payload: true });
  try {
    const response = await axios.delete("/users/delete");
    console.log("deleteUser Response:", response.data);
    usersDispatch({ type: "DELETE_USER", payload: response.data.deletedUser });
  } catch (error) {
    console.log("deleteUser Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to delete user.",
    });
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};
