const mongoose = require("mongoose");

const SubserviceSchema = new mongoose.Schema({
  category: {
    type: String, // Example: "Plumber", "Electrician"
    required: true,
  },
  services: [
    {
      name: { type: String, required: true }, // Service name (e.g., Drainage Cleaning)
      price: { type: Number, required: true }, // Price of the service
      image: { type: String, required: true }, // Service image URL
    },
  ],
});

const Subservice = mongoose.model("Subservice", SubserviceSchema);
module.exports = Subservice;
