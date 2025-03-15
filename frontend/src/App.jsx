import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components----------------------------
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar.jsx";
import LeftBar from "./components/LeftBar.jsx";
import Loader from "./Loader.jsx";
//PAGES----------------------------------
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Chats from "./pages/Chats";
import About from "./pages/About.jsx";
import MyBooking from "./pages/MyBooking.jsx";
import Workers from "./pages/Workers.jsx";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register.jsx";
import Password from "./pages/Password.jsx";
const App = () => {
  const location = useLocation();
  const { theme } = useAppContext();
  const [isAppReady, setIsAppReady] = useState(false);

  // Routes that should not display Sidebar, LeftBar, or Navbar
  const noSidebarRoutes = [
    "/my-profile",
    "/login",
    "/about",
    "/404",
    "/register",
    "/reset-cridentials",
  ];
  const noLeftBarRoutes = ["/login", "/404", "/register", "/reset-cridentials"];
  const noNavbarRoutes = ["/login", "/register", "/404", "/reset-cridentials"];
  const isBookingRoute = location.pathname.startsWith("/booking/");

  // Logic to determine which components to show
  const shouldShowSidebar =
    !noSidebarRoutes.includes(location.pathname) && !isBookingRoute;
  const shouldShowLeftBar = !noLeftBarRoutes.includes(location.pathname);
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  // Preload components
  useEffect(() => {
    setTimeout(() => setIsAppReady(true), 500); // Simulating a small delay
  }, []);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <div
      className={`w-full select-none fixed h-full flex flex-col ${
        theme ? "bg-white" : "bg-slate-900"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      {shouldShowNavbar && <Navbar />}

      <div className="flex flex-1">
        {shouldShowSidebar && <Sidebar />}

        <div className="flex-1">
          <Routes>
            {/* Redirect "/" to login; handle authentication inside ProtectedRoute */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/reset-cridentials" element={<Password />} />

            {/* Protected Routes - Only accessible if logged in */}

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages/:id"
              element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-profile"
              element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workers"
              element={
                <ProtectedRoute>
                  <Workers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workers/:category"
              element={
                <ProtectedRoute>
                  <Workers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <MyBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookinghistory"
              element={
                <ProtectedRoute>
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />

            {/* Catch-all: Redirect to 404 */}
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </div>

        {shouldShowLeftBar && <LeftBar />}
      </div>
    </div>
  );
};

export default App;
//----------------------------
// const App = () => {
//   const location = useLocation();
//   const { theme } = useAppContext();
//   const [isAppReady, setIsAppReady] = useState(false);

//   // Routes that should not display Sidebar or LeftBar
//   const noSidebarRoutes = [
//     "/my-profile",
//     "/login",
//     "/about",
//     "/404",
//     "/register",
//   ];
//   const noLeftBarRoutes = ["/login", "/404", "/register"];
//   const isBookingRoute = location.pathname.startsWith("/booking/");

//   // Logic to determine which components to show
//   const shouldShowSidebar =
//     !noSidebarRoutes.includes(location.pathname) && !isBookingRoute;
//   const shouldShowLeftBar = !noLeftBarRoutes.includes(location.pathname);
//   const shouldShowNavbar = !["/404", "/login", "/register"].includes(
//     location.pathname
//   );

//   // Preload components
//   useEffect(() => {
//     setTimeout(() => setIsAppReady(true), 500); // Simulating a small delay
//   }, []);

//   if (!isAppReady) {
//     return <Loader />;
//   }

//   return (
//     <div
//       className={`w-full select-none fixed h-full flex flex-col ${
//         theme ? "bg-white" : "bg-slate-900"
//       }`}
//     >
//       {shouldShowNavbar && <Navbar />}

//       <div className="flex flex-1">
//         {shouldShowSidebar && <Sidebar />}

//         <div className="flex-1">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/messages" element={<Chats />} />
//             <Route path="/my-profile" element={<MyProfile />} />
//             <Route path="/workers" element={<Workers />} />
//             <Route path="/workers/:category" element={<Workers />} />
//             <Route path="/bookings" element={<Bookings />} />
//             <Route path="/booking/:id" element={<MyBooking />} />
//             <Route path="/bookinghistory" element={<BookingHistory />} />
//             <Route path="/404" element={<NotFound />} />
//             <Route path="*" element={<Navigate to="/404" />} />
//           </Routes>
//         </div>

//         {shouldShowLeftBar && <LeftBar />}
//       </div>
//     </div>
//   );
// };

// export default App;
