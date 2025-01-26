const cloudinaryFileUploader = require("../middlewares/fileUploader.js");
const routes = require("express").Router();
const {
  createWorker,
  getAllWorkers,
} = require("../controllers/workerController.js");

//Route to get all workers
routes.get("/workers", getAllWorkers);

// Route to create a new employee (with image upload)
routes.post(
  "/workers",
  cloudinaryFileUploader.single("profileImage"),
  createWorker
);
module.exports = routes;
