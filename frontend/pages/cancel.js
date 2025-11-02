  export default function CancelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        Your payment was not completed. You can try again anytime or go back to the home page.
      </p>

      <a
  href="/"
  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
>
  Back to Home
</a>
    </main>
  );
}
