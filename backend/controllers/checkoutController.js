import axios from "axios";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const createCheckoutSession = async (req, res) => {
  try {
    const { productId, currency = "USD" } = req.body;

    // ✅ Fetch product from DB
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ✅ Use Axios to call Stripe REST API directly
    const stripeRes = await axios.post(
      "https://api.stripe.com/v1/checkout/sessions",
      new URLSearchParams({
        "payment_method_types[]": "card",
        "mode": "payment",
        "success_url": `${process.env.CLIENT_URL}/success`,
        "cancel_url": `${process.env.CLIENT_URL}/cancel`,
        "line_items[0][price_data][currency]": currency.toLowerCase(),
        "line_items[0][price_data][unit_amount]": Math.round(
          product.prices[currency.toUpperCase()] * 100
        ).toString(),
        "line_items[0][price_data][product_data][name]": product.name,
        "line_items[0][price_data][product_data][description]": product.description,
        "line_items[0][price_data][product_data][images][0]": product.image,
        "line_items[0][quantity]": "1",
      }),
      {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // ✅ Return Stripe-hosted Checkout URL
    res.json({ url: stripeRes.data.url });
  } catch (err) {
    console.error("❌ Stripe API Error:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data?.error?.message || err.message,
    });
  }
};
