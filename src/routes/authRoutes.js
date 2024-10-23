// src/routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Dummy login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Here, you should verify the username and password with your DB.
  // This is just a placeholder.
  if (username === "testUser" && password === "password") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return res.json({ token });
  } else {
    return res.status(403).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
