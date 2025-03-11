// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// require("./models/db"); // Ensure DB connection

// const app = express();

// const allowedOrigins = ["http://localhost:3000", "http://localhost:3010"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser()); // Use cookie-parser after express.json()

// //ROUTES--------
// const workerRoutes = require("./routes/workersRoutes");
// const serviceRoutes = require("./routes/serviceRoutes");
// const authRoutes = require("./routes/AuthRoutes");
// const userRoutes = require("./routes/UserRoutes");
// const subServiceRoutes = require("./routes/SubServiceRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const bookingRoutes = require("./routes/BookingsRoute");
// const workerPannelRoutes = require("./workerRoutes/WorkerRoute.js");
// const workerLoginRoutes = require("./workerRoutes/LoginRoutes.js");
// const workerProfileRoutes = require("./workerRoutes/ProfileRoutes");
// const messagesRoutes = require("./routes/MessageRoutes");
// //  Use Routes
// app.use("/api", workerRoutes);
// app.use("/api", serviceRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api", subServiceRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/bookings", bookingRoutes);
// //worker Routes--------------
// app.use("/api/workers", workerPannelRoutes);
// app.use("/api", workerLoginRoutes);
// app.use("/api", workerProfileRoutes);
// app.use("/api/messages", messagesRoutes);
// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: "Something went wrong! -- server.js",
//     error: err.message,
//   });
// });

// //  Start Server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(` Server is running on port ${PORT}`);
// });
//----------------------------
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./models/db"); // Ensure DB connection

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3010"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
const paymentRoutes = require("./routes/paymentRoutes");
const bookingRoutes = require("./routes/BookingsRoute");
const workerPannelRoutes = require("./workerRoutes/WorkerRoute.js");
const workerLoginRoutes = require("./workerRoutes/LoginRoutes.js");
const workerProfileRoutes = require("./workerRoutes/ProfileRoutes");
const messagesRoutes = require("./routes/MessageRoutes");
//  Use Routes
app.use("/api", workerRoutes);
app.use("/api", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", subServiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/bookings", bookingRoutes);
//worker Routes--------------
app.use("/api/workers", workerPannelRoutes);
app.use("/api", workerLoginRoutes);
app.use("/api", workerProfileRoutes);
app.use("/api/messages", messagesRoutes);
// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong! -- server.js",
    error: err.message,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});
