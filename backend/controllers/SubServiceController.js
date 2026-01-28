const Subservice = require("../models/subServiceModel.js");

// -------------- Create Subservice (with Image Upload)-----------------------
const createSubservice = async (req, res) => {
  try {
    const { category, name, price } = req.body;

    // Check if file is uploaded
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });

    const imageUrl = req.file.path; // Cloudinary stores the file URL here

    // Check if category exists
    let subserviceCategory = await Subservice.findOne({ category });

    if (subserviceCategory) {
      // If category exists, add new service to the existing category
      subserviceCategory.services.push({ name, price, image: imageUrl });
      await subserviceCategory.save();
    } else {
      // If category does not exist, create a new category entry
      subserviceCategory = new Subservice({
        category,
        services: [{ name, price, image: imageUrl }],
      });
      await subserviceCategory.save();
    }

    res
      .status(201)
      .json({ message: "Subservice added successfully", subserviceCategory });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// --------------- Get Subservices by Category----------------------
const getSubservicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const subservices = await Subservice.findOne({ category });

    if (!subservices)
      return res.status(404).json({ message: "No subservices found" });

    res.json(subservices.services);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { createSubservice, getSubservicesByCategory };
