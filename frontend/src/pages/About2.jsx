import React from "react";
import { MagicCardDemo } from "../components/AnimationComp.jsx";

const About2 = () => {
  return (
    <div className="bg-slate-50 h-screen overflow-y-auto scroll-smooth">
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
        <div className="my-12">
          <MagicCardDemo />
        </div>
        {/* ------------------Why Choose Us ------------------ */}
        <div className="my-24">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Why Choose ZipServe?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Verified Professionals
                </h3>
                <p className="text-gray-600">
                  All our service providers undergo thorough background checks
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Quick Response
                </h3>
                <p className="text-gray-600">
                  Fast and efficient service delivery when you need it
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Satisfaction Guaranteed
                </h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className="w-20 h-20"></div>
      </div>
    </div>
  );
};

export default About2;
