const User = require("../models/UserModel.js");

//---------------------------------------------------------------
// this controller is for marking fav workers...
// Toggle favorite worker (Add/Remove)
const toggleFavoriteWorker = async (req, res) => {
  try {
    const { userId, worker } = req.body; // Worker contains _id, name, profileImage, stars, category, phone
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isAlreadyFavorite = user.favouriteWorkers.some(
      (w) => w._id.toString() === worker._id
    );

    if (isAlreadyFavorite) {
      // Remove worker from favorites
      user.favouriteWorkers = user.favouriteWorkers.filter(
        (w) => w._id.toString() !== worker._id
      );
      await user.save();
      return res.json({
        message: "Removed from Bookmark",
        favouriteWorkers: user.favouriteWorkers,
      });
    } else {
      // Add worker to favorites
      user.favouriteWorkers.push(worker);
      await user.save();
      return res.json({
        message: "Added to Bookmark",
        favouriteWorkers: user.favouriteWorkers,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//---------------------------------------------------------------
// Get user's favorite workers
const getFavoriteWorkers = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ favouriteWorkers: user.favouriteWorkers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name userImage"); // Fetch required fields only
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//--------------------------------------------------------------
//--------------------------------------UPDATE COINS FOR USER
//--------------------------------------------------------------

const updateUserCoins = async (req, res) => {
  const { id } = req.params; // Extracting user ID from request params
  const { coins } = req.body; // Extracting coins from request body

  try {
    // Find user by ID and update coins
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { coins } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `You received ${coins} coins!` });
  } catch (error) {
    console.error("Error updating coins:", error);
    res.status(500).json({ message: "Failed to update user coins", error });
  }
};

module.exports = {
  toggleFavoriteWorker,
  getFavoriteWorkers,
  getAllUsers,
  updateUserCoins,
};
