import React from "react";
import { MagicCardDemo } from "../components/Test.jsx";

const About2 = () => {
  return (
    <div className="bg-slate-50 h-screen">
      <hr className="border-[.8px] border-gray-200 shadow-lg " />
      <div className="max-w-[75%] mx-auto my-8 ">
        {/* ------------------Text area ------------------ */}
        <div className="text-area  text-center">
          <h1 className="font-outfit text-5xl">
            <span className="font-outfit text-primary text-4xl font-semibold">
              Welcome To{" "}
            </span>
            Zipserve
          </h1>
          <hr className="w-[24%] mx-auto border-[.8px] border-gray-300 shadow-lg my-3" />
          <p className="text-[1.1rem] font-light tracking-wide leading-snug text-gray-800">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod
            veniam libero fugit distinctio, obcaecati ipsam, quas repudiandae
            laudantium veritatis, voluptas ad cupiditate eaque placeat
            consequuntur alias esse unde ut inventore? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ipsam, praesentium.
          </p>
        </div>
        {/* ------------------Mission Vision ------------------ */}
        <div className="my-10">
          <MagicCardDemo />
        </div>
      </div>
    </div>
  );
};

export default About2;
