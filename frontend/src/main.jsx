import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { LocationProvider } from "./context/LocationContext.jsx";
import { BookingProvider } from "./context/BookingContext";
import ContextProvider from "./context/Context.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BookedProvider } from "./context/BookedContext";
const CLIENT_ID =
  "561432114508-tsojd6eis2bjj9i66bmsubs3urm6j5p8.apps.googleusercontent.com";
// 561432114508-tsojd6eis2bjj9i66bmsubs3urm6j5p8.apps.googleusercontent.com
// 561432114508-eh589vaq7epqsvs1kojn87hc71it79p5.apps.googleusercontent.com
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LocationProvider>
      <AppProvider>
        <BookingProvider>
          <ContextProvider>
            <BookedProvider>
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <App />
              </GoogleOAuthProvider>
            </BookedProvider>
          </ContextProvider>
        </BookingProvider>
      </AppProvider>
    </LocationProvider>
  </BrowserRouter>
);
