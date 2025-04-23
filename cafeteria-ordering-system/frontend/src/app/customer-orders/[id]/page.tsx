'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetail {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    // Dummy fetch
    axios.get(`/api/orders/${id}`) // Replace with real backend
      .then(res => setOrder(res.data))
      .catch(err => console.error("Error fetching order", err));
  }, [id]);

  if (!order) return <p className="p-8">Loading order...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <ul className="divide-y">
        {order.items.map((item, index) => (
          <li key={index} className="py-2 flex justify-between">
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
