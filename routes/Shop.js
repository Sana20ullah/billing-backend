const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// ✅ GET: Fetch shop info
router.get('/', async (req, res) => {
  try {
    const shop = await Shop.findOne();
    res.json(shop || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to get shop data" });
  }
});

// ✅ POST: Create or update shop info
router.post('/', async (req, res) => {
  try {
    const { name, address, phone } = req.body;

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

    // ✅ Return the latest shop data instead of just a message
    res.json(shop);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save shop info" });
  }
});

module.exports = router;
