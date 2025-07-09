const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
});

const daySaleSchema = new mongoose.Schema({
  products: [productSchema],
  totalAmount: { type: Number, required: true },
  vat: Number,
  discount: Number,
  changeMoney: Number,
  customerName: String,
  shop: {
    name: String,
    address: String,
    phone: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DaySale", daySaleSchema);
