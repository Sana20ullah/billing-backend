const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number,
});

const daySaleSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
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
});

module.exports = mongoose.model("DaySale", daySaleSchema);
