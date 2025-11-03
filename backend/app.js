import dotenv from "dotenv";
dotenv.config();
console.log("🔍 Environment variables loaded:", {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  BASE_CURRENCY: process.env.BASE_CURRENCY,
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.get("/", (req, res) => {
  res.send("🌍 API is running...");
});

app.use(errorHandler);

export default app;
