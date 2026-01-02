const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection (UPDATED – no old options)
mongoose.connect("mongodb://127.0.0.1:27017/userDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new User({
      username,
      password
    });

    await user.save();
    res.send("User data saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving data");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
