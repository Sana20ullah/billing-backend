const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// ✅ Allowed CORS Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://billing-application-wheat.vercel.app',
  'https://billing-application-git-main-sana-ullahs-projects-12a76c5a.vercel.app'
];





app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Logger (optional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Import and mount routes
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const daySaleRoutes = require('./routes/daySaleRoutes');
const returnRoutes = require('./routes/returnRoutes');
const monthSalesRoute = require('./routes/monthSales');
const invoiceNumberRoute = require('./routes/invoiceNumber');
const logoRoutes = require('./routes/logoRoutes'); // <-- Make sure this file exists!


app.use("/api/auth", authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/daysales', daySaleRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/monthsales', monthSalesRoute);
app.use("/api/invoice-number", invoiceNumberRoute);
app.use('/api/logo', logoRoutes);

// ✅ Simple test route
app.get('/', (req, res) => res.send('🚀 Billing Backend API running...'));
app.get('/api/test', (req, res) => res.json({ message: 'Test route works!' }));

// ❌ Remove duplicated 404 handler (was written twice)
// ❌ Error handler should come AFTER all routes
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
