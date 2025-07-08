const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Make sure this exists

// POST /api/products → Add a product
router.post('/', async (req, res) => {
  const { item, qty, rate, barcode } = req.body;

  try {
    const newProduct = new Product({
      name: item,
      qty,
      rate,
      barcode
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).json({ message: 'Failed to save product' });
  }
});

// GET /api/products → Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /api/products/barcode/:code → Get product by barcode (explicit route)
router.get('/barcode/:code', async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.code });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:barcode → Get product by barcode (generic route)
router.get('/:barcode', async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/products/:id → Delete product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});



module.exports = router;
