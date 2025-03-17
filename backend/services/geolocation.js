const axios = require('axios');
require('dotenv').config();

const getCoordinates = async (location) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: location,
                key: process.env.GOOGLE_API_KEY
            }
        });

        if (response.data.results.length === 0) {
            throw new Error("Invalid city name or location not found.");
        }

        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
};

module.exports = getCoordinates;
