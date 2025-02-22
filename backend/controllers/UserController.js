const User = require("../models/UserModel.js");

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

module.exports = { toggleFavoriteWorker, getFavoriteWorkers };
