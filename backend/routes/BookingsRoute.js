const express = require("express");
const {
  createBooking,
  getUserBookings,
  getBookingById,
  getFilteredBookings,
} = require("../controllers/BookingController.js");

const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings);
router.get("/book/:bookingId", getBookingById);
router.get("/filter/:userId", getFilteredBookings);

module.exports = router;
