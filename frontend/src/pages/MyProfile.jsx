import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Parker",
    image: assets.sideUserLogo,
    email: "richardjames@gmail.com",
    phone: "+91 123 456 890",
    address: {
      line1: "57 cloth, richmond",
      line2: "circle sexy, london",
    },
    gender: "Male",
    dob: "2004-10-10",
  });
  const [isEdit, setIsEdit] = useState(false);
  return <div className=""></div>;
};

export default MyProfile;
