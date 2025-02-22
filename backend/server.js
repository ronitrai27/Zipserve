const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./models/db"); // Ensure DB connection

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    credentials: true, // Allow cookies & authorization headers
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser after express.json()

//ROUTES--------
const workerRoutes = require("./routes/workersRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const subServiceRoutes = require("./routes/SubServiceRoutes");
//  Use Routes
app.use("/api", workerRoutes);
app.use("/api", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", subServiceRoutes);
// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong! -- server.js",
    error: err.message,
  });
});

//  Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
