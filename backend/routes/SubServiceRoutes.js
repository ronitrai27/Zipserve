const express = require("express");
const router = express.Router();
const {
  createSubservice,
  getSubservicesByCategory,
} = require("../controllers/SubServiceController");
const cloudinaryFileUploader = require("../middlewares/fileUploader");

//  Route to Create a Subservice (with Image Upload)------
router.post(
  "/create",
  cloudinaryFileUploader.single("image"),
  createSubservice
);

//  Route to Get Subservices by Category--------------
router.get("/:category", getSubservicesByCategory);

module.exports = router;
