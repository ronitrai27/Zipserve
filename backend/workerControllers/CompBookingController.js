const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const sendEmail = require("../utils/emailService");

let otpStore = {}; // Temporary storage for OTPs

const sendCompletionOTP = async (req, res) => {
  try {
    const { bookingId, workerId } = req.body;

    // Find the booking
    const booking = await Booking.findOne({
      _id: bookingId,
      workerId,
      status: "in-progress",
    });
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "Booking not found or not in-progress",
      });
    }

    // Get user details
    const user = await User.findById(booking.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStore[bookingId] = otp; // Store OTP temporarily

    // Send OTP email
    await sendEmail(
      user.email,
      "Booking Completion OTP",
      `Your OTP for booking completion is: ${otp}`
    );

    res.status(200).json({ success: true, message: "OTP sent to user email" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};
// ✅ Verify OTP and complete booking
const verifyCompletionOTP = async (req, res) => {
  try {
    const { bookingId, workerId, enteredOtp } = req.body;

    // Check if the booking exists
    const booking = await Booking.findOne({
      _id: bookingId,
      workerId,
      status: "in-progress",
    });
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking or not in-progress",
      });
    }

    // Check OTP
    if (!otpStore[bookingId] || otpStore[bookingId] != enteredOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Update status to "completed"
    booking.status = "completed";
    await booking.save();

    // Clear OTP after successful verification
    delete otpStore[bookingId];

    res
      .status(200)
      .json({ success: true, message: "Booking marked as completed" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};
//---------------------------------------------------------------
updateSurgeCharge = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { surgeCharge } = req.body;

    if (!surgeCharge || surgeCharge < 0) {
      return res.status(400).json({ message: "Invalid surge charge amount" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { surgeCharge },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Surge charge updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
//---------------------------------------------------------------
module.exports = { sendCompletionOTP, verifyCompletionOTP, updateSurgeCharge };
