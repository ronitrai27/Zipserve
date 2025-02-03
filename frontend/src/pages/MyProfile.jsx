import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Parker",
    image: assets.sideUserLogo,
    email: "richardjames@gmail.com",
    phone: "+91 123 456 890",
    address: "57 cloth, richmond, circle sexy, london",
    gender: "Male",
    dob: "2004-10-10",
  });
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="bg-gray-50 w-full h-screen rounded-tr-xl py-6 px-10">
      <div className="Parent p-2 font-inter">
        {/* -----------------------------About----- ---------------*/}
        <div className="flex flex-col gap-2">
          <img
            src={userData.image}
            alt=""
            className="w-32 rounded-full bg-primaryLight"
          />
          <h1 className="text-[18px]  font-[400]">{userData.name}</h1>
          <p className="text-[14px]  font-[400] text-gray-500">
            {userData.email}
          </p>
          <div className="">
            <button className="bg-primaryLight text-white px-4 py-2 rounded-full mt-3">
              Edit Profile
            </button>
          </div>
          {/* other details----------- */}
          <div className="flex flex-col gap-2 mt-6">
            <p className="text-[15px] font-[400] flex items-center gap-2">
              <span className="font-medium">Phone:</span>
              {userData.phone}
            </p>
            <p className="text-[15px] font-[400] flex items-center gap-2">
              <span className="font-medium">Address:</span>
              {userData.address}
            </p>
            <p className="text-[15px] font-[400] flex items-center gap-2">
              <span className="font-medium">Gender:</span>
              {userData.gender}
            </p>
            <p className="text-[15px] font-[400] flex items-center gap-2">
              <span className="font-medium">DOB:</span>
              {userData.dob}
            </p>

            <div className="">
              <p className="text-[15px] font-[400] flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full w-fit">
                <span className="font-medium">Raise complaints</span>
                <assets.LuPhoneCall />
              </p>
            </div>
          </div>
        </div>
        {/* ----------------------------- Content------ ---------------*/}
        <div className=""></div>
        {/* -----------------------------Recent Searches------ ---------------*/}
        <div className=""></div>
      </div>
    </div>
  );
};

export default MyProfile;
