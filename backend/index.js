const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const { verifyAuth } = require("./firebase");
const paymentRoutes = require("./routes/paymentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const utilRoutes = require("./routes/utilRoutes");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "AuraLabs API is running" });
});

// Protected Route Example
app.get("/api/user/profile", verifyAuth, (req, res) => {
  res.json({ 
    message: "Secure Profile Data", 
    user: req.user 
  });
});

// API Routes
app.use("/api/payments", paymentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/utils", utilRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
