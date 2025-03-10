const Message = require("../models/MessageModel");

// Send a new message
const sendMessage = async (req, res) => {
  try {
    const { userId, workerId, message, senderType } = req.body;

    if (!userId || !workerId || !message || !senderType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ userId, workerId, message, senderType });
    await newMessage.save();

    return res
      .status(201)
      .json({ success: true, message: "Message sent", newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch messages between a user and worker
const getMessages = async (req, res) => {
  try {
    const { userId, workerId } = req.query;

    if (!userId || !workerId) {
      return res
        .status(400)
        .json({ error: "User ID and Worker ID are required" });
    }

    const messages = await Message.find({ userId, workerId })
      .sort({ timestamp: -1 })
      .limit(50);

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Export functions at the bottom
module.exports = {
  sendMessage,
  getMessages,
};
