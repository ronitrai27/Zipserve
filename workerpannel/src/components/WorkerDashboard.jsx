import { useEffect, useState } from "react";
import axios from "axios";
import { LuCalendarPlus } from "react-icons/lu";
import { useAppContext } from "../context/AppContext";
import boy from "../assets/boy.png";
import { LuCheck, LuCalendarSearch } from "react-icons/lu";
import { MdClose } from "react-icons/md";
const WorkerDashboard = ({ workerId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { users } = useAppContext();
  //----------------------------------------------------------
  //  ----------------------- Displays pending bookings.
  //----------------------------------------------------------
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/workers/pending/${workerId}`
        );
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    // Fetch bookings initially
    fetchBookings();

    // Set an interval to fetch bookings every 3 seconds
    const intervalId = setInterval(fetchBookings, 3000);

    // Cleanup interval when the component is unmounted or workerId changes
    return () => clearInterval(intervalId);
  }, [workerId]);

  //--------------------------------------------------------------
  //  ----------------------- Updates booking status in the database.
  //--------------------------------------------------------------
  const handleAction = async (bookingId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/workers/update-status/${bookingId}`,
        { status }
      );
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // if (loading)
  //   return <div className="text-center mt-10">Loading bookings...</div>;
  // console.log("worker id------->", workerId);
  // console.log("users----------->", users);

  return (
    <div className="max-w-[45%] min-w-[30%] px-3 py-2 bg-white font-inter rounded-xl min-h-[26rem] overflow-y-auto">
      <h1 className="text-[22px] font-medium mb-4 text-primary tracking-tight flex items-center gap-2 justify-center font-inter">
        <LuCalendarPlus className="text-primary text-2xl" /> Active Request
      </h1>
      {bookings.length === 0 ? (
        <div className="">
          <p className="text-gray-500 font-medium font-inter tracking-tight text-[18px] flex items-center gap-2 justify-center capitalize h-full mt-6">
            <LuCalendarSearch className="text-2xl" /> No pending bookings.
          </p>
        </div>
      ) : (
        bookings.map((booking) => {
          // Find the user details using booking.userId
          const user = users.find((user) => user._id === booking.userId);

          return (
            <div
              key={booking._id}
              className="bg-white shadow-md px-5 py-4 mb-4 rounded-lg border border-gray-200"
            >
              {/* User Details */}

              <div className="flex items-center justify-between  font-inter ">
                <div className="flex items-center gap-4 ">
                  <img
                    src={boy}
                    alt="User"
                    className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                  />

                  <p className="font-medium text-gray-800 text-[17px] tracking-tight capitalize">
                    {user ? user.name : "Unknown User"}
                  </p>
                  <p className="text-gray-800 tracking-tight text-[17px] font-medium">
                    <span className="">Price: </span>
                    {booking.totalPrice}
                  </p>
                  <p className="text-[17px] font-medium text-primary tracking-tight uppercase">
                    {booking.paymentMethod}
                  </p>
                </div>

                {/* Accept/Reject Buttons */}
                <div className="ml-6 flex gap-4">
                  <button
                    onClick={() => handleAction(booking._id, "confirmed")}
                    className="bg-primary text-white p-2 rounded-full hover:bg-blue-700 transition"
                  >
                    <LuCheck />
                  </button>
                  <button
                    onClick={() => handleAction(booking._id, "cancelled")}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <MdClose />
                  </button>
                </div>
              </div>

              {/* Booking Details */}
              {/* <p className="text-gray-700">
                <span className="font-semibold">Service:</span>{" "}
                {booking.subservices.map((s) => s.name).join(", ")}
              </p> */}
              {/* <p className="text-gray-700">
                <span className="font-semibold">Total Price:</span> $
                {booking.totalPrice}
              </p> */}
            </div>
          );
        })
      )}
    </div>
  );
};

export default WorkerDashboard;
