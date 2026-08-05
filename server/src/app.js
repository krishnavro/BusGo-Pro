const express = require('express')
require("./cron/busCron");
const cors = require('cors');
const authRoutes = require('../src/routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/bus', busRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/admin', adminRoutes);

module.exports= app