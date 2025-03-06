const express = require("express");
const router = express.Router();
const {
  getPendingBookingsForWorker,
  updateBookingStatus,
} = require("../workerControllers/WorkerController.js");

// Long polling: Get pending bookings for a worker
router.get("/pending/:workerId", getPendingBookingsForWorker);

// Update booking status (Accept/Reject)
router.put("/update-status/:bookingId", updateBookingStatus);

module.exports = router;
