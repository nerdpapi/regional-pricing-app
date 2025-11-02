import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// === Sample Data ===
const products = [
  {
    name:
      "HyperX Cloud III Headset",
    description:
      "A high-performance gaming headset with surround sound.",
    image:
      "https://m.media-amazon.com/images/I/71pz2njkNRL.jpg",

    prices: { USD: 49.99, INR: 4438.38, GBP: 38.00 },

  },
  {
    name:
      "MSI GeForce RTX 5090 Gaming Trio OC Graphics Card",
    description:
      "Advanced graphics card for gaming and AI processing.",
    image:
      "https://asset.msi.com/resize/image/global/product/product_1737081391df0edd81daeead5bd52c24e71abeae13.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
    prices: { USD: 1999.00, INR: 177481.19, GBP: 1519.57 },
  },
  {
    name:
      "LG UltraGear™ OLED GX9 (45GX990A)",
    description:
      "World's First 5K2K OLED Bendable Gaming Monitor",
    image:
      "https://www.lg.com/content/dam/channel/wcms/ca_en/images/ces2025-ultragear-gaming/it-microsite-2025-ces-ultragear-gaming-feature-04-4-1.jpg",
    prices: { USD: 1299.99, INR: 115420.07, GBP: 988.21 },
  },
];

// === Seed Function ===
const seedDB = async () => {
  try {
    console.log("🚀 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected!");

    console.log("🧹 Clearing old products...");
    await Product.deleteMany();

    console.log("🌱 Seeding sample products...");
    await Product.insertMany(products);

    console.log("🎉 Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

// === Run Seeder ===
seedDB();
