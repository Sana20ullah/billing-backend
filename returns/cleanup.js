// Assuming you have a Return model with a date or createdAt field
const express = require('express');
const router = express.Router();
const Return = require('../models/Return');

router.delete('/returns/cleanup', async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const result = await Return.deleteMany({ returnDate: { $lt: oneWeekAgo } });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Cleanup failed:', err);
    res.status(500).json({ error: 'Cleanup failed' });
  }
});

module.exports = router;
