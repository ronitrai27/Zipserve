const express = require("express");
const {
  sendCompletionOTP,
  verifyCompletionOTP,
  updateSurgeCharge,
} = require("../workerControllers/CompBookingController");

const router = express.Router();

// Route to send OTP
router.post("/send-otp", sendCompletionOTP);

// Route to verify OTP and complete booking
router.post("/verify-otp", verifyCompletionOTP);

router.put("/update-surge/:bookingId", updateSurgeCharge);

module.exports = router;
