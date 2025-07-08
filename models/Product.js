const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,         // ✅ instead of 'item'
  qty: Number,          // ✅ add qty
  rate: Number,
  barcode: String,
});

module.exports = mongoose.model('Product', productSchema);
