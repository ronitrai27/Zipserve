const Booking = require("../models/BookingModel");
//------------------------------------------------------
// Long polling for workers to check pending bookings
//------------------------------------------------------
const getPendingBookingsForWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    const checkForUpdates = async () => {
      while (true) {
        const pendingBookings = await Booking.find({
          workerId,
          status: "pending",
        }).sort({ createdAt: -1 });
        if (pendingBookings.length > 0) {
          return res.status(200).json(pendingBookings);
        }

        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
      }
    };

    checkForUpdates();
  } catch (error) {
    console.error("Error fetching pending bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//------------------------------------------------------
// Worker updates booking status (Accept/Reject)
//------------------------------------------------------
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body; // "confirmed" or "cancelled"

    if (!["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res
      .status(200)
      .json({ message: `Booking ${status} successfully`, booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getPendingBookingsForWorker, updateBookingStatus };
