const express = require("express");
const router = express.Router();
const {
  updateProfileImage,
} = require("../workerControllers/ProfileController");
const cloudinaryFileUploader = require("../middlewares/fileUploader.js");

// Route for updating worker profile image
router.put(
  "/update-profile-image/:workerId",
  cloudinaryFileUploader.single("image"),
  updateProfileImage
);

module.exports = router;
