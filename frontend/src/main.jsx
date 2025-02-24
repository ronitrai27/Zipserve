import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { LocationProvider } from "./context/LocationContext.jsx";
import { BookingProvider } from "./context/BookingContext";
import ContextProvider from "./context/Context.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID =
  "561432114508-s3oglnra3qbf1ul35955d6hv2v9ig2d5.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LocationProvider>
      <AppProvider>
        <BookingProvider>
          <ContextProvider>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <App />
            </GoogleOAuthProvider>
          </ContextProvider>
        </BookingProvider>
      </AppProvider>
    </LocationProvider>
  </BrowserRouter>
);
