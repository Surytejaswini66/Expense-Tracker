// src/server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const transactionRoutes = require("./routes/transactionRoutes");
const sqlite3 = require("sqlite3").verbose();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// Use routes
app.use("/transactions", transactionRoutes(db));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
