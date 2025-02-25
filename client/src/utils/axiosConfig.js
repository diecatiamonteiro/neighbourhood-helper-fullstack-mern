// This is a global configuration that will be used for all axios requests to the server.
//! setAxiosDefaults() is called in the main.jsx file.

import axios from "axios";

export const setAxiosDefaults = () => {
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};
