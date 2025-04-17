'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  customerID: number;
  deliveryAddress: string;
  status: string;
}

const statusOptions = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

export default function DeliveryOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Dummy removed

  useEffect(() => {
  	const fetchOrderData = async () => {
  		try {
  			const response = await fetch('http://localhost:8080/orderoverallviewnotdelivered');
  			const data = await response.json();
  			setOrders(data);
  		} catch(error) {
  			console.error('Error fetching order data:', error);
  		}
  	}
  	fetchOrderData();
  	const interval = setInterval(fetchOrderData, 10000);

  	return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
  try {
  	const response = await axios.post('http://localhost:8080/orderstatusupdate', {
  		orderID: id,
  		newStatus: newStatus
  	}, {
  		headers: {
  			'Content-Type': 'application/json'
  		}
  	});
  } catch (error) {
  	console.error('Error updating status:', error);
  }
  
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
      case 'Preparing':
        return 'bg-purple-400';
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
            <p><span className="font-medium">Customer ID:</span> {order.customerID}</p>
            <p><span className="font-medium">Address:</span> {order.deliveryAddress}</p>
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
