// const express = require("express");
// const router = express.Router();
// const {
//   toggleFavoriteWorker,
//   getFavoriteWorkers,
// } = require("../controllers/UserController.js");

// // Toggle favorite worker (Add/Remove)
// router.post("/toggle-favorite", toggleFavoriteWorker);

// // Get user's favorite workers
// router.get("/:userId/favorites", getFavoriteWorkers);

// // to show correct icon if fav worker is in database ---------
// router.get("/is-favorite/:userId/:workerId", async (req, res) => {
//   try {
//     const { userId, workerId } = req.params;

//     // Find the user and check if workerId exists in their favouriteWorkers array
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isFavorited = user.favouriteWorkers.some(
//       (worker) => worker._id.toString() === workerId
//     );

//     res.json({ isFavorited });
//   } catch (error) {
//     console.error("Error checking favorite worker:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/UserModel.js");
const {
  toggleFavoriteWorker,
  getFavoriteWorkers,
} = require("../controllers/UserController.js");

// Toggle favorite worker (Add/Remove)
router.post("/toggle-favorite", toggleFavoriteWorker);

// Get user's favorite workers
router.get("/:userId/favorites", getFavoriteWorkers);

// Check if a worker is in the user's favorite list
router.get("/is-favorite/:userId/:workerId", async (req, res) => {
  try {
    const { userId, workerId } = req.params;

    // Find the user and check if workerId exists in their favouriteWorkers array
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isFavorited = user.favouriteWorkers.some(
      (worker) => worker._id.toString() === workerId
    );

    res.json({ isFavorited });
  } catch (error) {
    console.error("Error checking favorite worker:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
