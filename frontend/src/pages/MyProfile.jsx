import React, { useState } from "react";
import { assets } from "../assets/assets";
import { LuArrowUpRight } from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";

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
    <div className="bg-gray-50 w-full h-[calc(100vh-4.6rem)] rounded-tr-xl py-6 px-10 border-[1px] border-gray-200">
      <div className="Parent  font-inter grid grid-cols-[1fr_3fr_1fr]  h-full">
        {/* -----------------------------About----- ---------------*/}
        <div className="child-1 flex flex-col items-center justify-center gap-2 ">
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
          <div className="flex flex-col gap-2 mt-12">
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">Phone:</span>
              {userData.phone}
            </p>
            <p className="text-[14px] font-[400] flex  gap-2 flex-nowrap">
              <span className="font-medium text-[16px]  ">Address:</span>
              {userData.address}
            </p>
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">Gender:</span>
              {userData.gender}
            </p>
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">DOB:</span>
              {userData.dob}
            </p>

            <div className="flex flex-col gap-2 self-center items-center mt-32">
              <p className="text-[15px] font-[400] flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full w-fit">
                <span className="font-medium">Raise complaints</span>
                <assets.LuPhoneCall />
              </p>
              <p className="capitalize text-[15px] font-[400] flex items-center gap-2">
                Privacy policy
                <assets.LuChevronRight />
              </p>
            </div>
          </div>
        </div>
        {/* ----------------------------- Content------ ---------------*/}
        <div className="child-2 flex-1 bg-white py-3">
          <h1 className="capitalize font-outfit text-[42px] tracking-tighter leading-9 pl-8 ">
            Hi, John! <br /> What do you <br /> want to book{" "}
            <span>today ?</span>
          </h1>
          <div className="grid grid-cols-[1fr_1fr] my-6 gap-y-6 justify-items-center">
            <div className="Coins border-none capitalize p-3 bg-gradient-to-br from-yellow-300 via-white to-amber-500 w-fit rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-black flex items-center gap-2 text-[18px]">
                  get coins to avail discounts
                </p>
                <MdOutlineDiscount className="text-primary text-3xl " />
              </div>
              <hr className="my-3 border-gray-300" />
              <p className="text-black text-[18px] font-light">
                You have not made any bookings yet.
              </p>
              <p className="capitalize bg-white px-4 py-2 rounded-full flex w-fit my-3 ml-auto">
                Book now
              </p>
            </div>
            <div className="wallet border-none capitalize p-3 bg-gradient-to-r from-blue-300 via-indigo-400 to-orange-300 text-white w-fit">
              <div className="flex justify-between items-center">
                <p className="text-white flex items-center gap-2 text-[24px]">
                  Your Wallet
                </p>
                <LuArrowUpRight className="text-primary text-3xl bg-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200 hover:bg-primary hover:text-white" />
              </div>
              <hr className="" />
            </div>
          </div>
          <div className="recent-bookings border-none capitalize p-3 bg-gradient-to-r from-blue-300 via-indigo-400 to-orange-300 w-fit rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <p className="text-white flex items-center gap-2 text-[24px]">
                recent bookings..
              </p>
              <LuArrowUpRight className="text-primary text-3xl bg-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200 hover:bg-primary hover:text-white" />
            </div>
            <hr className="my-3" />
            <p className="text-white text-[18px] font-light">
              You have not made any bookings yet.
            </p>
            <p className="capitalize bg-white px-4 py-2 rounded-full flex w-fit my-3 ml-auto">
              Book now
            </p>
          </div>
        </div>
        {/* -----------------------------Recent Searches------ ---------------*/}
        <div className="child-3 ">
          <div className="flex flex-col items-center justify-center">
            <p className="text-[18px] font-medium capitalize underline underline-offset-8 decoration-primaryLight">
              Recent Searches
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
