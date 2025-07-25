const express = require('express');
const router = express.Router();
const Shop = require('../models/ShopModels'); // ✅ Correct import

// ✅ GET shop details
router.get('/', async (req, res) => {
  try {
    const shop = await Shop.findOne(); // Only get the first shop
    res.json(shop || {}); // Return empty object if not found
  } catch (error) {
    console.error("Failed to get shop data:", error);
    res.status(500).json({ message: "Failed to get shop data" });
  }
});

// ✅ POST to create or update shop
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
