const express = require("express");
const {
  createBooking,
  getUserBookings,
  getBookingById,
  getFilteredBookings,
  getUserBookingHistory,
  cancelBooking,
  getAllBookings,
} = require("../controllers/BookingController.js");

const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings);
router.get("/book/:bookingId", getBookingById);
router.get("/filter/:userId", getFilteredBookings);
router.get("/history/:userId", getUserBookingHistory);
router.put("/cancel/:bookingId", cancelBooking);
router.get("/all/:workerId", getAllBookings);
module.exports = router;
