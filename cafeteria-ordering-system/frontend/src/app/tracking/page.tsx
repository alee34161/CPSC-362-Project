'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function OrderConfirmationPage() {
  const [orderStatus, setOrderStatus] = useState<string>('Preparing');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [statusSteps] = useState(['Preparing', 'Cooking', 'Ready for Pickup', 'Completed']);

  // Fake progression through order statuses
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStatus((prevStatus) => {
        const currentIndex = statusSteps.indexOf(prevStatus);
        if (currentIndex < statusSteps.length - 1) {
          return statusSteps[currentIndex + 1];
        }
        clearInterval(interval);
        return prevStatus;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [statusSteps]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cartread');
        setCartItems(response.data);

        const subtotal = response.data.reduce(
          (acc: number, item: any) => acc + item.price * item.quantity,
          0
        );
        const tax = subtotal * 0.1;
        setTotal(subtotal + tax);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Order Confirmation</h1>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          Back to Menu
        </Link>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-sm space-y-2 border"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} | Special: {item.customization || 'None'}
                </p>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl space-y-2 shadow-inner">
        <div className="flex justify-between text-sm">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Order Status: {orderStatus}</h2>
        <div className="flex items-center justify-between">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={`rounded-full h-10 w-10 mx-auto flex items-center justify-center text-white font-bold ${
                  statusSteps.indexOf(orderStatus) >= index ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <p className="text-xs mt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}