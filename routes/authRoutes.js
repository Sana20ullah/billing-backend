const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Must point to correct model path

const JWT_SECRET = process.env.JWT_SECRET || "secret";

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword, shopName, role } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already used" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, shopName, role });
  await user.save();

  res.status(201).json({ message: "Registered successfully" });
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Login success", user, token });
});

module.exports = router;
