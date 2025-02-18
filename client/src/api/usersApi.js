import axios from "axios";

export const registerUser = async (usersDispatch, registerFormData) => {
  try {
    const response = await axios.post("/users/register", registerFormData);
    console.log("Registration Response:", response.data);
    usersDispatch({ type: "REGISTER_USER", payload: response.data.data });
    return response.data;
  } catch (error) {
    console.log("Registration Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Registration failed",
    });
    throw error;
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

export const loginUser = async (usersDispatch, loginFormData) => {
  try {
    const response = await axios.post("/users/login", loginFormData);
    console.log("Login Response:", response.data);
    usersDispatch({ type: "LOGIN_USER", payload: response.data.data });
  } catch (error) {
    console.log("Login Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Login failed.",
    });
  } finally {
    usersDispatch({ type: "SET_LOADING_USERS", payload: false });
  }
};

export const logoutUser = async (usersDispatch) => {
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
  }
};

export const getUserData = async (usersDispatch) => {
  try {
    const response = await axios.get("/users/data");
    console.log("getUserData Response:", response.data);
    usersDispatch({ type: "GET_USER_DATA", payload: response.data.data });
  } catch (error) {
    console.log("getUserData Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to get user data.",
    });
  }
};

export const updateUserData = async (usersDispatch, updateFormData) => {
  try {
    const response = await axios.patch("/users/update", updateFormData);
    console.log("updateUserData Response:", response.data);
    usersDispatch({ type: "UPDATE_USER_DATA", payload: response.data.data });
  } catch (error) {
    console.log("updateUserData Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to update user data.",
    });
  }
};

export const deleteUser = async (usersDispatch) => {
  try {
    const response = await axios.delete("/users/delete");
    console.log("deleteUser Response:", response.data);
    usersDispatch({ type: "DELETE_USER" });
  } catch (error) {
    console.log("deleteUser Error:", error.response.data);
    usersDispatch({
      type: "SET_ERROR_USERS",
      payload: error.response?.data?.message || "Failed to delete user.",
    });
  }
};
