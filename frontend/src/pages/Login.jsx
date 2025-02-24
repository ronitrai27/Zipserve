import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import img from "../assets/homeImg1-removebg-preview.png";
import { LuBadgeCheck } from "react-icons/lu";
import styled from "styled-components";
import logo from "../assets/newZipserveBlack-removebg-preview.png";
import "../components/Register.css";
import { LuLogIn } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext";
const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  //---------------
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password: pass },
        { withCredentials: true }
      );
      toast.success("Login Successful! ");

      //------Resetting the userdata
      const userResponse = await axios.get(
        "http://localhost:8080/api/auth/me",
        {
          withCredentials: true,
        }
      );
      setUser(userResponse.data.user);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      const errorMessage = err.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex  font-inter p-1">
      {/* leftside */}
      <div className="min-w-[36%] max-w-[38%] px-4 py-8">
        <img src={logo} alt="" className="w-[11rem] " />

        <div className=" flex flex-col justify-center h-full">
          <h1 className="text-[30px] text-black font-medium tracking-tight capitalize px-8 leading-8 mb-2 text-center">
            <span className="text-primary text-[34px]">Welcome </span>
            Back!
          </h1>
          <p className="text-gray-400 italic text-[18px] font-medium text-center text-pretty">
            Zipserve commits to deliver transparency and comfort to customers.
          </p>
          {/* -----------form--------------- */}
          <form
            className="flex flex-col gap-2 items-center justify-center mt-5 bg-gray-50 py-4 rounded-3xl"
            onSubmit={handleLogin}
          >
            <div className="mb-4">
              <GoogleLogin
                // onSuccess={handleGoogleLogin}
                onError={() => toast.error("Google Login Failed")}
              />
            </div>

            <StyledWrapper>
              {/* email */}
              <div className="form mb-2">
                <input
                  className="input"
                  placeholder="EMAIL"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="input-border" />
              </div>

              {/* Pass */}
              <div className="form">
                <input
                  className="input"
                  placeholder="PASSWORD"
                  value={pass}
                  type="text"
                  onChange={(e) => setPass(e.target.value)}
                />
                <span className="input-border" />
              </div>
            </StyledWrapper>
            {/* terms and condition */}
            <div className="mt-4 flex items-center">
              <StyledWrapper>
                <label className="container">
                  <input type="checkbox" />
                  <svg viewBox="0 0 64 64" height="1em" width="1em">
                    <path
                      d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                      pathLength="575.0541381835938"
                      className="path"
                    />
                  </svg>
                </label>
              </StyledWrapper>
              {
                <label class="ml-2 text-sm text-gray-600" for="terms">
                  I agree to the
                  <a class="text-blue-600 hover:underline" href="#">
                    Terms and Conditions
                  </a>
                </label>
              }
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="group relative cursor-pointer w-36 border bg-white rounded-full overflow-hidden text-black font-semibold hover:shadow-lg transition-shadow duration-300 mt-6"
              // onClick={() => navigate("/workers")}
            >
              <span className="translate-x-8 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-500 ease-in-out inline-block px-2 py-2">
                Login
              </span>
              <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <span>Login</span>
                <LuLogIn className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <div className="absolute top-[50%] left-[15%] -translate-y-1/2 h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-[#3b75ef] scale-[1] dark:group-hover:bg-[#3b75ef] group-hover:bg-[#3b75ef] group-hover:scale-[1.8] transition-all duration-500 ease-out group-hover:top-[0%] group-hover:left-[0%] group-hover:translate-y-0"></div>
            </button>
          </form>
          <p
            onClick={() => navigate("/register")}
            className="text-[14px] font-light mt-6 tracking-tight pl-8 text-gray-500"
          >
            New To Zipserve?{" "}
            <span className="text-primary underline underline-offset-4 cursor-pointer hover:text-blue-700">
              Register
            </span>
          </p>
        </div>
      </div>
      {/* rightside */}
      <div className="background flex-1 rounded-xl">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
        <div className="blob blob4"></div>
        <div className="px-8 py-10">
          <p className="text-white text-[3rem] font-semibold tracking-tighter leading-[3rem] w-[80%] font-outfit">
            AI-Powered Service,
            <br />{" "}
            <span className="italic">
              &nbsp;&nbsp;&nbsp;&nbsp; Human-Level Care.
            </span>
          </p>
          <div className=" flex items-center justify-between mt-20">
            <div className="points flex flex-col gap-5">
              <p className="flex items-center gap-2 text-white font-medium text-[18px] uppercase whitespace-nowrap">
                <LuBadgeCheck className="text-3xl" /> AI personal Assistant
              </p>
              <p className="flex items-center gap-2 text-white font-medium text-[18px] uppercase">
                <LuBadgeCheck className="text-3xl" /> Transparent pricing
              </p>
              <p className="flex items-center gap-2 text-white font-medium text-[18px] uppercase">
                <LuBadgeCheck className="text-3xl" /> best class services
              </p>
              <p className="flex items-center gap-2 text-white font-medium text-[18px] uppercase">
                <LuBadgeCheck className="text-3xl" /> full convinience
              </p>
              <p className="flex items-center gap-2 text-white font-medium text-[18px] uppercase">
                <LuBadgeCheck className="text-3xl" /> 24/7 customer care
              </p>
            </div>
            <div className=" rotate-3 -mt-20">
              <img src={img} alt="" className="" />
            </div>
          </div>
          <div className="text-center px-16 mt-20">
            <p className="text-white font-medium italic text-[17px]">
              ZIP IT! , BOOK IT! , RELAX!
            </p>
            <p className="text-gray-400 mt-3 font-light">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum,
              delectus in nam vel perferendis fugit quos saepe quae odit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const StyledWrapper = styled.div`
  .form {
    --width-of-input: 300px;
    --border-height: 1px;
    --border-before-color: rgba(221, 221, 221, 0.99);
    --border-after-color: #5891ff;
    --input-hovered-color: #4985e01f;
    position: relative;
    width: var(--width-of-input);
  }
  /* styling of Input */
  .input {
    color: black;
    font-size: 0.9rem;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
    padding-inline: 0.5em;
    padding-block: 0.7em;
    border: none;
    border-bottom: var(--border-height) solid var(--border-before-color);
  }
  /* styling of animated border */
  .input-border {
    position: absolute;
    background: var(--border-after-color);
    width: 0%;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }
  /* Hover on Input */
  input:hover {
    background: var(--input-hovered-color);
  }

  input:focus {
    outline: none;
  }
  /* here is code of animated border */
  input:focus ~ .input-border {
    width: 100%;
  }
  /* === if you want to do animated border on typing === */
  /* remove input:focus code and uncomment below code */
  /* input:valid ~ .input-border{
    width: 100%;
  } */

  // -------
  .container {
    cursor: pointer;
  }

  .container input {
    display: none;
  }

  .container svg {
    overflow: visible;
  }
  .path {
    fill: none;
    stroke: #1a73e8;
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke-dasharray 0.5s ease;
    stroke-dasharray: 0 0 240 99999;
    stroke-dashoffset: 1;
    scale: -1 1;
    transform-origin: center;
    animation: hi 0.5s;
  }

  .container input:checked ~ svg .path {
    stroke-dasharray: 0 262 70 9999999;
    transition-delay: 0s;
    scale: 1 1;
    animation: none;
  }
  @keyframes hi {
    0% {
      stroke-dashoffset: 20;
    }
    to {
      stroke-dashoffset: 1;
    }
  }
`;

export default Register;
