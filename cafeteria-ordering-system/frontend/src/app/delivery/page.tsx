'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Order {
  id: number;
  customerID: number;
  deliveryAddress: string;
  status: string;
  name: string; // This will hold the customer name
}

interface Customer {
  id: number;
  name: string;
}

const statusOptions = ['Pending', 'Awaiting Pickup', 'Out for Delivery', 'Delivered'];

export default function DeliveryOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // Store orders with customer names
  const [customers, setCustomers] = useState<Map<number, string>>(new Map()); // Map to store customer data (id -> name)
  const [isDelivery, setIsDelivery] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if the user is a delivery driver
  useEffect(() => {
    const checkDelivery = async () => {
      try {
        const res = await axios.get('http://localhost:8080/currentuserread', {
          withCredentials: true
        });
        if (res.data && res.data.role === 'delivery') {
          setIsDelivery(true);
        } else {
          router.replace('/');
        }
      } catch (err) {
        console.error('Error checking delivery driver:', err);
        router.replace('/');
      } finally {
        setLoading(false);
      }
    };
    checkDelivery();
  }, [router]);

  // Fetch customer data for all customers
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('http://localhost:8080/customers', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        // Create a map of customerID -> customerName for easy lookup
        const customerMap = new Map<number, string>(data.map((customer: Customer) => [customer.id, customer.name]));
        setCustomers(customerMap);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomerData();

    const interval = setInterval(fetchCustomerData, 10000);

    return () => clearInterval(interval);
  }, []);

  // Fetch orders data
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch('http://localhost:8080/orderoverallviewnotdelivered', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();

        // Update orders with customer name based on customerID
        const updatedOrders = data.map((order: Order) => ({
          ...order,
          name: customers.get(order.customerID) || 'Unknown Customer' // Lookup customer name by customerID
        }));

        setOrders(updatedOrders);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };
    fetchOrderData();

    const interval = setInterval(fetchOrderData, 10000); // Refresh orders every 10 seconds

    return () => clearInterval(interval);
  }, [customers]); // Re-run when customers data changes

  // Handle order status change
  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await axios.post('http://localhost:8080/orderstatusupdate', {
        orderID: id,
        newStatus: newStatus
      }, {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
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

  // Get the color based on order status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Out for Delivery':
        return 'bg-yellow-400';
      case 'Awaiting Pickup':
        return 'bg-yellow-400';
      case 'Pending':
        return 'bg-gray-400';
      default:
        return 'bg-blue-400';
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!isDelivery) return null;

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
            <p><span className="font-medium">Customer Name:</span> {order.name}</p>
            <p><span className="font-medium">Floor and Room #:</span> {order.deliveryAddress}</p>
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
