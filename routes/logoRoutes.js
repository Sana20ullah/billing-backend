// routes/logoRoutes.js
const express = require("express");
const router = express.Router();
const Logo = require("../models/LogoModel");

// POST /api/logo — Save or Update logo
router.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ message: "No logo data provided" });

    // If logo already exists, update the first one
    let logo = await Logo.findOne();
    if (logo) {
      logo.data = data;
      await logo.save();
    } else {
      logo = await Logo.create({ data });
    }

    res.status(200).json({ message: "Logo saved", logo });
  } catch (err) {
    console.error("Error saving logo:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/logo — Fetch logo
router.get("/", async (req, res) => {
  try {
    const logo = await Logo.findOne().sort({ updatedAt: -1 });
    if (!logo) return res.status(404).json({ message: "Logo not found" });

    res.status(200).json({ data: logo.data });
  } catch (err) {
    console.error("Error fetching logo:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
