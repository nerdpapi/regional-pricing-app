import dotenv from "dotenv";
dotenv.config();
console.log("🔍 Environment variables loaded:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  BASE_CURRENCY: process.env.BASE_CURRENCY,
  IP_GEO_API_URL: process.env.IP_GEO_API_URL,
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
// ✅ Root route
app.get("/", (req, res) => {
  res.send("🌍 API is running...");
});

// ✅ Global error handler
app.use(errorHandler);

export default app;
