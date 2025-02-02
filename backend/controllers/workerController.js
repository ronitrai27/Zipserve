const EmployeeModel = require("../models/workerModel.js");

// ------------------------Controller to get all workers with filters and sorting-----------------
const getAllWorkers = async (req, res) => {
  try {
    const { category, sort, page = 1, limit = 10 } = req.query;

    // Build query filter
    const filter = {};
    if (category) {
      filter.category = category;
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

    // Fetch all filtered and sorted workers first (without pagination)
    let allWorkers = await EmployeeModel.find(filter).sort(sortOptions);

    // If pagination is requested, slice the sorted data
    const paginatedWorkers = allWorkers.slice(skip, skip + limitNumber);

    // Count total workers for the current filter
    const totalWorkers = allWorkers.length; // Since we already fetched the full dataset

    // Return paginated response
    res.status(200).json({
      workers: paginatedWorkers,
      totalWorkers,
      totalPages: Math.ceil(totalWorkers / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching workers" });
  }
};
// ------------------------ Controller to Get All Workers (No Pagination) -----------------
const getAllWorkersNoPage = async (req, res) => {
  try {
    const workers = await EmployeeModel.find(); // No pagination, returns all workers
    res.status(200).json({ workers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all workers" });
  }
};

// ------------------------Controller to create a new worker-----------------------------
const createWorker = async (req, res) => {
  try {
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

    // Check if required file is present
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

    // Validate numeric fields
    if (isNaN(price) || isNaN(stars) || isNaN(age) || isNaN(experience)) {
      return res
        .status(400)
        .json({ message: "Price, stars, age and experience must be numbers" });
    }

    const newEmployee = new EmployeeModel({
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
    });

    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", worker: newEmployee });
  } catch (error) {
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(error);
    res.status(500).json({ message: "Error creating employee" });
  }
};

module.exports = {
  getAllWorkers,
  createWorker,
  getAllWorkersNoPage,
};
