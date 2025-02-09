import axios from "axios";

export const getGeolocation = async (address) => {
  // const API_KEY = "AIzaSyAKUcB9_htfm4sbJbuHcObjSOKXwhdEwfQ";
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //   address
  // )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    }
    throw new Error("No results found");
  } catch (error) {
    console.error("Error fetching geolocation:", error);
    return null;
  }
};
