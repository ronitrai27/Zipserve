import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  LuMail,
  LuUserCog,
  LuLogOut,
  LuLayoutPanelLeft,
  LuUsers,
} from "react-icons/lu";

const Sidebar = () => {
  const { loggedWorker, setLoggedWorker } = useAppContext();
  const navigate = useNavigate();
  //---------------------------------------------------------
  const logoutWorker = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
      setLoggedWorker(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  //------------------------------------------------------------
  return (
    <div className="sidebar h-full bg-white w-[6%] py-5 flex items-center justify-center">
      <div className="flex flex-col justify-between h-full">
        {/* Top Part */}
        <div className="flex flex-col gap-3 items-center">
          <SidebarLink
            to="/home"
            Icon={LuLayoutPanelLeft}
            tooltip="Dashboard"
          />
          <SidebarLink to="/messages" Icon={LuMail} tooltip="Messages" />
          <SidebarLink to="/profile" Icon={LuUserCog} tooltip="Settings" />
          <TooltipIcon Icon={LuUsers} tooltip="Users" />
        </div>

        {/* Bottom Part */}
        <div className="flex flex-col gap-6 items-center">
          <TooltipButton
            Icon={LuLogOut}
            tooltip="Logout"
            onClick={logoutWorker}
          />
          <img
            src={loggedWorker?.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

// SidebarLink Component (For Normal Links)
const SidebarLink = ({ to, Icon, tooltip }) => {
  return (
    <div className="cursor-pointer relative group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
            isActive
              ? "text-gray-800 bg-primary/25"
              : "hover:text-gray-800 hover:bg-stone-100 text-gray-500"
          }`
        }
      >
        <Icon className="text-2xl" />
      </NavLink>
      <Tooltip tooltip={tooltip} />
    </div>
  );
};

// TooltipIcon Component (For Icons Without Navigation)
const TooltipIcon = ({ Icon, tooltip }) => {
  return (
    <div className="cursor-pointer relative group">
      <Icon className="text-2xl text-gray-500 hover:text-gray-800" />
      <Tooltip tooltip={tooltip} />
    </div>
  );
};

// TooltipButton Component (For Logout Button)
const TooltipButton = ({ Icon, tooltip, onClick }) => {
  return (
    <div className="cursor-pointer relative group" onClick={onClick}>
      <Icon className="text-2xl text-gray-500 hover:text-gray-800" />
      <Tooltip tooltip={tooltip} />
    </div>
  );
};

// Tooltip Component (Reusable)
const Tooltip = ({ tooltip }) => (
  <span className="absolute left-[calc(100%+26px)] top-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary text-white px-3 py-1.5 rounded-md text-xs whitespace-nowrap">
    {tooltip}
  </span>
);

export default Sidebar;
