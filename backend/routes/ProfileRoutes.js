const express = require("express");
const router = express.Router();
const { updateProfileImage } = require("../controllers/ProfileController");
const cloudinaryFileUploader = require("../middlewares/fileUploader.js");

// Route for updating worker profile image
router.put(
  "/update-user-image/:userId",
  cloudinaryFileUploader.single("image"),
  updateProfileImage
);

module.exports = router;
