const axios = require('axios');
require('dotenv').config();
const getCoordinates = require('../services/geolocation');

const getWeather = async (location) => {
    try {
        const coordinates = await getCoordinates(location);
        if (!coordinates) return null;

        const { lat, lng } = coordinates;

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat,
                lon: lng,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return null;
    }
};

module.exports = getWeather;

