// This is a global configuration that will be used for all axios requests to the server.
//! setAxiosDefaults() is called in the main.jsx file.

import axios from "axios";

export const setAxiosDefaults = () => {
  axios.defaults.baseURL =
    import.meta.env.VITE_BACKEND_URL || "https://neighbourhood-helper-fullstack-mern.onrender.com";

  axios.defaults.withCredentials = true;
};
