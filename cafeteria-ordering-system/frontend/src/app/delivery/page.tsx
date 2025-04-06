// app/delivery/page.tsx
"use client";
import { useState } from "react";

type DeliveryOrder = {
  id: number;
  customerName: string;
  address: string;
  items: string[];
  status: string;
};

export default function DeliveryPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: 101,
      customerName: "Alice",
      address: "123 Titan Blvd",
      items: ["Burger", "Fries"],
      status: "Ready",
    },
    {
      id: 102,
      customerName: "Bob",
      address: "456 Titan Ave",
      items: ["Pizza"],
      status: "Ready",
    },
  ]);

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const markAsDelivered = (id: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Delivery Dashboard</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <h2 className="text-xl font-semibold">
              Delivery #{order.id} - {order.customerName}
            </h2>
            <p>📦 Items: {order.items.join(", ")}</p>
            <p>📍 Address: {order.address}</p>
            <p>🚚 Status: {order.status}</p>

            <div className="flex gap-2 mt-2">
              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusUpdate(order.id, e.target.value)
                }
                className="border px-2 py-1 rounded"
              >
                <option value="Ready">Ready</option>
                <option value="On the way">On the way</option>
                <option value="Delivered">Delivered</option>
              </select>

              <button
                onClick={() => markAsDelivered(order.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-gray-600">All deliveries are complete ✅</p>
        )}
      </div>
    </div>
  );
}