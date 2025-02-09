import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { WorkersProvider } from "./context/WorkerContext";
import { SearchProvider } from "./context/SearchContext"; // Import SearchContext
import ContextProvider from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <SearchProvider>
        <WorkersProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </WorkersProvider>
      </SearchProvider>
    </AppProvider>
  </BrowserRouter>
);
