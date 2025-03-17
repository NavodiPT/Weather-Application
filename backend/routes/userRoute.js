const express = require('express');
const router = express.Router();
const User = require('../models/User');
const getWeather = require('../services/weatherService');
const sendEmail = require('../services/emailService');

router.post('/user/register' , async(req , res) =>{
    try {
        const { email, location , } = req.body;
        const newUser = new User({ email, location, weatherData:[] });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

router.put('/user/:email', async (req, res) => {
    const { email } = req.params;
    const { location } = req.body;
    try {
      const user = await User.findOneAndUpdate({ email }, { location }, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: "Location updated!", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});


// Fetch weather data for a user's city
router.get('/weather/:email', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) return res.status(404).json({ message: "User not found." });

      const weatherData = await getWeather(user.location);
      if (!weatherData) return res.status(500).json({ message: "Error fetching weather data." });

      res.status(200).json({ weather: weatherData });
  } catch (error) {
      res.status(500).json({ message: "Server error." });
  }
});
module.exports = router;