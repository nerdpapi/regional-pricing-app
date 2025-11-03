import Link from "next/link";
export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Payment Successful</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        Thank you! Your payment was successful. You’ll receive a confirmation shortly.
      </p>

      <Link href="/" prefetch={false} onClick={() => window.location.href = "/"}
        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </main>
  );
}
