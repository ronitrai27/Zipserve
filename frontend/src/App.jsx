import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar.jsx";
import LeftBar from "./components/LeftBar.jsx";
import Loader from "./Loader.jsx";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Bookings = lazy(() => import("./pages/Bookings"));
const BookingHistory = lazy(() => import("./pages/BookingHistory"));
const Login = lazy(() => import("./pages/Login"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Chats = lazy(() => import("./pages/Chats"));
const About = lazy(() => import("./pages/About.jsx"));
const MyBooking = lazy(() => import("./pages/MyBooking.jsx"));
const Workers = lazy(() => import("./pages/Workers.jsx"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/my-profile", "/login", "/about", "/404"];
  const noLeftBarRoutes = ["/login", "/404"];
  const { theme } = useAppContext();

  const isBookingRoute = location.pathname.startsWith("/booking/");

  // Determine whether to show the Sidebar
  const shouldShowSidebar = useMemo(() => {
    return !noSidebarRoutes.includes(location.pathname) && !isBookingRoute;
  }, [location.pathname, isBookingRoute]);

  // Determine whether to show the LeftBar
  const shouldShowLeftBar = useMemo(() => {
    return !noLeftBarRoutes.includes(location.pathname);
  }, [location.pathname]);

  // Determine whether to show the Navbar (only show on non-404 routes)
  const shouldShowNavbar = location.pathname !== "/404";

  const themeClass = theme ? "bg-white" : "bg-slate-900";

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const preloadComponents = async () => {
      try {
        const components = [
          import("./pages/Home"),
          import("./pages/Bookings"),
          import("./pages/BookingHistory"),
          import("./pages/Login"),
          import("./pages/MyProfile"),
          import("./pages/Chats"),
          import("./pages/About.jsx"),
          import("./pages/MyBooking.jsx"),
          import("./pages/Workers.jsx"),
          import("./pages/NotFound"),
        ];

        await Promise.all(components);
        setIsAppReady(true);
      } catch (error) {
        console.error("Failed to preload components:", error);
      }
    };

    preloadComponents();
  }, []);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <div
      className={`w-full select-none fixed h-full flex flex-col ${themeClass}`}
    >
      {shouldShowNavbar && <Navbar />}

      <div className="flex flex-1">
        {shouldShowSidebar && <Sidebar />}

        <div className="flex-1">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/messages" element={<Chats />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/workers/:category" element={<Workers />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/booking/:id" element={<MyBooking />} />
              <Route path="/bookinghistory" element={<BookingHistory />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </Suspense>
        </div>

        {shouldShowLeftBar && <LeftBar />}
      </div>
    </div>
  );
};

export default App;
