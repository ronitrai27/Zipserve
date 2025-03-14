const express = require("express");
const {
  sendCompletionOTP,
  verifyCompletionOTP,
} = require("../workerControllers/CompBookingController");

const router = express.Router();

// Route to send OTP
router.post("/send-otp", sendCompletionOTP);

// Route to verify OTP and complete booking
router.post("/verify-otp", verifyCompletionOTP);

module.exports = router;
