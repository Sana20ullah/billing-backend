const mongoose = require('mongoose');

// Define the shop schema
const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Export the model
module.exports = mongoose.model('Shop', ShopSchema);
