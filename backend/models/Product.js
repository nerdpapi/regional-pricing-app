import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
     details: [{ type: String }],
    prices: {
      USD: { type: Number, required: true },
      INR: { type: Number, required: true },
      GBP: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
