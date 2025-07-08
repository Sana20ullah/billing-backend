const express = require("express");
const router = express.Router();
const DaySale = require("../models/DaySale");

// GET /api/monthsales - Group by day and return daily totals
router.get("/", async (req, res) => {
  try {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(today.getDate() - 30);

    // Auto-delete sales older than 30 days
    await DaySale.deleteMany({ date: { $lt: oneMonthAgo } });

    // Group by day and calculate totalAmount per day
    const dailyTotals = await DaySale.aggregate([
      {
        $match: { date: { $gte: oneMonthAgo } }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" }
          },
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 } // sort by date ascending
      }
    ]);

    // Rename _id to date for frontend simplicity
    const formatted = dailyTotals.map((d) => ({
      date: d._id,
      totalAmount: d.totalAmount,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Month sales fetch error:", error);
    res.status(500).json({ error: "Failed to fetch monthly sales" });
  }
});

module.exports = router;
