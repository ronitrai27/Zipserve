// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; // Get token from cookies
    console.log("Token received:", token); // Debugging logs-------

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging logs-----------

    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
