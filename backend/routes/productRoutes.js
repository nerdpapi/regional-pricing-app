import express from "express";
import { getProducts, addProduct, getProductById } from "../controllers/productController.js";
import { detectLocation } from "../middlewares/detectLocation.js";
const router = express.Router();

router.route("/")
  .get(detectLocation, getProducts)
  .post(addProduct);

router.route("/:id")
  .get(getProductById);

export default router;
