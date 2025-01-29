const express = require("express");
const cors = require("cors"); // Import cors
// const bodyParser = require("body-parser"); // not required as express has built in
require("dotenv").config();
const app = express();
require("./models/db"); // Database connection file
app.use(cors());
// Import routes
const workerRoutes = require("./routes/workersRoutes"); // Adjust the path to the workerRoutes file

// Middleware for parsing JSON
app.use(express.json());

// Use routes
app.use("/api", workerRoutes); // Prefix routes with /api

app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).json({
    message: "Something went wrong! -- server.js",
    error: err.message,
  });
});
// Server running...
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
