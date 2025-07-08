const express = require('express');
const router = express.Router();
const DaySale = require('../models/DaySale');

// Save day amount
router.post('/', async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const sale = new DaySale({ totalAmount });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save sale', error });
  }
});

// Fetch all day sales
router.get('/', async (req, res) => {
  try {
    const sales = await DaySale.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales', error });
  }
});

module.exports = router;
