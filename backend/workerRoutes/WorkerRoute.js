const express = require("express");
const router = express.Router();
const {
  getPendingBookingsForWorker,
  updateBookingStatus,
  getWorkerStats,
  getAllUsers,
  getWorkerConfirmedAndInProgressBookings,
  setBookingInProgress,
  getWorkerReviews,
} = require("../workerControllers/WorkerController.js");

// Long polling: Get pending bookings for a worker
router.get("/pending/:workerId", getPendingBookingsForWorker);

// Update booking status (Accept/Reject)
router.put("/update-status/:bookingId", updateBookingStatus);
router.get("/stats/:workerId", getWorkerStats);
router.get("/all/users", getAllUsers);
router.get(
  "/worker-confirm-progress/:workerId",
  getWorkerConfirmedAndInProgressBookings
);
router.post("/set-in-progress", setBookingInProgress);

router.get("/worker-reviews/:workerId", getWorkerReviews);

module.exports = router;
