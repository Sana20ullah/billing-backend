const express = require('express');
const router = express.Router();
const Logo = require('../models/LogoModel'); // You must create this model

// GET logo
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: 'No image provided' });

    // Replace any existing logo
    await Logo.deleteMany({});
    const newLogo = await Logo.create({ image });

    res.json({ message: 'Logo uploaded', data: newLogo });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
});


module.exports = router;
