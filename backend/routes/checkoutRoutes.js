import express from "express";
import { createCheckoutSession } from "../controllers/checkoutController.js";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/", createCheckoutSession);

// ✅ Test if Stripe key works
router.get("/test", async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve(); // test call
    res.json({ success: true, stripeConnected: true, balance });
  } catch (err) {
    console.error("❌ Stripe Test Failed:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
