const express = require("express");
const router = express.Router();
const {
  getUsersForWorker,
  getMessagesForUser,
} = require("../workerControllers/WorkerMessageController");

// Get all users who messaged a worker
router.get("/:workerId/users", getUsersForWorker);
router.get("/:workerId/:userId", getMessagesForUser);
module.exports = router;
