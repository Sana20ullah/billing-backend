const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model('Shop', ShopSchema);
