import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { LuArrowUpRight } from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { LocationContext } from "../context/LocationContext";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const { user, setUser } = useAppContext();
  const [isUploading, setIsUploading] = useState(false);
  const { userAddress } = useContext(LocationContext);
  //-----------------------------------------
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log("📤 Selected file:", file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const response = await axios.put(
        `http://localhost:8080/api/update-user-image/${user?._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // console.log("✅ Server Response:", response.data);

      setUser((prev) => ({
        ...prev,
        userImage: response.data.user.userImage,
      }));

      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="bg-gray-50 w-full h-[calc(100vh-4.6rem)] rounded-tr-xl py-6 px-10 border-[1px] border-gray-200">
      <div className="Parent  font-inter grid grid-cols-[1fr_3fr_1fr]  h-full">
        {/* -----------------------------About----- ---------------*/}
        <div className="child-1 flex flex-col items-center justify-center gap-2 ">
          <div className="">
            <div className="profile flex items-center gap-3">
              {/* Clickable Profile Image */}
              <label htmlFor="imageUpload" className="cursor-pointer relative">
                <img
                  src={user?.userImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-[1px] border-primary object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
                    Uploading...
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* ------- */}
          <h1 className="text-[18px]  font-[400]">{user?.name}</h1>
          <p className="text-[14px]  font-[400] text-gray-500">{user?.email}</p>
          <div className="">
            <button className="bg-primaryLight text-white px-4 py-2 rounded-full mt-3">
              Edit Profile
            </button>
          </div>
          {/* other details----------- */}
          <div className="flex flex-col gap-2 mt-12">
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">Phone:</span>
              {user?.phone}
            </p>
            <p className="text-[14px] font-[400] flex  gap-2 flex-nowrap">
              <span className="font-medium text-[16px]  ">Address:</span>
              {userAddress}
            </p>
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">Gender:</span>
              MALE
            </p>
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">DOB:</span>
              28 JULY 2004
            </p>
            <p className="text-[14px] font-[400] flex items-center gap-2">
              <span className="font-medium text-[16px]">AGE:</span>
              {user?.age}
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
          <h1 className="capitalize font-outfit text-[44px] tracking-tighter leading-9 pl-8 ">
            Hi, John! <br /> What do you <br /> want to book{" "}
            <span>today ?</span>
          </h1>
          <div className="flex items-center my-6 justify-between px-10">
            <div className="Coins border-none capitalize px-3 pt-3 bg-gradient-to-br from-yellow-300 via-white to-amber-500 w-fit rounded-lg shadow-lg  ">
              <div className="flex justify-between items-center gap-8">
                <p className="text-black capitalize flex items-center gap-2 text-[18px]">
                  Book more to get coins
                </p>
                <MdOutlineDiscount className="text-primary text-3xl " />
              </div>
              <hr className="my-3 border-gray-300" />
              <p className="  flex items-center gap-8 px-6">
                <img src={assets.gameCoins} alt="" className="w-12" />{" "}
                <span className="text-[2.8rem] text-gray-500 font-extrabold">
                  0.0
                </span>
              </p>
              <p className="capitalize bg-white px-3 py-1  rounded-full flex w-fit mb-3 ml-auto">
                Book now
              </p>
            </div>
            <div className="Wallet border-none capitalize p-3 bg-gradient-to-r from-blue-300 via-indigo-400 to-orange-300 w-fit rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <p className="text-white flex items-center gap-2 text-[24px]">
                  Digital Wallet
                </p>
                <LuArrowUpRight className="text-primary text-3xl bg-white rounded-full p-1 cursor-pointer hover:scale-110 duration-200 hover:bg-primary hover:text-white" />
              </div>
              <hr className="mt-3 mb-1" />
              <p className="text-white text-[18px] font-[400] capitalize">
                connect all your UPI id's in one place
              </p>
              <p className="mt-3 font-extralight text-white">
                <span className="text-[2.5rem]">$</span>{" "}
                <span className="text-[2.5rem]">746.45</span>
              </p>
              <div className="flex items-center gap-5">
                <p className="capitalize bg-white  text-[14px] px-3 py-2 rounded-full flex w-fit ml-auto">
                  Withdraw -
                </p>
                <p className="capitalize bg-white  text-[14px] px-3 py-2 rounded-full flex w-fit ">
                  Add +
                </p>
              </div>
            </div>
          </div>

          <div className="recent-bookings">
            <p className="capitalize ">Recent bookings</p>
          </div>
        </div>
        {/* -----------------------------Recent Searches------ ---------------*/}
        <div className="child-3">
          <p className="text-[18px] font-medium underline underline-offset-8 decoration-primaryLight capitalize mb-5 text-center">
            Bookmarked workers
          </p>
          {user?.favouriteWorkers?.length > 0 ? (
            <div className="flex flex-col w-full px-2">
              {user.favouriteWorkers.map((worker) => (
                <div
                  key={worker._id}
                  className="bg-gray-100 mb-3 rounded-md border-b-[.6px] border-primary py-2"
                >
                  <div className="flex items-center justify-between px-4">
                    <img
                      src={worker.profileImage}
                      alt={worker.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-[16px] font-[400] text-center capitalize">
                        {worker.name}
                      </h2>
                      <p className="text-gray-600 text-center font-light capitalize">
                        {worker.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-yellow-500">
                    <Rating
                      name="half-rating-read"
                      size="small"
                      defaultValue={worker.stars}
                      precision={0.1}
                      readOnly
                    />
                  </p>

                  <p className="text-center text-gray-800">{worker.phone}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              No favorite workers added yet.
            </p>
          )}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
