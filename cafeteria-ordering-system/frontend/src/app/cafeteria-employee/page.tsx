'use client';

import { useState } from 'react';

type MealItem = {
  name: string;
  note?: string;
};

type MealOrder = {
  id: number;
  items: MealItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<MealOrder[]>([
    {
      id: 101,
      items: [
        { name: 'Grilled Chicken' },
        { name: 'Salad', note: 'No dressing' },
        { name: 'Iced Tea' },
      ],
    },
    {
      id: 102,
      items: [
        { name: 'Veggie Burger' },
        { name: 'Fries', note: 'Extra ketchup' },
      ],
    },
    {
      id: 103,
      items: [
        { name: 'Pasta' },
        { name: 'Garlic Bread' },
      ],
    },
  ]);

  const handleReady = (id: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Cafeteria Meal Tickets</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-12">No current orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 space-y-3 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-blue-700">Order #{order.id}</h2>
              <button
                onClick={() => handleReady(order.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
              >
                Ready for Pickup
              </button>
            </div>

            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {order.items.map((item, index) => (
                <li key={index}>
                  <span className="font-medium">{item.name}</span>
                  {item.note && (
                    <span className="text-gray-500"> – {item.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
