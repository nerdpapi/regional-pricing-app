import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const MONGO_URI = "mongodb+srv://kunalkmr71_db_user:Kunal123@cluster0.0skegol.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0";
const products = [
  {
    name: "HyperX Cloud III Headset",
    description: "A high-performance gaming headset with surround sound.",
    image: "https://m.media-amazon.com/images/I/71pz2njkNRL.jpg",
  
    details: [
      "Up to 120-Hour Battery Life",
      "HyperX Signature Comfort and Durability",
      "Tuned, Angled 53mm Drivers",
      "Ultra-Clear Microphone with LED Mute Indicator",
      "Compatibility: PC, PS5, PS4, Nintendo Switch"
    ],
  
    prices: { USD: 49.99, INR: 4438.38, GBP: 38.00 }
  },
  
  {
    name: "MSI GeForce RTX 5090 Gaming Trio OC Graphics Card",
    description: "Advanced graphics card for gaming and AI processing.",
    image:
      "https://asset.msi.com/resize/image/global/product/product_1737081391df0edd81daeead5bd52c24e71abeae13.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png",
    details: [
      "NVIDIA GeForce RTX 5090 GPU",
      "32GB GDDR7 512-bit Memory",
      "28 Gbps Memory Speed",
      "PCI Express Gen 5 Interface",
      "Up to 2482 MHz Boost Clock",
      "STORMFORCE Triple Fan Cooling System"
    ],
    prices: { USD: 1999.0, INR: 177481.19, GBP: 1519.57 }
  }
  ,
  {
    name: "LG UltraGear™ OLED GX9 (45GX990A)",
    description: "World's First 5K2K OLED Bendable Gaming Monitor.",
    image:
      "https://www.lg.com/content/dam/channel/wcms/ca_en/images/ces2025-ultragear-gaming/it-microsite-2025-ces-ultragear-gaming-feature-04-4-1.jpg",
    details: [
      "OLED WQHD 800R Curved (Bendable) Display",
      "Resolution: 3440 x 1440",
      "240Hz Refresh Rate",
      "0.03ms Response Time",
      "G-Sync Compatible & AMD FreeSync™ Support",
      "HDR™ True Black 400 Certified",
      "1.5M:1 Contrast Ratio",
      "Ergonomic Stand: Tilt, Height, Swivel Adjustment"
    ],
    prices: { USD: 1299.99, INR: 115420.07, GBP: 988.21 }
  }
  ,
];

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
seedDB();
