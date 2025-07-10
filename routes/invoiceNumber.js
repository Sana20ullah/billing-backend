const express = require("express");
const router = express.Router();
const Counter = require("../models/Counter");

router.get("/", async (req, res) => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "invoice" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const invoiceNumber = `INV-${counter.seq.toString().padStart(4, "0")}`;
    res.json({ invoiceNumber });
  } catch (err) {
    console.error("Failed to generate invoice number:", err);
    res.status(500).json({ error: "Failed to get invoice number" });
  }
});

module.exports = router;
