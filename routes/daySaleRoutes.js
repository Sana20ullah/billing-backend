const express = require("express");
const router = express.Router();
const DaySale = require("../models/DaySale");

// POST /api/daysales - save a new day sale
router.post("/", async (req, res) => {
  try {
    const { products, totalAmount, vat, discount, changeMoney, customerName, shop } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    const daySale = new DaySale({
      products,
      totalAmount,
      vat,
      discount,
      changeMoney,
      customerName,
      shop,
      // date will be set automatically by schema default
    });

    await daySale.save();
    res.status(201).json(daySale);
  } catch (err) {
    console.error("Failed to save day sale:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/daysales - fetch all day sales
router.get("/", async (req, res) => {
  try {
    const sales = await DaySale.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sales", error });
  }
});

module.exports = router;
