const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema({
  image: {
    type: String, // You can use base64 or image URL
    required: true,
  },
});

module.exports = mongoose.model('Logo', LogoSchema);
