const Booking = require("../models/BookingModel.js");
// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public (For now, userId is sent from frontend)
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      workerId,
      subservices,
      totalPrice,
      date,
      time,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !workerId ||
      !subservices ||
      !totalPrice ||
      !date ||
      !time ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new booking document
    const newBooking = new Booking({
      userId,
      workerId,
      subservices,
      totalPrice,
      date,
      time,
      paymentMethod,
    });

    // Save to database
    await newBooking.save();

    // Fetch the latest booking for this user
    const latestBooking = await Booking.findOne({ userId })
      .sort({ createdAt: -1 }) // Sort by latest booking
      .select("_id"); // Only fetch the booking ID

    res.status(201).json({
      message: "Booking Request Initiated",
      bookingId: latestBooking._id,
    });
  } catch (error) {
    console.error("Error while booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get all bookings for a specific user
// @route   GET /api/bookings/:userId
// @access  Public (For now, userId is sent from frontend)
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Define the statuses to fetch
    const allowedStatuses = ["pending", "confirmed", "in-progress"];

    // Fetch only bookings with allowed statuses
    const bookings = await Booking.find({
      userId,
      status: { $in: allowedStatuses },
    }).sort({ createdAt: -1 });

    // Count the number of bookings for each status
    const pendingCount = await Booking.countDocuments({
      userId,
      status: "pending",
    });
    const confirmedCount = await Booking.countDocuments({
      userId,
      status: "confirmed",
    });
    const inProgressCount = await Booking.countDocuments({
      userId,
      status: "in-progress",
    });

    res.status(200).json({
      bookings,
      counts: {
        pending: pendingCount,
        confirmed: confirmedCount,
        inProgress: inProgressCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//--------------------------------------------------------------
//------------------------BOOKINGS BY ID
//--------------------------------------------------------------
const mongoose = require("mongoose");

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid Booking ID format." });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//-------------------------------------------------------------
//----------------------------FILTER BOOKINGS
//-------------------------------------------------------------

const getFilteredBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, paymentMethod, status } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    let filter = { userId };

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filter["date.year"] = {
        $gte: start.getFullYear(),
        $lte: end.getFullYear(),
      };
      filter["date.month"] = {
        $gte: start.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        $lte: end.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      };
      filter["date.date"] = { $gte: start.getDate(), $lte: end.getDate() };
    } else if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    } else if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching filtered bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  getFilteredBookings,
};
