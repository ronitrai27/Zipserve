const Worker = require("../models/workerModel");

const updateProfileImage = async (req, res) => {
  try {
    const { workerId } = req.params;
    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file received." });
    }

    // Get the uploaded image URL from Cloudinary
    const imageUrl = req.file.path;
    console.log("✅ Uploaded Image URL:", imageUrl);

    // Update worker's profileImage in the database
    const updatedWorker = await Worker.findByIdAndUpdate(
      workerId,
      { profileImage: imageUrl },
      { new: true }
    );

    if (!updatedWorker) {
      return res.status(404).json({ message: "Worker not found." });
    }

    res.json({
      message: "Profile image updated successfully",
      worker: updatedWorker,
    });
  } catch (error) {
    console.error("❌ Error updating profile image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateProfileImage };
