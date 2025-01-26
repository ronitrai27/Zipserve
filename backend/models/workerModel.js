const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Example: 10-digit phone number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  category: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  about: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  address: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const EmployeeModel = mongoose.model("Worker", EmployeeSchema); // Connecting schema to collection in the database
module.exports = EmployeeModel;
