// app/documentation/page.tsx
"use client";

export default function DocumentationPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">📘 User Documentation</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🔑 Getting Started</h2>
        <p>To use the cafeteria system, create an account or log in as a customer or employee.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🛒 Placing Orders</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Browse the menu from the dashboard.</li>
          <li>Add items to your cart.</li>
          <li>Go to the cart page and proceed to checkout.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">📦 Tracking Orders</h2>
        <p>You can track your orders in real-time after confirming them. The status will update as your order moves through the process.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">💬 Need Help?</h2>
        <p>For support, contact our help team via the footer or your account page.</p>
      </section>
    </div>
  );
}
