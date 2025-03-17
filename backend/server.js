const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const userRoutes = require('./routes/userRoute');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use("/api", userRoutes);


// // Run fetchWeatherAndStore every 3 hours
// cron.schedule("0 */3 * * *", async () => {
//   console.log("Fetching weather data...");
//   const users = await User.find();
//   for (const user of users) {
//       await fetchWeatherAndStore(user.email, user.location);
//   }
// });

// // Run sendWeatherReports every 3 hours
// cron.schedule("0 */3 * * *", sendWeatherReports);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
