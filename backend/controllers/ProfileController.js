const User = require("../models/UserModel");

const updateProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file received." });
    }

    // Get the uploaded image URL from Cloudinary
    const imageUrl = req.file.path;
    console.log("✅ Uploaded Image URL:", imageUrl);

    // Update user's profileImage in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userImage: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Profile image updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateProfileImage };
