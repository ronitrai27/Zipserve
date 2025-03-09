const Booking = require("../models/BookingModel.js");
const sendEmail = require("../utils/emailService.js");
const User = require("../models/UserModel");
const Worker = require("../models/workerModel");
const mongoose = require("mongoose");
//--------------------------------------------------------------
//------------------------CREATE BOOKING
//--------------------------------------------------------------
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      workerId,
      subservices,
      totalPrice,
      date,
      time,
      paymentMethod,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !workerId ||
      !subservices ||
      !totalPrice ||
      !date ||
      !time ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new booking document
    const newBooking = new Booking({
      userId,
      workerId,
      subservices,
      totalPrice,
      date,
      time,
      paymentMethod,
    });

    // Save to database
    await newBooking.save();
    // Fetch user details
    //   const user = await User.findById(userId).select("email name");
    //   if (!user) {
    //     return res.status(404).json({ message: "User not found." });
    //   }

    //   // Fetch worker details
    //   const worker = await Worker.findById(workerId).select("name");
    //   if (!worker) {
    //     return res.status(404).json({ message: "Worker not found." });
    //   }

    //   // Construct email message
    //   const subject = "Booking Confirmation - Your Request is Pending";
    //   const message = `
    //    Dear ${user.name},

    //    Your booking request has been received and is currently pending approval.

    //    📌 Booking Details:
    //    - Worker: ${worker.name}
    //    - Date: ${date}
    //    - Time: ${time}
    //    - Services: ${subservices.join(", ")}
    //    - Total Price: ₹${totalPrice}
    //    - Payment Method: ${paymentMethod}

    //    You will receive a confirmation once the worker accepts your booking.

    //    Thank you for choosing our service!

    //    Regards,
    //    [Your Service Name]
    //  `;

    // sendEmail(user.email, subject, message);

    res.status(201).json({
      message: "Booking Request Initiated",
      bookingId: newBooking._id,
    });
  } catch (error) {
    console.error("Error while booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// //--------------------------------------------------------------
// //------------------------GET USER BOOKINGS by pending , confirmed , in-progress
// //--------------------------------------------------------------
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Define the statuses to fetch
    const allowedStatuses = ["pending", "confirmed", "in-progress"];

    // Fetch only bookings with allowed statuses
    const bookings = await Booking.find({
      userId,
      status: { $in: allowedStatuses },
    }).sort({ createdAt: -1 });

    // Count the number of bookings for each status
    const pendingCount = await Booking.countDocuments({
      userId,
      status: "pending",
    });
    const confirmedCount = await Booking.countDocuments({
      userId,
      status: "confirmed",
    });
    const inProgressCount = await Booking.countDocuments({
      userId,
      status: "in-progress",
    });

    res.status(200).json({
      bookings,
      counts: {
        pending: pendingCount,
        confirmed: confirmedCount,
        inProgress: inProgressCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// //--------------------------------------------------------------
// //------------------------BOOKINGS BY ID
// //--------------------------------------------------------------

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid Booking ID format." });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      status: { $in: ["pending", "confirmed", "in-Progress"] },
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or not eligible." });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//-------------------------------------------------------------
//----------------------------FILTER BOOKINGS
//-------------------------------------------------------------

const getFilteredBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, paymentMethod, status } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    let filter = { userId };

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filter["date.year"] = {
        $gte: start.getFullYear(),
        $lte: end.getFullYear(),
      };
      filter["date.month"] = {
        $gte: start.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        $lte: end.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      };
      filter["date.date"] = { $gte: start.getDate(), $lte: end.getDate() };
    } else if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    } else if (status) {
      filter.status = status;
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching filtered bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//--------------------------------------------------------------
//------------------------BOOKING HISTORY by cancelled , completed
//--------------------------------------------------------------
const getUserBookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Define the statuses for booking history
    const historyStatuses = ["completed", "cancelled"];

    // Fetch only completed or cancelled bookings
    const bookingHistory = await Booking.find({
      userId,
      status: { $in: historyStatuses },
    }).sort({ createdAt: -1 });

    res.status(200).json({ bookingHistory });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//-------------------------------------------------------------
//----------------------------CANCEL BOOKING
//-------------------------------------------------------------
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find and update the booking status to "cancelled"
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", updatedBooking });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//-------------------------------------------------------------
//-----------------ALL -BOOKINGS
//------------------------------------------------------------

const getAllBookings = async (req, res) => {
  try {
    const { workerId } = req.params; // Get workerId from URL params

    if (!workerId) {
      return res.status(400).json({ message: "Worker ID is required" });
    }

    const bookings = await Booking.find({ workerId }) // Fetch bookings for the worker
      .sort({ "date.year": 1, "date.month": 1, "date.date": 1, time: 1 }); // Sort by date & time

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching worker's bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//--------------------------------------------------------------
//-----------------------------INSTANT BOOKING
//--------------------------------------------------------------
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let current = new Date(startTime);

  while (current <= endTime) {
    const formattedTime = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    });
    slots.push(formattedTime);
    current.setMinutes(current.getMinutes() + 15); // Increment by 15 minutes
  }

  return slots;
};
const monthsOfYear = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//--------------------------
const instantBooking = async (req, res) => {
  try {
    const { userId, category, userLocation } = req.body;

    if (!userId || !category || !userLocation) {
      return res
        .status(400)
        .json({ message: "User ID, category, and location are required" });
    }

    console.log("🚀 Instant Booking Request Received!");
    // console.log("User ID:", userId);
    // console.log("Category:", category);
    // console.log("User Location:", userLocation);

    // Convert distance to radians (5km / 6378.1km Earth's radius)
    const maxDistanceInRadians = 5 / 6378.1;

    // ----------------FETCHING WORKERS WITHIN 5KM---------------------------
    const locationFilter = {
      location: {
        $geoWithin: {
          $centerSphere: [userLocation, maxDistanceInRadians],
        },
      },
    };

    console.log("🔍 Searching for workers with filter:", locationFilter);

    const workers = await Worker.find({
      category,
      ...locationFilter,
    });

    console.log(
      "🛠 Found Workers:",
      workers.map((w) => w._id)
    );

    if (workers.length === 0) {
      return res
        .status(404)
        .json({ message: "No workers available in your area." });
    }

    // ----------------CHECKING WORKER AVAILABILITY---------------------------
    const currentTime = new Date();
    const nextTwoHours = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

    let selectedWorker = null;
    let availableTime = null; // Declare availableTime outside

    for (const worker of workers) {
      console.log(`Checking worker ${worker._id} for availability...`);

      // Fetch all bookings of this worker
      const workerBookings = await Booking.find({
        workerId: worker._id,
        "date.date": currentTime.getDate(),
        "date.month": monthsOfYear[currentTime.getMonth()],
        "date.year": currentTime.getFullYear(),
      });

      console.log(
        `📅 Worker ${worker._id} has ${workerBookings.length} bookings today.`
      );

      // Extract all booked times for this worker
      const bookedTimes = workerBookings.map((b) => b.time);

      // ✅ Generate possible time slots in the next 2 hours
      const possibleTimes = generateTimeSlots(currentTime, nextTwoHours);

      // ✅ Find the first available time slot
      availableTime = possibleTimes.find((time) => !bookedTimes.includes(time));

      if (availableTime) {
        selectedWorker = worker;
        console.log(`✅ Worker ${worker._id} is available at ${availableTime}`);
        break; // Stop searching if a free worker is found
      }
    }

    // Check if no worker was available before booking
    if (!selectedWorker || !availableTime) {
      return res
        .status(404)
        .json({ message: "No workers available at this time." });
    }

    // Now, the booking logic will work correctly
    const newBooking = new Booking({
      userId,
      workerId: selectedWorker._id,
      subservices: [{ name: "Instant Booking" }],
      totalPrice: 0,
      date: {
        day: daysOfWeek[currentTime.getDay()],
        date: currentTime.getDate(),
        month: monthsOfYear[currentTime.getMonth()],
        year: currentTime.getFullYear(),
      },
      time: availableTime, // ✅ Now this won't be undefined
      paymentMethod: "cash",
      status: "pending",
    });

    await newBooking.save();
    res.status(201).json({
      message: "Booking created successfully.",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error in instant booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//------------------------------------------------------------
//-----------------------------TESTING WORKER BY ID
//-----------------------------------------------------------
const getWorkerById = async (req, res) => {
  try {
    const { workerId } = req.params;
    const worker = await Worker.findById(workerId); // Fetch worker from DB

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//--------------------------------------------------------------
//------------------------EXPORTS
//--------------------------------------------------------------
module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  getFilteredBookings,
  getUserBookingHistory,
  cancelBooking,
  getAllBookings,
  instantBooking,
  getWorkerById,
};
