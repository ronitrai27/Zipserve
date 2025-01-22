import React from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 border-[1px] bg-stone-50 h-[90vh] rounded-tl-3xl py-4 px-2">
      <div className="text-center">
        <p
          onClick={() => navigate("/")}
          className="underline text-lg cursor-pointer"
        >
          Bookings to dashboard
        </p>
      </div>
    </div>
  );
};

export default Bookings;
