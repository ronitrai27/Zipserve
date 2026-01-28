const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  category: { type: String, required: true },
  profileImage: { type: String, required: true },
  price: { type: Number, required: true },
  about: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
  address: { type: String, required: true },
  available: { type: Boolean, default: true },
  age: { type: Number, required: true, min: 18 },
  experience: { type: Number, required: true, min: 0 },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

WorkerSchema.index({ location: "2dsphere" });

const WorkerModel = mongoose.model("Workers", WorkerSchema);
module.exports = WorkerModel;
