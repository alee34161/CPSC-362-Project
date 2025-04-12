'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function OrderConfirmationPage() {
  const [orderStatus] = useState('Out for Delivery'); // Simulate real status here
  const [statusSteps] = useState(['Pending', 'Preparing', 'Out for Delivery', 'Completed']);

  // Simulated cart data
  const cartItems = [
    {
      id: 1,
      name: 'Classic Cheeseburger',
      quantity: 2,
      price: 7.99,
      customization: 'No pickles',
    },
    {
      id: 2,
      name: 'Large Fries',
      quantity: 1,
      price: 2.99,
      customization: '',
    },
    {
      id: 3,
      name: 'Chocolate Milkshake',
      quantity: 1,
      price: 3.5,
      customization: 'Extra whipped cream',
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t pt-2">
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