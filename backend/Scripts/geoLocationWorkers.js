const mongoose = require("mongoose");
const Worker = require("../models/workerModel");
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const mongoUrl = process.env.MONGO_URL;

if (!apiKey || !mongoUrl) {
  console.error(
    "Missing required environment variables! Check your .env file."
  );
  process.exit(1);
}
//------------------
const getGeolocation = async (address) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    }
  } catch (error) {
    console.error("Error fetching geolocation for", address, error);
  }
  return null;
};

// Connect to MongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Fetch all workers
    const workers = await Worker.find();

    for (const worker of workers) {
      if (!worker.location || !worker.location.coordinates) {
        console.log(`Updating worker: ${worker.name}`);

        const geoLocation = await getGeolocation(worker.address);
        if (geoLocation) {
          worker.location = {
            type: "Point",
            coordinates: [geoLocation.lng, geoLocation.lat],
          };

          await worker.save();
          console.log(`Updated ${worker.name} with location:`, worker.location);
        } else {
          console.log(`Could not fetch location for ${worker.name}`);
        }
      }
    }

    console.log("All workers updated!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
