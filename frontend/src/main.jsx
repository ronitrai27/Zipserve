import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { LocationProvider } from "./context/LocationContext.jsx";
import { SearchProvider } from "./context/SearchContext"; // Import SearchContext
import ContextProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <SearchProvider>
        <LocationProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </LocationProvider>
      </SearchProvider>
    </AppProvider>
  </BrowserRouter>
);
