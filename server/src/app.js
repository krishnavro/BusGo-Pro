const express = require("express");
require("./cron/busCron");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const busRoutes = require("./routes/busRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bus-go-pro.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;