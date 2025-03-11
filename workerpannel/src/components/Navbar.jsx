import React, { useState } from "react";
import logo from "../assets/newZipserveBlack-removebg-preview.png";
import { useAppContext } from "../context/AppContext";
import { LuChevronLast } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
  console.log("logged worker------->", loggedWorker);
  return (
    <div>
      <div className="navbar flex items-center justify-between px-12 py-2 font-inter bg-white">
        <img src={logo} alt="Logo" className="w-44" />

        <div className="profile flex items-center gap-3">
          {/* Clickable Profile Image */}
          <label htmlFor="imageUpload" className="cursor-pointer relative">
            <img
              src={loggedWorker?.profileImage}
              alt="Profile"
              className="w-14 h-14 rounded-full border-[1px] border-primary object-cover"
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
            <p className="font-light text-[13px] tracking-tighter">
              {loggedWorker?.email}
            </p>
          </div>
        </div>
      </div>
      <hr />

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
