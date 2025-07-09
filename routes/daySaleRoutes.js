// routes/daySaleRoutes.js
const express = require("express");
const router = express.Router();
const DaySale = require("../models/DaySale");

// POST /api/daysales
router.post("/", async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    const daySale = new DaySale({
      products,
      totalAmount,
      // date will be set automatically by schema default
    });

    await daySale.save();
    res.status(201).json(daySale);
  } catch (err) {
    console.error("Failed to save day sale:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
