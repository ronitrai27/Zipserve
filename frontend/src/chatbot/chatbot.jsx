import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../context/Context";
import ai from "../assets/ai.png";
import { LuSend } from "react-icons/lu";
import { assets } from "../assets/assets";
import {
  LuChevronsDownUp,
  LuMessageSquareCode,
  LuPhoneForwarded,
} from "react-icons/lu";
import z from "../assets/z-zipserve1.png";
import robot from "../assets/robot.png";
import { BsStars } from "react-icons/bs";
import styled from "styled-components";

const Chatbot = () => {
  const {
    onSent,
    recentprompt,
    showresult,
    loading,
    resultdata,
    setinput,
    input,
    opened,
    setOpened,
  } = useContext(Context);
  const [readyChat, setReadyChat] = useState(false);

  return (
    <div>
      {!opened && (
        <motion.div
          onClick={() => setOpened(!opened)}
          className="fixed bottom-14 right-2 bg-white p-2 rounded-full shadow-xl border-[.5px] border-primary cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <img src={ai} alt="ai-widget" className="w-7 " />
        </motion.div>
      )}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed bottom-6 right-12 w-[28%] bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* top part */}
            <motion.div
              className="top-part flex items-center justify-between font-outfit pt-2 pb-7 px-4 bg-gradient-to-b from-blue-600 to-primaryLight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-start gap-4 mt-2">
                <img src={z} alt="" className="w-8" />
                <p className="text-white text-[24px] font-semibold tracking-wide">
                  ZOX AI
                </p>
              </div>
              <motion.p
                onClick={() => setOpened(!opened)}
                className="bg-white w-fit rounded-full p-1 text-primary hover:scale-110 hover:text-black transition-all duration-200 cursor-pointer mt-2"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <LuChevronsDownUp className="text-2xl" />
              </motion.p>
            </motion.div>

            {/* CHAT-BODY */}
            <motion.div
              className="chat-body h-[20.5rem] overflow-y-auto scroll-smooth px-4 py-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {showresult ? (
                <div className="flex flex-col space-y-5">
                  {/* user-input */}
                  <div className="flex items-center gap-3 justify-end">
                    <p className="font-inter text-[14px] font-[400] tracking-tight border-[1px] border-gray-100 p-2 bg-gray-100 capitalize rounded-xl leading-5">
                      {recentprompt}
                    </p>
                    <img
                      src={assets.sideUserLogo}
                      alt=""
                      className="w-7 rounded-full"
                    />
                  </div>
                  {/* bot-response */}
                  <div className="">
                    {loading ? (
                      <StyledWrapper>
                        <div className="loading">
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                      </StyledWrapper>
                    ) : (
                      <div className="w-[75%] flex items-center gap-2">
                        <BsStars className="text-2xl text-blue-800 self-start shrink-0" />
                        <p
                          dangerouslySetInnerHTML={{ __html: resultdata }}
                          className="font-inter text-[14px] font-[400] tracking-tight border-[1px] border-gray-100 p-2 bg-gray-100 capitalize rounded-xl leading-5 "
                        ></p>
                      </div>
                    )}
                  </div>
                </div>
              ) : !readyChat ? (
                <div className="relative">
                  <motion.img
                    src={robot}
                    alt=""
                    className="w-1/3  mt-14 mx-[10%]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  />
                  <motion.div
                    className="absolute -top-12 right-1 bg-gray-200 rounded-xl px-3 py-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-[16px] font-[400] text-gary-800">
                      Hy! John, myself ZOX <br /> I will be assisting you!!
                    </p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 justify-items-center gap-x-3 mt-12 font-inter tracking-tighter"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p
                      onClick={() => {
                        setReadyChat(true);
                      }}
                      className="capitalize text-[16px] font-[400] flex items-center gap-2 bg-gray-200 text-gray-800 px-2 py-3 rounded-lg shadow-sm hover:scale-110 transition-all duration-300 hover:shadow-lg cursor-pointer tracking-tighter"
                    >
                      <LuMessageSquareCode />
                      Ask your all Queries
                    </p>
                    <p
                      onClick={() => {
                        setReadyChat(true);
                      }}
                      className="capitalize text-[16px] font-[400] flex items-center gap-2 bg-gray-200 text-gray-800 px-2 py-3 rounded-lg shadow-sm hover:scale-110 transition-all duration-300 hover:shadow-lg cursor-pointer tracking-tighter"
                    >
                      <LuPhoneForwarded />
                      Connect with agent
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="flex items-center justify-start gap-3 mt-3 w-[70%] ">
                  <BsStars className="shrink-0 text-2xl text-blue-800 self-start" />
                  <p className=" text-[15px] font-inter font-[400] tracking-tight border-[1px] border-gray-100 p-2 bg-gray-100 capitalize rounded-xl leading-5">
                    I am Zox. Do you want me to help you navigate this app or
                    need any other help , please feel free to ask
                  </p>
                </div>
              )}
            </motion.div>

            {/* bottom-part */}
            <motion.div
              className="py-4 px-6 bg-gradient-to-t from-blue-600 to-primaryLight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {readyChat ? (
                <div className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-full w-[80%] mx-auto">
                  <input
                    onChange={(e) => setinput(e.target.value)}
                    value={input}
                    type="text"
                    placeholder="Write something..."
                    className="bg-transparent outline-none p-2 text-gray-800 font-[400]"
                  />
                  <p className="cursor-pointer hover:scale-105 transition-all hover:rotate-45">
                    <LuSend onClick={() => onSent()} className="text-2xl" />
                  </p>
                </div>
              ) : (
                <div className="text-white font-light text-[14px] italic text-center tracking-tight">
                  Your messages and all queries will be recorded for training
                  and testing purposes.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const StyledWrapper = styled.div`
  .loading {
    --speed-of-animation: 0.9s;
    --gap: 6px;
    --first-color: #4c86f9;
    --second-color: #49a84c;
    --third-color: #f6bb02;
    --fourth-color: #f6bb02;
    --fifth-color: #2196f3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    gap: 6px;
    height: 100px;
  }

  .loading span {
    width: 4px;
    height: 50px;
    background: var(--first-color);
    animation: scale var(--speed-of-animation) ease-in-out infinite;
  }

  .loading span:nth-child(2) {
    background: var(--second-color);
    animation-delay: -0.8s;
  }

  .loading span:nth-child(3) {
    background: var(--third-color);
    animation-delay: -0.7s;
  }

  .loading span:nth-child(4) {
    background: var(--fourth-color);
    animation-delay: -0.6s;
  }

  .loading span:nth-child(5) {
    background: var(--fifth-color);
    animation-delay: -0.5s;
  }

  @keyframes scale {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1);
    }
  }
`;

export default Chatbot;
