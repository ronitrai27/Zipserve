const cloudinaryFileUploader = require("../middlewares/fileUploader.js");
const routes = require("express").Router();
const {
  createWorker,
  getAllWorkers,
} = require("../controllers/workerController.js");

const {
  getWorkerReviews,
  addWorkerReview,
} = require("../controllers/reviewController.js");

//Route to get all workers
routes.get("/workers", getAllWorkers);

// Route to create a new employee (with image upload)
routes.post(
  "/workers",
  cloudinaryFileUploader.single("profileImage"),
  createWorker
);

// Get reviews for a specific worker
routes.get("/workers/:workerId/reviews", getWorkerReviews);

// Add a review for a specific worker
routes.post("/workers/:workerId/reviews", addWorkerReview);

module.exports = routes;
