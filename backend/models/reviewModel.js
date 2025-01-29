const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workers", // Reference to the Workers collection
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReviewModel = mongoose.model("Reviews", ReviewSchema);
module.exports = ReviewModel;
