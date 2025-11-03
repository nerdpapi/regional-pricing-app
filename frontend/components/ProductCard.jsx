import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "@/store/currencySlice";
import axios from "axios";
import Link from "next/link";
import { getStripe } from "../lib/getStripe";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.value); 
  const [loading, setLoading] = useState(false);

  const handleCurrencyChange = (val) => {
    dispatch(setCurrency(val)); 
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await getStripe();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        { productId: product.id || product._id, currency }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Checkout session not created.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = (cur) =>
    cur === "INR" ? "₹" : cur === "GBP" ? "£" : "$";

  const currentPrice = product.prices?.[currency] || product.prices?.["INR"];
  const formattedPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(currentPrice);

  return (
    <Card className="flex flex-col border rounded-lg p-6 text-center shadow-md bg-white h-full">
      <div className="w-full h-60 overflow-hidden rounded-md mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 scale-120 hover:scale-105"
        />
      </div>

      <div className="flex flex-col grow">
        <CardHeader className="p-0 mb-3">
          <CardTitle className="text-xl font-semibold mb-2 line-clamp-1">
            {product.name}
          </CardTitle>
          <CardDescription className="text-gray-600 mb-3 line-clamp-2 min-h-[48px]">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 mb-4">
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="border rounded-md w-full">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">INR (₹)</SelectItem>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <p className="text-lg font-bold mb-4">{formattedPrice}</p>
      </div>

      <CardFooter className="p-0 flex flex-col gap-3 mt-auto">
        <Link
          href={`/products/${product._id || product.id}?currency=${currency}`}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full rounded-full px-5 py-2 font-medium hover:bg-gray-100 transition"
          >
            View Details
          </Button>
        </Link>

        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full rounded-full px-5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Buy Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
