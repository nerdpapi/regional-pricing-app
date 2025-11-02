import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = res.data;

        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-8 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-6 text-center">Regional Pricing Store</h1>
      <p className="text-muted-foreground mb-10 text-center max-w-md">
        Choose your currency and pay securely via Stripe checkout
      </p>

      {products.length === 0 ? (
        <div>
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
