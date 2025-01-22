import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("sign up");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="border-t-[1px] bg-stone-50 h-full">
      <div className="flex items-center justify-center mt-14 ">
        <div class="border border-gray-100 shadow w-[360px] p-8 rounded-md bg-white">
          <div class="flex justify-between text-sm">
            <div class="flex items-center gap-2">
              <img src={assets.z} alt="" className="w-10 -mt-3" />
            </div>
            <div>
              {state === "sign up" ? (
                <p className="tracking-wider">
                  Have an account?
                  <button
                    href="#"
                    class="font-semibold text-blue-600 hover:underline ml-1"
                    onClick={() => setState("login")}
                  >
                    Log in
                  </button>
                </p>
              ) : (
                <p className="tracking-tight">
                  New to Zipserve?
                  <button
                    href="#"
                    class="font-semibold text-blue-600 hover:underline ml-1"
                    onClick={() => setState("sign up")}
                  >
                    Create Account
                  </button>
                </p>
              )}
            </div>
          </div>

          <div class="mt-10">
            {state === "sign up" ? (
              <h1 class="text-2xl font-semibold">
                Register & Avail Discounts on Bookings!
              </h1>
            ) : (
              <h1 class="text-2xl font-semibold">Welcome Back!</h1>
            )}
          </div>

          <p class="text-sm mt-4">
            Zipserve commits to deliver transparency and comfort to customers.
          </p>

          <div class="mt-6">
            {state === "sign up" && (
              <input
                placeholder="Username"
                type="text"
                class="p-2 px-3 border-b-[2px] focus:border-blue-400 w-full outline-none bg-white transition duration-300"
              />
            )}

            <input
              placeholder="Email"
              type="email"
              class="p-2 px-3 mt-3 border-b-[2px] focus:border-blue-400 w-full outline-none bg-white transition duration-300"
            />
            <input
              placeholder="Password"
              type="password"
              class="p-2 px-3 mt-3 border-b-[2px] focus:border-blue-400 w-full outline-none bg-white transition duration-300"
            />
          </div>

          <div class="mt-4 flex items-center">
            <input
              class="h-4 w-4 border-gray-300 focus:ring-blue-500 text-blue-600"
              type="checkbox"
              id="terms"
            />
            <label class="ml-2 text-sm text-gray-600" for="terms">
              I agree to the
              <a class="text-blue-600 hover:underline" href="#">
                Terms and Conditions
              </a>
            </label>
          </div>

          {state === "sign up" ? (
            <button
              type="submit"
              class="bg-blue-600 text-white text-sm h-10 w-[130px] rounded-md font-semibold mt-5 shadow-md hover:bg-blue-700 transition duration-300 hover:scale-105"
            >
              Get Started
            </button>
          ) : (
            <button
              type="submit"
              class="bg-blue-600 text-white text-sm h-10 w-[130px] rounded-md font-semibold mt-5 shadow-md hover:bg-blue-700 transition duration-300 hover:scale-105"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
