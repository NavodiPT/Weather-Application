const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    location: { 
        type: String, 
        required: true, 
        trim: true 
    },
    weatherReports: [{
        date: String,
        weather: Object
    }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
