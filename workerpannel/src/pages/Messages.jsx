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
  const [newMessage, setNewMessage] = useState("");
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
  //------------------------------------------------------------
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post("http://localhost:8080/api/mess/send", {
        workerId: loggedWorker?._id,
        userId: id,
        message: newMessage,
      });

      setMessages([...messages, { senderType: "worker", message: newMessage }]); // Add to UI instantly
      setNewMessage(""); // Clear input
    } catch (error) {
      toast.error("Failed to send message");
    }
  };
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
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </li>
                )
              );
            })}
          </ul>
        )}
      </div>

      {/* Right Side - Chat Box */}
      <div className="w-full h-full flex flex-col">
        {/* User Details at the Top */}
        {id && (
          <div className="w-full h-14 bg-primary text-white flex items-center px-4 gap-3">
            {/** Find the user from the users list **/}
            {users.length > 0 && (
              <>
                {users
                  .filter((user) => user._id === id)
                  .map((user) => (
                    <div key={user._id} className="flex items-center gap-3">
                      <img
                        src={user.userImage}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-lg capitalize">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-200">{user.email}</p>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        )}

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
                      : "bg-primary text-white self-start w-fit "
                  }`}
                >
                  {msg.message}
                </div>
              ))
            )
          ) : (
            <p className="text-gray-500 flex items-center justify-center h-full text-[22px] capitalize gap-3">
              <LuScanFace className="text-3xl" /> Select a user to view messages
            </p>
          )}
        </div>

        {/* Message Input */}
        {id && (
          <div className="p-4 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
