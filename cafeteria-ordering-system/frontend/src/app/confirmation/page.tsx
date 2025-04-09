// app/confirmation/page.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ConfirmationPage = () => {
  const router = useRouter();

  // Dummy data (you can replace with real data later)
  const order = {
    orderId: "ABC123456",
    date: "April 5, 2025",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 12.99 },
      { name: "Garlic Bread", quantity: 2, price: 4.99 },
    ],
    status: "Out for Delivery",
  };

  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Order Confirmed!</h1>
        <p className="text-center text-gray-700 mb-6">
          Thank you for your order. Your receipt and tracking info are below.
        </p>

        <div className="mb-4">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {order.date}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Items Ordered:</h2>
          <ul className="list-disc list-inside text-gray-800">
            {order.items.map((item, index) => (
              <li key={index}>
                {item.quantity} × {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold">Total: ${total}</h2>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-1">Tracking Status:</h2>
          <p className="text-blue-600">{order.status}</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;