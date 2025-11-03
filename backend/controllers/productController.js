import dotenv from "dotenv";
import Product from "../models/Product.js";
import { detectLocation } from "../middlewares/detectLocation.js";


dotenv.config();

export const getProducts = [
  detectLocation,
  async (req, res, next) => {
    try {
      console.log("➡️ Entered getProducts()");
      console.log("🌍 User country:", req.userCountry || "Unknown");
      console.log("💰 Currency from middleware:", req.userCurrency);

      const userCurrency = req.userCurrency || "INR";

      const products = await Product.find({});

      const localizedProducts = products.map((p) => {
        const price = p.prices[userCurrency] || p.prices["INR"];
        return {
          id: p._id,
          name: p.name,
          description: p.description,
          image: p.image,
          details: p.details,
          prices: p.prices,
          localizedPrice: {
            currency: userCurrency,
            value: price,
            display: formatPrice(price, userCurrency),
          },
        };
      });

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
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("🔎 Fetching product with ID:", id);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const userCurrency = req.userCurrency || "INR";
    const price = product.prices[userCurrency] || product.prices["INR"];

    const formattedProduct = {
      id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      details: product.details,
      prices: product.prices,
      localizedPrice: {
        currency: userCurrency,
        value: price,
        display: new Intl.NumberFormat("en", {
          style: "currency",
          currency: userCurrency,
        }).format(price),
      },
    };

    res.json({
      success: true,
      currency: userCurrency,
      data: formattedProduct,
    });
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    next(err);
  }
};
export const addProduct = async (req, res, next) => {
  try {
    const { name, description, image, details, prices } = req.body;
    const newProduct = await Product.create({ name, description, image, details, prices });
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    next(err);
  }
};
