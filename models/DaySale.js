const mongoose = require("mongoose");

const daySaleSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // auto add current date
  },
});

module.exports = mongoose.model("DaySale", daySaleSchema);
