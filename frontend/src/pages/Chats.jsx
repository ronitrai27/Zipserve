import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Rating from "@mui/material/Rating";
import { LuClipboardList } from "react-icons/lu";
import { RiChatSmileAiLine } from "react-icons/ri";
import { TbSend2 } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
const Chats = () => {
  const { user, workers } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); // Stores fetched messages
  const [newMessage, setNewMessage] = useState(""); // Input field state
  const [selectedWorker, setSelectedWorker] = useState(null); // Store selected worker details

  // Filter the selected worker based on id
  useEffect(() => {
    if (id && workers.length > 0) {
      const worker = workers.find((worker) => worker._id === id);
      setSelectedWorker(worker || null); // Update state, if found
    }
  }, [id, workers]);
  //-------------------------------------------------
  const handleCategoryClick = (selectedId) => {
    if (id === selectedId) {
      navigate("/messages");
    } else {
      navigate(`/messages/${selectedId}`);
    }
  };
  //-------------------------------------------------------
  useEffect(() => {
    if (id) {
      fetchMessages();
    }
  }, [id]);

  // 🔥 Function to fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/messages/get-the-message?userId=${user._id}&workerId=${id}`
      );
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  //----------------------------------------------------------
  // ✨ Function to send a message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post("http://localhost:8080/api/messages/send", {
        userId: user._id,
        workerId: id,
        message: newMessage,
        senderType: "user",
      });

      setMessages((prev) => [...prev, res.data.newMessage]); // Update messages
      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  //-----------------------------------------------------------
  return (
    <div className="flex border-[1px] bg-stone-50 h-[90vh] rounded-t-xl px-2 py-2">
      {/* Left Side - Worker List */}
      <div className="w-1/3 border-r p-4 h-[90vh] overflow-y-auto font-inter scroll-smooth">
        <h2 className="text-[24px] font-medium mb-2 flex items-center justify-center gap-2 text-primary">
          <LuClipboardList className="text-xl" /> Workers
        </h2>
        <div className="space-y-4">
          {workers.map((worker) => (
            <div
              key={worker._id}
              onClick={() => handleCategoryClick(worker._id)}
              className={`flex items-center px-2 py-2  rounded-lg shadow-sm hover:bg-primary/85 hover:text-white cursor-pointer ${
                id === worker._id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {/* Worker Image */}
              <img
                src={worker.profileImage || "/default-avatar.png"}
                alt={worker.name}
                className="w-12 h-12 rounded-full object-cover mr-3"
              />

              {/* Worker Details */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full px-2 capitalize">
                  <span className="font-medium">{worker.name}</span>
                  {/* Rating (Stars) */}
                  <Rating
                    name={`rating-${worker._id}`}
                    size="small"
                    defaultValue={worker.stars}
                    precision={0.1}
                    readOnly
                  />
                </div>
                <span className="text-sm text-gray-800 capitalize ml-2">
                  {worker.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Window */}
      {/* <div className="flex-1 p-4 flex items-center justify-center">
        <p className="text-gray-600 text-[26px] capitalize flex items-center gap-2">
          <RiChatSmileAiLine className="text-primary text-3xl" /> Now you can
          chat with your favorite worker!!
        </p>
      </div> */}
      <div className="flex-1 p-4 flex flex-col h-[90vh]">
        {!id ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            <p className="text-gray-600 text-[26px] capitalize flex items-center gap-2 tracking-tight">
              <RiChatSmileAiLine className="text-primary text-3xl" /> Now you
              can chat with your favorite worker!!
            </p>
            <p className=" capitalize tracking-tighter text-[18px] text-gray-500 font-outfit">
              Start charting by selecting any worker
            </p>
          </div>
        ) : (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-2">
              <div className="bg-primary pl-5 py-2 rounded-md flex items-center gap-3">
                <img
                  src={selectedWorker.profileImage}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col text-white tracking-tight font-[16px] font-inter font-medium">
                  <p className=" capitalize">{selectedWorker.name}</p>
                  <p className="">{selectedWorker.email}</p>
                </div>
              </div>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`px-2 py-2 rounded-lg max-w-[60%] text-[15px] font-outfit tracking-tight ${
                      msg.senderType === "user"
                        ? "bg-blue-400 text-white self-end w-fit"
                        : "bg-gray-200 text-gray-800 self-start"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center text-[18px] tracking-wide capitalize">
                  Start a conversation with this worker!
                </p>
              )}
            </div>

            {/* Message Input Field */}
            <div className="flex items-center border-t p-2 bg-white">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg outline-none"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <TbSend2 className="text-xl" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chats;
