import { useEffect, useState } from "react";
import axios from "axios";

const WorkerDashboard = ({ workerId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return <div className="text-center mt-10">Loading bookings...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Worker Dashboard</h1>
      {bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-md p-4 mb-4 rounded-lg"
          >
            <p className="font-semibold">User ID: {booking.userId}</p>
            <p>Service: {booking.subservices.map((s) => s.name).join(", ")}</p>
            <p>Total Price: ${booking.totalPrice}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleAction(booking._id, "confirmed")}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(booking._id, "cancelled")}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkerDashboard;
