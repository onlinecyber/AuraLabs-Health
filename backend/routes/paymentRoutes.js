const express = require("express");
const crypto = require("crypto");
const { verifyAuth } = require("../firebase");
const router = express.Router();

// Mock Razorpay instance for boilerplate (User needs to install razorpay)
let Razorpay;
let razorpayInstance;
try {
  Razorpay = require("razorpay");
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (e) {
  console.warn("Razorpay SDK not installed. Payment routes will operate in mock mode.");
}

// 1. Create Order
router.post("/create-order", verifyAuth, async (req, res) => {
  try {
    const { amount, receipt } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    if (!razorpayInstance) {
      // Mock Response for UI Testing
      return res.json({
        id: `order_mock_${Date.now()}`,
        currency: "INR",
        amount: amount * 100,
        status: "created",
        receipt: receipt || "receipt_mock_1",
        notes: { mock: true }
      });
    }

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
});

// 2. Verify Payment (Webhook or Frontend Call)
router.post("/verify", verifyAuth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpayInstance) {
      // Mock Verification
      return res.json({ success: true, message: "Mock Payment verified successfully" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // TODO: Update database to mark order/booking as Paid
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

module.exports = router;
