const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workers",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1, // Minimum rating of 1
    max: 5, // Maximum rating of 5
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReviewModel = mongoose.model("Reviews", ReviewSchema);
module.exports = ReviewModel;
