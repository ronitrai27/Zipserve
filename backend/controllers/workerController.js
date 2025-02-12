const EmployeeModel = require("../models/workerModel.js");
require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
// get workers by paginated--------------------------------------------------
const getAllWorkers = async (req, res) => {
  try {
    const {
      category,
      sort,
      page = 1,
      limit = 10,
      available,
      minPrice,
      maxPrice,
    } = req.query;

    // Build query filter
    const filter = {};
    if (category) {
      filter.category = category;
    }

    // Filter only available workers if 'available=true' is passed
    if (available === "true") {
      filter.available = true;
    }

    // Apply price range filter if provided
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    // Build sorting options
    let sortOptions = {};
    if (sort === "price_asc") {
      sortOptions = { price: 1 }; // Sort by price in ascending order
    } else if (sort === "stars_desc") {
      sortOptions = { stars: -1 }; // Sort by stars in descending order
    }

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch all workers first (filtering + sorting)
    const allWorkers = await EmployeeModel.find(filter).sort(sortOptions);

    // Apply pagination
    const workers = allWorkers.slice(skip, skip + limitNumber);

    // Count total workers for the current filter
    const totalWorkers = allWorkers.length;

    // Return paginated response
    res.status(200).json({
      workers,
      totalWorkers,
      totalPages: Math.ceil(totalWorkers / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workers" });
  }
};

// ------------------------ Controller to Get All Workers (No Pagination) (NEARBY 6KM) -----------------
const getAllWorkersNoPage = async (req, res) => {
  try {
    const { latitude, longitude } = req.query; // Get user location from query params
    // console.log("Received Query Params:", { latitude, longitude }); // debugging logs-----

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const userLocation = [parseFloat(longitude), parseFloat(latitude)];

    const workers = await EmployeeModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: userLocation,
          },
          $maxDistance: 6000, //6km----------------
        },
      },
    });

    res.status(200).json({ count: workers.length, workers });
  } catch (error) {
    console.error("Error fetching nearby workers:", error);
    res.status(500).json({ message: "Error fetching nearby workers" });
  }
};

// ------------------------Controller to create a new worker-----------------------------
const getGeolocation = async (address) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    console.log("Fetching location for:", address);
    const response = await axios.get(url);
    console.log("Google Maps Response:", response.data);
    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Google Maps API Error:", response.data.status);
    }
  } catch (error) {
    console.error("Error fetching geolocation:", error);
  }
  return null;
};

const createWorker = async (req, res) => {
  try {
    console.log(" Bhai Received Worker Data:", req.body);
    console.log("Ye bhi Received File:", req.file); // --- for debugging log only
    const {
      name,
      email,
      phone,
      category,
      about,
      price,
      stars,
      address,
      available,
      age,
      experience,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }
    const profileImageUrl = req.file.path;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !category ||
      !about ||
      !price ||
      !stars ||
      !address ||
      !age ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Fetch geolocation using the address
    const geoLocation = await getGeolocation(address);

    if (!geoLocation) {
      return res
        .status(400)
        .json({ error: "Invalid address or failed to fetch location" });
    }

    // Create new worker with location
    const newWorker = new EmployeeModel({
      name,
      email,
      phone,
      category,
      about,
      price,
      stars,
      address,
      available,
      profileImage: profileImageUrl,
      age,
      experience,
      location: {
        type: "Point",
        coordinates: [geoLocation.lng, geoLocation.lat],
      },
    });

    await newWorker.save();
    res
      .status(201)
      .json({ message: "Worker created successfully", worker: newWorker });
  } catch (error) {
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Error creating worker" });
  }
};

module.exports = {
  getAllWorkers,
  createWorker,
  getAllWorkersNoPage,
};
