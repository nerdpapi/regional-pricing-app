import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

export default function ProductPage({ product }) {
  const currency = useSelector((state) => state.currency.value);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Product not found.
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        { productId: product.id || product._id, currency } // ✅ Uses Redux currency
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Checkout session not created.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const priceValue = product.prices?.[currency] ?? "N/A";
  const currencySymbols = { INR: "₹", USD: "$", GBP: "£" };
  const symbol = currencySymbols[currency] || "";

  return (
    <main className="min-h-screen bg-gray-50 p-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl w-full flex flex-col md:flex-row gap-10 hover:shadow-xl transition-shadow duration-300">
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-3 leading-tight">
              {product.name}
            </h1>

            {product.details && product.details.length > 0 ? (
              <ul className="list-disc list-inside space-y-1 text-gray-600 mb-6 text-base leading-relaxed">
                {product.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                No details available.
              </p>
            )}

            {priceValue !== "N/A" ? (
              <p className="text-2xl font-bold text-blue-600 mb-6">
                {symbol}{priceValue.toLocaleString()}
              </p>
            ) : (
              <p className="text-gray-500 mb-6">Price not available</p>
            )}

            <ul className="text-gray-700 text-sm space-y-1 mb-8">
              <li>✅ Genuine Product Guarantee</li>
              <li>🚚 Fast & Secure Delivery</li>
              <li>💳 Safe Payments via Stripe</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-30 rounded-full px-5 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Buy Now"}
            </Button>

            <Link
              href="/"
              className="flex flex-row items-center gap-2 justify-center w-fit rounded-full px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    const data = await res.json();

    if (!res.ok || !data?.success || !data?.data) {
      return { notFound: true };
    }

    return {
      props: {
        product: data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
}
