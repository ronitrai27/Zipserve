import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Workers from "./pages/Workers";
import Navbar from "./components/Navbar";
import Bookings from "./pages/Bookings";
import BookingHistory from "./pages/BookingHistory";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import MyCoins from "./pages/MyCoins";
import Chats from "./pages/Chats";
const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ["/my-profile", "/login", "/mycoins"];
  return (
    <div className="w-full h-full fixed flex flex-col">
      <Navbar />

      {/* Main Content: Sidebar + Routes */}
      <div className="flex flex-1">
        {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}

        {/* Dynamic Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mycoins" element={<MyCoins />} />
            <Route path="/messages" element={<Chats />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookinghistory" element={<BookingHistory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
