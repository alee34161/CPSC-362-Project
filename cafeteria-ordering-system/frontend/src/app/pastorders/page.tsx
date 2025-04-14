'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  customization: string;
};

type Order = {
  orderId: number;
  items: CartItem[];
  total: number;
  status: string;
  timestamp: string;
};

export default function PastOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pastorders');

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid past orders data');
        }

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching past orders:', error);
        setLoading(false);
      }
    };

    fetchPastOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Past Orders</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Menu
        </Link>
      </div>

      {loading ? (
        <p>Loading past orders...</p>
      ) : orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Order #{order.orderId}</h2>
              <p className="text-sm text-gray-500">
                {new Date(order.timestamp).toLocaleString()}
              </p>
            </div>

            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-1">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} {item.customization && `• ${item.customization}`}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="flex justify-between mt-2 font-semibold">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="text-sm text-green-600 mt-1">Status: {order.status}</div>
          </div>
        ))
      )}
    </div>
  );
}