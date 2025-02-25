import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DataProvider } from "./contexts/Context.jsx";
import { setAxiosDefaults } from "./utils/axiosConfig.js";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

setAxiosDefaults();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DataProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </DataProvider>
  </BrowserRouter>
);
