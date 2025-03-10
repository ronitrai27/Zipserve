const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  senderType: {
    type: String,
    enum: ["user", "worker"],
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
