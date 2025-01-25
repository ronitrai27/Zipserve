import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Workers from "./pages/Workers";
import Navbar from "./components/Navbar";
import Bookings from "./pages/Bookings";
import BookingHistory from "./pages/BookingHistory";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyCoins from "./pages/MyCoins";
import Chats from "./pages/Chats";
import About from "./pages/About.jsx";
import About2 from "./pages/About2.jsx";
import { useAppContext } from "./context/AppContext";
import LeftBar from "./components/LeftBar.jsx";
const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/my-profile", "/login", "/mycoins", "/about"];
  const noLeftBarRoutes = ["/login"];
  const { theme } = useAppContext();
  return (
    <div
      className={`w-full select-none fixed h-full flex flex-col ${
        theme ? "bg-white" : "bg-slate-900"
      }`}
    >
      <Navbar />

      {/* Main Content: Sidebar + Routes */}
      <div className="flex flex-1">
        {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}

        {/* Dynamic Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About2 />} />
            <Route path="/mycoins" element={<MyCoins />} />
            <Route path="/messages" element={<Chats />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookinghistory" element={<BookingHistory />} />
          </Routes>
        </div>
        {!noLeftBarRoutes.includes(location.pathname) && <LeftBar />}
      </div>
    </div>
  );
};

export default App;
