const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');

router.post('/register' , async(req , res) =>{
    try {
        const { email, latitude, longitude } = req.body;
        const newUser = new User({ email, location: { latitude, longitude } });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

module.exports = router;