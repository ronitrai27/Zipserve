const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/send", sendMessage); // ✅ POST /api/messages/send
router.get("/get-the-message", getMessages);

module.exports = router;
