import React, { useState } from "react";
import logo from "../assets/newZipserveBlack-removebg-preview.png";
import { useAppContext } from "../context/AppContext";
import { LuChevronLast } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LuMail, LuUserCog } from "react-icons/lu";
function Navbar() {
  const { loggedWorker, setLoggedWorker } = useAppContext();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  //----------------------------------------------------
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log("📤 Selected file:", file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const response = await axios.put(
        `http://localhost:8080/api/update-profile-image/${loggedWorker._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // console.log("✅ Server Response:", response.data);

      setLoggedWorker((prev) => ({
        ...prev,
        profileImage: response.data.worker.profileImage,
      }));

      toast.success("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to update profile image.");
    } finally {
      setIsUploading(false);
    }
  };
  //---------------------------------------------------
  // console.log("logged worker------->", loggedWorker);
  return (
    <div>
      <div className="navbar flex items-center justify-between px-6 py-[10px] font-inter bg-white border-b-[1px] border-gray-300 text-gray-800">
        <img src={logo} alt="Logo" className="w-40" />

        <div className=" flex items-center gap-10">
          <LuUserCog className="text-2xl text-gray-800" />
          <div className="relative">
            <LuMail className="text-2xl text-gray-800" />
            <div className="w-3 h-3 rounded-full bg-primary absolute -top-1 -right-1"></div>
          </div>

          <div className="profile flex items-center gap-3">
            <label htmlFor="imageUpload" className="cursor-pointer relative">
              <img
                src={loggedWorker?.profileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full border-[1px] border-primary object-cover"
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
                  Uploading...
                </div>
              )}
            </label>

            <div className="flex flex-col">
              <p className="capitalize tracking-tight text-[15px] font-medium">
                {loggedWorker?.name}
              </p>
              <p className="font-light text-[12px] tracking-tighter">
                {loggedWorker?.email}
              </p>
            </div>
          </div>
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
    </div>
  );
}

export default Navbar;
