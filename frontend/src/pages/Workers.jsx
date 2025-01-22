import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Workers = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-1 border-[1px] bg-stone-50 h-[90vh] rounded-tl-3xl py-4 px-2">
      <div className="text-center">
        <p
          onClick={() => navigate("/")}
          className="underline text-lg cursor-pointer"
        >
          Workers to dashboard
        </p>
      </div>
    </div>
  );
};

export default Workers;
