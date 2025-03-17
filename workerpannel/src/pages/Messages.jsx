import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { LuScanFace } from "react-icons/lu";
function Messages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedWorker, users } = useAppContext();
  const [messagedUserIds, setMessagedUserIds] = useState([]); // Stores user IDs who messaged the worker
  const [messages, setMessages] = useState([]); // Chat history

  //-----------------------------------------------
  //---------------GETTING USERS WHO MESSAGED THE WORKER
  //-----------------------------------------------
  useEffect(() => {
    // Fetch user IDs who messaged the worker
    const fetchMessagedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mess/${loggedWorker?._id}/users`
        );
        setMessagedUserIds(response.data);
      } catch (error) {
        // toast.error("Failed to fetch messages");
        console.error(error);
      }
    };

    fetchMessagedUsers();
  }, [loggedWorker?._id]);
  //---------------------------------------------------

  // Fetch chat history when a user is selected
  useEffect(() => {
    if (!id) return; // If no user is selected, don't fetch

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mess/${loggedWorker?._id}/${id}`
        );
        setMessages(response.data);
      } catch (error) {
        // toast.error("Failed to fetch chat");
        console.error(error);
      }
    };

    fetchMessages();
  }, [id, loggedWorker?._id]);
  //-----------------------------------------------------
  // console.log("ID PARAM --->", id);
  // console.log("ALL USER MESSAGED ID---->", messagedUserIds);
  return (
    <div className="flex h-[90vh]">
      {/* LEFT SIDE - User List */}
      <div className="max-w-[25%] min-w-[25%] bg-gray-100 px-3 py-2 border-r-[1px] border-primary">
        <h2 className="text-[18px] capitalize font-inter text-center mb-5">
          Messages
        </h2>

        {messagedUserIds.length === 0 ? (
          <p className="text-gray-500">No messages yet</p>
        ) : (
          <ul>
            {messagedUserIds.map((userId) => {
              const user = users.find((u) => u._id === userId);
              return (
                user && (
                  <li
                    key={user._id}
                    className="px-6 py-3 bg-white shadow-md rounded-md mb-2 cursor-pointer hover:bg-blue-500 hover:text-white flex items-center justify-between font-inter"
                    onClick={() => navigate(`/messages/${user._id}`)}
                  >
                    <img
                      src={user.userImage}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col  ">
                      <p className="font-semibold capitalize">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </li>
                )
              );
            })}
          </ul>
        )}
      </div>

      {/* RIGHT SIDE - Placeholder */}
      {/* <div className="w-2/3 flex items-center justify-center font-inter">
        <p className="text-gray-500 text-[26px] capitalize flex items-center gap-3">
          <LuScanFace className="text-2xl" /> Select a user to view messages
        </p>
      </div> */}
      {/* Right Side - Chat Box */}
      <div className="w-full h-full flex flex-col">
        <div className=" bg-gray-200 border-b text-lg font-semibold">
          {/* {id
            ? `Chat with ${users.find((u) => u._id === id)?.name}`
            : "Select a user"} */}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-inter">
          {id ? (
            messages.length === 0 ? (
              <p className="text-gray-500">No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-3 rounded-md max-w-[70%] ${
                    msg.senderType === "user"
                      ? "bg-gray-300 text-black self-end ml-auto w-fit"
                      : "bg-primary text-white self-start"
                  }`}
                >
                  {msg.message}
                </div>
              ))
            )
          ) : (
            <p className="text-gray-500 flex items-center justify-center h-full">
              Select a user to view messages
            </p>
          )}
        </div>

        {/* {id && (
          <div className="p-4 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md"
              placeholder="Type a message..."
            />
            <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Send
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Messages;
