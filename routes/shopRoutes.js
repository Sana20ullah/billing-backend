// routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// GET shop details
router.get('/', async (req, res) => {
  try {
    const shop = await Shop.findOne(); // Load from MongoDB only
    res.json(shop || {}); // Return empty object if not found
  } catch (error) {
    res.status(500).json({ message: "Failed to get shop data" });
  }
});

// POST create or update shop
router.post('/', async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let shop = await Shop.findOne();

    if (shop) {
      // Update existing shop
      shop.name = name;
      shop.address = address;
      shop.phone = phone;
      await shop.save();
    } else {
      // Create new shop
      shop = await Shop.create({ name, address, phone });
    }

    res.json(shop); // Respond with the saved shop data
  } catch (error) {
    console.error("Shop save error:", error);
    res.status(500).json({ message: "Failed to save shop info" });
  }
});

module.exports = router;
