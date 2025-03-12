const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Required for both Google and traditional sign-in
    },
    email: {
      type: String,
      required: true, // Required for both Google and traditional sign-in
      unique: true, // Ensures email is unique
    },
    password: {
      type: String, // Optional for Google users
    },
    phone: {
      type: String,
      default: "", // Default empty for Google users
    },
    googleId: {
      type: String, // Only used for Google users
    },
    coins: {
      type: Number,
      default: 0.0, // Default value for coins
    },
    wallet: {
      type: Number,
      default: 256, // Default value for wallet balance
    },
    address: {
      type: String,
      default: "", // Default empty address
    },
    userImage: {
      type: String,
      default:
        "https://res.cloudinary.com/duvfwyqnd/image/upload/v1741749005/lnesarudy02wqtzhhlcz.png",
    },

    age: {
      type: Number,
      default: 18, // Default age (change if needed)
    },
    dob: {
      type: Date,
      default: null, // Default null until user updates
    },
    favouriteWorkers: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Workers" },
        name: String,
        profileImage: String,
        stars: Number,
        category: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
