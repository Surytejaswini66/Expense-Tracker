// src/routes/transactionRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require("../controllers/transactionController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Login route (for demonstration purposes)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // This should be replaced with your actual user verification logic
  if (username === "testUser" && password === "password") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return res.json({ token });
  } else {
    return res.status(403).json({ message: "Invalid credentials" });
  }
});

// Protect routes with the authenticateToken middleware
router.post("/", authenticateToken, (req, res) => addTransaction(req, res, db));
router.get("/", authenticateToken, (req, res) => getTransactions(req, res, db));
router.get("/:id", authenticateToken, (req, res) =>
  getTransactionById(req, res, db)
);
router.put("/:id", authenticateToken, (req, res) =>
  updateTransaction(req, res, db)
);
router.delete("/:id", authenticateToken, (req, res) =>
  deleteTransaction(req, res, db)
);
router.get("/summary", authenticateToken, (req, res) =>
  getSummary(req, res, db)
);

module.exports = (db) => router;
