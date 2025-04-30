'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Order {
  id: number;
  date: string;
  total: number;
}

export default function PastOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Dummy data fetch
    axios.get('http://localhost:8080/ordercustomerview', {withCredentials: true}) // Replace with real backend
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders", err));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Past Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">You have no past orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p><strong>Order ID:</strong> #{order.id}</p>
                </div>
                <div className="text-right">
                  <p><strong>Total:</strong> ${order.total}</p>
                  <Link href={`/customer-orders/${order.id}`}>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      ><a href = '/dashboard'>
        Home
        </a>
      </button>
      
    </div>
  );
}
