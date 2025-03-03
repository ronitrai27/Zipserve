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
    const { userId } = req.params; // Get userId from URL params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch all bookings for the user
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createBooking, getUserBookings };
