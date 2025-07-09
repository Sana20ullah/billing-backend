const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Allowed CORS origins
const allowedOrigins = [
  'https://billing-application-5.onrender.com',
  'http://localhost:5173', // for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy does not allow access from origin ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

// Import routes
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/productRoutes');
const daySaleRoutes = require('./routes/daySaleRoutes');
const returnRoutes = require('./routes/returnRoutes');
const monthSalesRoute = require('./routes/monthSales');

// Register routes before 404 fallback
app.use('/api/shop', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/daysales', daySaleRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/monthsales', monthSalesRoute);

// Root & test routes
app.get('/', (req, res) => res.send('Billing Backend API running...'));

app.get('/api/test', (req, res) => res.json({ message: 'Test route works!' }));

// 404 fallback (keep at the end)
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Connect to MongoDB with some logs
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // Exit app if DB connection fails
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
