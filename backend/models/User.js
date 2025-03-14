const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        city: { type: String }
    },
    weatherReports: [{
        date: { type: Date, default: Date.now },
        weather: String
    }]

})


const User = mongoose.model('User', UserSchema);

module.exports = User;