const express = require("express");
const {
  createBooking,
  getUserBookings,
} = require("../controllers/BookingController.js");

const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings);
module.exports = router;
