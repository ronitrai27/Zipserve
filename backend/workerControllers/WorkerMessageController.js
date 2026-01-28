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
//---------------------------------------------------------------------
const sendMessage = async (req, res) => {
  try {
    const { workerId, userId, message } = req.body;

    if (!workerId || !userId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new message
    const newMessage = new Message({
      workerId,
      userId,
      message,
      senderType: "worker", // Worker is sending the message
      timestamp: new Date(),
    });

    await newMessage.save(); // Save to database

    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
};

module.exports = { getUsersForWorker, getMessagesForUser, sendMessage };
