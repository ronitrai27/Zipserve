const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
require("./models/db");

app.use(cors());
const workerRoutes = require("./routes/workersRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

// Middleware for parsing JSON
app.use(express.json());

// Use routes----------------------------
app.use("/api", workerRoutes);
app.use("/api", serviceRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong! -- server.js",
    error: err.message,
  });
});
// Server running...
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
