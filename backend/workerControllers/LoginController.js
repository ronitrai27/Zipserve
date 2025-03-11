const Worker = require("../models/workerModel");
const mongoose = require("mongoose");

const loginWorker = async (req, res) => {
  const { workerId, password } = req.body;

  try {
    // Check if workerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({ error: "Invalid worker ID" });
    }

    // Check if worker ID exists
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }

    // Validate password
    if (password !== "worker123") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Store the full worker object in the cookie
    res.cookie("workerAuth", JSON.stringify(worker), {
      httpOnly: true, // Prevents JavaScript access
      secure: false, // Set to true if using HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { loginWorker };

//-------------------------------------------------------------------
// Fetch logged-in worker details from the cookie
const getWorkerDetails = (req, res) => {
  try {
    const workerData = req.cookies.workerAuth;
    if (!workerData) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    res.json({ worker: JSON.parse(workerData) });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Logout function to clear the cookie
const logoutWorker = (req, res) => {
  res.clearCookie("workerAuth");
  res.json({ message: "Logged out successfully" });
};

module.exports = { loginWorker, getWorkerDetails, logoutWorker };
