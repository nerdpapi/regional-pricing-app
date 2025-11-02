import express from "express";
import { getProducts, addProduct } from "../controllers/productController.js";
import { detectLocation } from "../middlewares/detectLocation.js";
const router = express.Router();

router.route("/")
  .get(detectLocation, getProducts)
  .post(addProduct);

export default router;
