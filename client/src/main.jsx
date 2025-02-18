import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DataProvider } from "./contexts/Context.jsx";
import { setAxiosDefaults } from "./utils/axiosConfig.js";

setAxiosDefaults();

createRoot(document.getElementById("root")).render(
  <DataProvider>
    <App />
  </DataProvider>
);
