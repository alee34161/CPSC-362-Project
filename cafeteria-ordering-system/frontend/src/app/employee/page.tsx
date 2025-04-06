// app/employee/page.tsx
"use client";
import { useState } from "react";

type Order = {
  id: number;
  customerName: string;
  items: string[];
  status: string;
};

export default function EmployeeOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customerName: "Alice",
      items: ["Burger", "Fries"],
      status: "Pending",
    },
    {
      id: 2,
      customerName: "Bob",
      items: ["Pizza"],
      status: "Preparing",
    },
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleComplete = (id: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Employee Meal Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">
              Order #{order.id} - {order.customerName}
            </h2>
            <p className="mb-2">Items: {order.items.join(", ")}</p>
            <p className="mb-2">Status: {order.status}</p>
            <div className="flex gap-2">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
              </select>
              <button
                onClick={() => handleComplete(order.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Mark as Complete
              </button>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-gray-600">No active orders right now!</p>
        )}
      </div>
    </div>
  );
}