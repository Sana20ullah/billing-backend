const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Allowed CORS origins
const allowedOrigins = [
  'https://billing-application-5.onrender.com',
  'http://localhost:5173' // for local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS policy does not allow access from origin ${origin}`), false);
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ Import routes
const shopRoutes = require('./routes/temp');
const productRoutes = require('./routes/productRoutes');
const daySaleRoutes = require('./routes/daySaleRoutes');
const returnRoutes = require('./routes/returnRoutes');
const monthSalesRoute = require('./routes/monthSales');

// ✅ Register routes before 404 fallback
app.use('/api/shop', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/daysales', daySaleRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/monthsales', monthSalesRoute);

// ✅ Test & root routes
app.get('/', (req, res) => {
  res.send('Billing Backend API running...');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

// ❌ 404 fallback (keep at the end)
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('\x1b[32m✅ MongoDB connected\x1b[0m'))
  .catch((err) => console.error('\x1b[31m❌ MongoDB connection failed:\x1b[0m', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
