const express = require("express");
const router = express.Router();
const Return = require("../models/ReturnModel");

// POST /api/returns
router.post("/", async (req, res) => {
  try {
    const newReturn = new Return(req.body);
    await newReturn.save();
    res.status(201).json({ message: "Return saved" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save return", error: err });
  }
});

// GET /api/returns
router.get("/", async (req, res) => {
  try {
    const allReturns = await Return.find().sort({ createdAt: -1 });
    res.json(allReturns);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch returns", error: err });
  }
});

module.exports = router;
