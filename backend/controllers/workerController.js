const EmployeeModel = require("../models/workerModel.js");

// ------------------------Controller to get all workers with filters and sorting-----------------
const getAllWorkers = async (req, res) => {
  try {
    // Get query parameters
    const { category, sort } = req.query;

    // Build query filter
    const filter = {};
    if (category) {
      filter.category = category;
    }

    // Sorting
    let sortOptions = {};
    if (sort === "price_asc") {
      sortOptions = { price: 1 }; // 1 for ascending order
    } else if (sort === "stars_desc") {
      sortOptions = { stars: -1 }; // -1 for descending order
    }

    // Fetch employees with optional category and sorting
    const employees = await EmployeeModel.find(filter).sort(sortOptions);

    // Return response
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// ------------------------Controller to create a new worker-----------------------------
const createWorker = async (req, res) => {
  try {
    // Extract worker data from the request body
    const { name, email, phone, category, about, price, stars, address } =
      req.body;

    // Handle image upload and store the URL
    const profileImageUrl = req.file ? req.file.path : null;

    // Create new worker object
    const newEmployee = new EmployeeModel({
      name,
      email,
      phone,
      category,
      about,
      price,
      stars,
      address,
      profileImage: profileImageUrl, // Store the Cloudinary image URL
    });

    // Save the new worker to the database
    await newEmployee.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: "Employee created successfully", worker: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating employee" });
  }
};

module.exports = { getAllWorkers, createWorker };
