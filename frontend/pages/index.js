import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCurrency } from "@/store/currencySlice";
import ProductCard from "../components/ProductCard";

export default function HomePage({ products, currency }) {
  const dispatch = useDispatch();

  // ✅ Load currency into Redux when page loads
  useEffect(() => {
    if (currency) {
      dispatch(loadCurrency(currency));
    }
  }, [currency, dispatch]);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-8 transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-6 text-center">Regional Pricing Store</h1>

      <p className="text-muted-foreground mb-10 text-center max-w-md">
        Choose your currency and pay securely via Stripe checkout.
        <br />
        Prices shown in your local currency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    const data = await res.json();

    if (!res.ok || !data?.success || !data?.data) {
      return { notFound: true };
    }

    return {
      props: {
        products: data.data,
        currency: data.currency || "INR",
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { notFound: true };
  }
}
