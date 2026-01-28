const ReviewModel = require("../models/reviewModel.js");
const EmployeeModel = require("../models/workerModel.js");

// ------------------------Controller to get reviews for a worker-----------------------------
const getWorkerReviews = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Validate if workerId is a valid MongoDB ObjectId
    if (!workerId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid worker ID format" });
    }

    // Check if worker exists
    const workerExists = await EmployeeModel.findById(workerId);
    if (!workerExists) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const reviews = await ReviewModel.find({ workerId });
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this worker" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// ------------------------Controller to add a review-----------------------------
const addWorkerReview = async (req, res) => {
  try {
    const { workerId, userId } = req.params; // Now getting both from params
    const { customerName, comment, stars } = req.body;

    // Validate if workerId and userId are valid MongoDB ObjectIds
    if (
      !workerId.match(/^[0-9a-fA-F]{24}$/) ||
      !userId.match(/^[0-9a-fA-F]{24}$/)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid worker ID or user ID format" });
    }

    // Check if worker exists
    const workerExists = await EmployeeModel.findById(workerId);
    if (!workerExists) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Validate required fields
    if (!customerName || !comment || stars === undefined) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    // Validate stars (rating should be between 1 and 5)
    if (stars < 1 || stars > 5) {
      return res.status(400).json({ message: "Stars must be between 1 and 5" });
    }

    // Create new review
    const newReview = new ReviewModel({
      workerId,
      userId,
      customerName,
      comment,
      stars,
    });

    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding review" });
  }
};

module.exports = {
  getWorkerReviews,
  addWorkerReview,
};
