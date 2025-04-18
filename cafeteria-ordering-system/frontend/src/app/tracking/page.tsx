'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization: string;
};

export default function OrderTrackingPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>('Pending');
  const [lastStatus, setLastStatus] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const statusSteps = ['Pending', 'Preparing', 'Awaiting Pickup', 'Out for Delivery', 'Delivered'];
  // Fetch order status and show toast if changed
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orderstatus', {withCredentials: true});
        
        const newStatus = response.data[0].status;

        // Check if status has changed and show toast notification
        if (lastStatus && newStatus !== lastStatus) {
          toast.success(`Order status updated: ${newStatus}`);
        } else if (lastStatus == '') {
          toast.success(`Order status updated: ${newStatus}`);
        }

        setOrderStatus(newStatus);
        setLastStatus(newStatus);
      } catch (error) {
        console.error('Error fetching order status:', error);
        toast.error('Failed to update order status');
      }
    };

    fetchOrderStatus();
    const interval = setInterval(fetchOrderStatus, 10000); // Poll every 10 seconds
    
    return () => clearInterval(interval);
  }, [lastStatus]);

  // Fetch cart items
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/currentorderread', {withCredentials: true});
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid cart data');
        }

        const cartData = response.data;
        setCartItems(cartData);

        // Calculate the total amount with tax
        const subtotal = cartData.reduce(
          (acc: number, item: CartItem) => acc + item.price * item.quantity,
          0
        );
        const tax = subtotal * 0.1;
        setTotal(subtotal + tax);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        toast.error('Failed to load order items');
      }
    };

    fetchCartData();
  }, []);

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
		case 'Preparing':
			return 'bg-purple-400';
		default:
			return 'bg-blue-400';
	}
};

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Toast container */}
      <Toaster position="top-right" />
      
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Order Tracking</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Back to Menu
        </Link>
      </div>
      
      {/* Order Items - Now placed at the top */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Order Items</h2>
        
        {cartItems.length === 0 ? (
          <p>Loading order items...</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="border-b py-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} {item.customization && `• ${item.customization}`}
                    </p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Total (incl. tax)</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Simple status display - Now placed at the bottom */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Current Status</h2>
        <div className="p-2 bg-blue-100 rounded">
          <p className={`text-white text-sm px-3 py-1 rounded-full ${getStatusColor(orderStatus)}`}>{orderStatus}</p>
        </div>
      </div>
    </div>
  );
}
