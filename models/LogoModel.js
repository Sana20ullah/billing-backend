// models/LogoModel.js
const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  data: {
    type: String, // base64 string
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Logo", LogoSchema);
