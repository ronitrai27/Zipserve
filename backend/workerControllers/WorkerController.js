const Booking = require("../models/BookingModel");
const Review = require("../models/reviewModel");
const getPendingBookingsForWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    // console.log("Received workerId:", workerId); // ✅ Debugging Log

    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    const pendingBookings = await Booking.find({
      workerId,
      status: "pending",
    }).sort({ createdAt: -1 });

    return res.status(200).json(pendingBookings);
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
//------------------------------------------------------------------
//-----------------------TOTAL EARNINGS
//------------------------------------------------------------------
const getWorkerStats = async (req, res) => {
  try {
    const { workerId } = req.params;
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    // Fetch bookings with earnings (Confirmed, In-Progress, Completed)
    const earningBookings = await Booking.find({
      workerId,
      status: { $in: ["confirmed", "in-Progress", "completed"] },
    });

    // Calculate total earnings
    const totalEarnings = earningBookings.reduce(
      (sum, booking) => sum + (booking.totalPrice || 0),
      0
    );

    // Count pending bookings
    const totalPendingBookings = await Booking.countDocuments({
      workerId,
      status: "pending",
    });

    // Count confirmed bookings
    const totalConfirmedBookings = await Booking.countDocuments({
      workerId,
      status: "confirmed",
    });

    res.status(200).json({
      totalEarnings,
      totalPendingBookings,
      totalConfirmedBookings,
    });
  } catch (error) {
    console.error("Error fetching worker stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//--------------------------------------------------------------------
//-------------------------GET CONFIRMED , IN-PROGRESS BOOKINGS
//--------------------------------------------------------------------
const getWorkerConfirmedAndInProgressBookings = async (req, res) => {
  try {
    const { workerId } = req.params;
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    // Fetch confirmed bookings
    const confirmedBookings = await Booking.find({
      workerId,
      status: "confirmed",
    }).sort({ createdAt: -1 });

    // Fetch in-progress bookings
    const inProgressBookings = await Booking.find({
      workerId,
      status: "in-progress",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      confirmedBookings,
      inProgressBookings,
    });
  } catch (error) {
    console.error("Error fetching worker bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//---------------------------------------------------------------
//-------------------------IN-PROGRESS
//---------------------------------------------------------------

const setBookingInProgress = async (req, res) => {
  try {
    const { bookingId, workerId } = req.body;

    // 🔴 Check if both fields are present
    if (!bookingId || !workerId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing bookingId or workerId" });
    }

    // 🔍 Step 1: Check if the worker already has an "in-progress" booking
    const existingInProgressBooking = await Booking.findOne({
      workerId,
      status: "in-progress",
    });

    if (existingInProgressBooking) {
      return res.status(400).json({
        success: false,
        message: "You already have an active booking.",
      });
    }

    // 🔄 Step 2: Update the booking status to "in-progress"
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId, status: "confirmed" }, // Update only if it's "confirmed"
      { status: "in-progress" },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or already updated.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking status updated to In-Progress.",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

//--------------------------------------------------------------------
//----------------------------GET ALL USERS
//-------------------------------------------------------------------
const User = require("../models/UserModel"); // Import User model

// Controller to fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords from the response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// module.exports = { getAllUsers };

//-------------------------------------------------------------
//-----------------------------REVIEWS
//--------------------------------------------------------------
const getWorkerReviews = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Find all reviews where workerId matches
    const reviews = await Review.find({ workerId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

module.exports = {
  getPendingBookingsForWorker,
  updateBookingStatus,
  getWorkerStats,
  getAllUsers,
  getWorkerConfirmedAndInProgressBookings,
  setBookingInProgress,
  getWorkerReviews,
};
