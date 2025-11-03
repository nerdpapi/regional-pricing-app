import { useState } from "react";
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
  const [currency, setCurrency] = useState(product.localizedPrice?.currency || "USD");
  const [loading, setLoading] = useState(false);

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

  const getCurrencySymbol = (cur) => {
    switch (cur) {
      case "INR":
        return "₹";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  };

  const currentPrice = product.prices?.[currency] || product.prices?.["USD"];
  const formattedPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  }).format(currentPrice);

  return (
    <Card className="flex flex-col border rounded-lg p-6 text-center shadow-md h-full bg-white">
      <div className="w-full h-60 xl:h-110 overflow-hidden rounded-md mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
        <CardDescription className="text-gray-600 mb-3 grow">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 mb-4">
        <Select value={currency} onValueChange={(val) => setCurrency(val)}>
          <SelectTrigger className="border rounded-md w-full">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="INR">INR (₹)</SelectItem>
            <SelectItem value="GBP">GBP (£)</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>

      <p className="text-lg font-bold mb-4">{formattedPrice}</p>

      <CardFooter className="p-0 flex flex-col gap-3 mt-auto">
        {/* ✅ View Details button */}
        <Link href={`/products/${product._id || product.id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-full px-5 py-2 font-medium hover:bg-gray-100 transition"
          >
            View Details
          </Button>
        </Link>

        {/* ✅ Buy Now button */}
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
