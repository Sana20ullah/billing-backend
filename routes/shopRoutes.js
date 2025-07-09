// routes/shopRoutes.js
const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// GET shop details
router.get('/', async (req, res) => {
  try {
    const shop = await Shop.findOne();
    res.json(shop || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to get shop data" });
  }
});

// POST create or update shop
router.post('/', async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    let shop = await Shop.findOne();

    if (shop) {
      shop.name = name;
      shop.address = address;
      shop.phone = phone;
      await shop.save();
    } else {
      shop = await Shop.create({ name, address, phone });
    }

    res.json(shop);
  } catch (error) {
    res.status(500).json({ message: "Failed to save shop info" });
  }
});

module.exports = router;
