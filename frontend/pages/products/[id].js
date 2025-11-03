import ProductCard from "../../components/ProductCard";

export default function ProductPage({ product }) {
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 p-10">
      <ProductCard product={product} />
    </main>
  );
}

// ✅ Server-Side Rendering (SSR)
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    // Fetch from your backend connected to MongoDB Atlas
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    const data = await res.json();

    if (!res.ok || !data?.success || !data?.data) {
      return { notFound: true };
    }

    return {
      props: {
        product: data.data, // send the single product to component
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
}
