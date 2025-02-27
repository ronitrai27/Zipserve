const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    subservices: [
      {
        name: { type: String, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    date: { type: String, required: true }, // Format: "YYYY-MM-DD"
    time: { type: String, required: true }, // Format: "12:00 PM"
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in progress", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
