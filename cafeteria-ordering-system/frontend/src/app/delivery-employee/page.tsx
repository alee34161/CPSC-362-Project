'use client';

import React, { useState } from 'react';

interface Order {
  id: number;
  customer: string;
  address: string;
  status: string;
}

const statusOptions = ['Pending', 'Out for Delivery', 'Delivered'];

export default function DeliveryOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Dummy removed

  const handleStatusChange = (id: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Out for Delivery':
        return 'bg-yellow-400';
      case 'Pending':
        return 'bg-gray-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Delivery Orders</h1>
      {orders.length === 0 ? (
        <p className="text-lg text-gray-500">No orders assigned yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-6 p-6 bg-white rounded-md shadow-md border"
          >
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p><span className="font-medium">Customer:</span> {order.customer}</p>
            <p><span className="font-medium">Address:</span> {order.address}</p>
            <div className="mt-4 flex items-center gap-4">
              <span
                className={`text-white text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
              <select
                className="border rounded-md px-3 py-1 text-sm"
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
