// const Worker = require("../models/workerModel");

// const loginWorker = async (req, res) => {
//   const { workerId, password } = req.body;

//   try {
//     if (!workerId || !password) {
//       return res.status(400).json({ error: "Please provide all fields" });
//     }
//     console.log("Request body:", req.body);

//     const worker = await Worker.findById(workerId);
//     if (!worker) {
//       return res.status(404).json({ error: "Worker not found" });
//     }

//     if (password !== "worker123") {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     res.json({
//       message: "Login successful",
//       worker, // Sending the entire worker object
//     });
//   } catch (error) {
//     console.error("Login error:", error); // Log the exact error
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { loginWorker };
const Worker = require("../models/workerModel");

const loginWorker = async (req, res) => {
  const { workerId, password } = req.body;

  try {
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
