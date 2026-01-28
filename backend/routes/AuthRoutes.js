const express = require("express");
const {
  registerUser,
  getUserDetails,
  loginUser,
  logoutUser,
} = require("../controllers/AuthController.js");
const protect = require("../middlewares/AuthMiddleware.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserDetails);
router.post("/logout", logoutUser);

module.exports = router;
