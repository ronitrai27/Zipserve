const Message = require("../models/MessageModel");

// Get all unique user IDs who messaged a specific worker
const getUsersForWorker = async (req, res) => {
  try {
    const { workerId } = req.params;

    // Find all messages where senderType is "user" (i.e., users messaged the worker)
    const messages = await Message.find({ workerId, senderType: "user" });

    // Extract unique user IDs
    const userIds = [...new Set(messages.map((msg) => msg.userId.toString()))];

    res.status(200).json(userIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user IDs" });
  }
};

//-------------------------------------------------------------------------------
const getMessagesForUser = async (req, res) => {
  try {
    const { workerId, userId } = req.params;

    // Find messages where both userId and workerId match
    const messages = await Message.find({
      workerId,
      userId,
    }).sort({ timestamp: 1 }); // Sort messages in ascending order (oldest first)

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

module.exports = { getUsersForWorker, getMessagesForUser };
