import dotenv from "dotenv";
import Product from "../models/Product.js";
import { detectLocation } from "../middlewares/detectLocation.js";


dotenv.config();

export const getProducts = [
  detectLocation, // 👈 Middleware executes before controller
  async (req, res, next) => {
    try {
      console.log("➡️ Entered getProducts()");
      console.log("🌍 User country:", req.userCountry || "Unknown");
      console.log("💰 Currency from middleware:", req.userCurrency);

      // ✅ Step 1: Determine user currency (from middleware or fallback)
      const userCurrency = req.userCurrency || "USD";

      // ✅ Step 2: Fetch products from MongoDB
      const products = await Product.find({});

      // ✅ Step 3: Map products to localized prices
      const localizedProducts = products.map((p) => {
        const price = p.prices[userCurrency] || p.prices["USD"];
        return {
          id: p._id,
          name: p.name,
          description: p.description,
          image: p.image,
          prices: p.prices,
          localizedPrice: {
            currency: userCurrency,
            value: price,
            display: formatPrice(price, userCurrency),
          },
        };
      });

      // ✅ Step 4: Respond to client
      res.json({
        success: true,
        currency: userCurrency,
        count: localizedProducts.length,
        data: localizedProducts,
      });
    } catch (err) {
      console.error("❌ Error in getProducts:", err);
      next(err);
    }
  },
];

function formatPrice(value, currency) {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
    }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
}

// ✅ Add product controller (uses axios if external validations are added later)
export const addProduct = async (req, res, next) => {
  try {
    const { name, description, image, prices } = req.body;

    // (Optional future use)
    // Example of axios usage: validate product image URL
    // await axios.head(image);

    const newProduct = await Product.create({ name, description, image, prices });
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    next(err);
  }
};
