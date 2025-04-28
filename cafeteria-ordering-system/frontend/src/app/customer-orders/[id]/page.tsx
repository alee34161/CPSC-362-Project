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
  total: number;
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const [orderItemList, setOrderItemList] = useState<OrderItem[] | null>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/orderspecificview`, {params: {orderID: id}, withCredentials:true})
      .then(res => setOrderItemList(res.data))
      .catch(err => console.error("Error fetching order", err));
      axios.get(`http://localhost:8080/orderview`, {params: {orderID: id}, withCredentials:true})
            .then(res => setOrder(res.data))
            .catch(err => console.error("Error fetching order", err));
  }, [id]);

  if (!order) return <p className="p-8">Loading order...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <p><strong>Total:</strong> ${order.total}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <ul className="divide-y">
        {orderItemList && orderItemList.length > 0 ? (
          orderItemList.map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{item.name} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))
        ) : (
          <li>No items available</li>
        )}
        <button 
          onClick={() => window.history.back()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </ul>
    </div>
  );
}
