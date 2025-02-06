import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { WorkersProvider } from "./context/WorkerContext";
import { SearchProvider } from "./context/SearchContext"; // Import SearchContext

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <SearchProvider>
        <WorkersProvider>
          <App />
        </WorkersProvider>
      </SearchProvider>
    </AppProvider>
  </BrowserRouter>
);
