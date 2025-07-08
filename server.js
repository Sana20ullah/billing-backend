const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://billing-backend.onrender.com',
  'https://billing-application-2.onrender.com', // ✅ your frontend Render URL
  // any other ngrok or dev domains...
];


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from origin ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// ✅ Import routes
const shopRoutes = require('./routes/temp');
const productRoutes = require('./routes/productRoutes');
const daySaleRoutes = require('./routes/daySaleRoutes');
const returnRoutes = require('./routes/returnRoutes');
const monthSalesRoute = require('./routes/monthSales');

// ✅ Register routes before 404 handler
app.use('/api/shop', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/daysales', daySaleRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/monthsales', monthSalesRoute); // ✅ FIXED: moved above 404

// 🧪 Basic test route
app.get('/', (req, res) => {
  res.send('Billing Backend API running...');
});

// ❌ 404 fallback - keep it last
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('\x1b[32m✅ MongoDB connected\x1b[0m'))
  .catch((err) => console.error('\x1b[31m❌ MongoDB connection failed:\x1b[0m', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
