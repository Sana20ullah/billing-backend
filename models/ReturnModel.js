const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    reason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Return", returnSchema);
