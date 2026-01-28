const Fuse = require("fuse.js");
const serviceMapping = require("../models/serviceMapping.json");

// Convert JSON object into an array of { service, professional } pairs
const serviceList = Object.entries(serviceMapping).map(
  ([service, professional]) => ({
    service: service.toLowerCase().replace(/[^\w\s]/gi, ""), // Remove special characters
    professional,
  })
);

// Configure Fuse.js options
const fuseOptions = {
  keys: ["service"],
  threshold: 0.2,
  includeScore: true,
  //   minMatchCharLength: 2,
};

// Initialize Fuse.js
const fuse = new Fuse(serviceList, fuseOptions);

exports.suggestProfessional = (req, res) => {
  let { service } = req.query;

  if (!service) {
    return res.status(400).json({ error: "write some services to find" });
  }

  service = service
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .trim(); // Normalize input

  // Perform fuzzy search
  const results = fuse.search(service);

  if (results.length > 0) {
    const suggestions = results.slice(0, 6).map((result) => ({
      service: result.item.service,
      professional: result.item.professional,
      score: result.score,
    }));

    return res.json({
      best_match: suggestions[0], // Most relevant result
      suggestions: suggestions.slice(1), // Other recommendations
    });

    return res.json({ suggestions });
  } else {
    return res.status(404).json({
      message: "No matching service found :(",
      suggestions: serviceList.slice(0, 5).map((s) => s.service), // relevant suggestions
    });
  }
};
