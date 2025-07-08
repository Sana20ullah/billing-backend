// models/Shop.js
const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});

module.exports = mongoose.model('Shop', ShopSchema);
