'use client'; // Needed for interactivity in Next.js App Router

import Image from 'next/image';
import { useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note: string;
};

const initialItems: CartItem[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    quantity: 2,
    image: '/images/headphones.jpg',
    note: '',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 129.99,
    quantity: 1,
    image: '/images/keyboard.jpg',
    note: '',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    price: 129.99,
    quantity: 1,
    image: '/images/keyboard.jpg',
    note: '',
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: number, newQty: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const updateNote = (id: number, newNote: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, note: newNote } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <label className="text-sm text-gray-500">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-16 p-1 text-center border rounded"
                    />
                  </div>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div>
              <label className="text-sm block mb-1 text-gray-500">Special Request</label>
              <input
                type="text"
                value={item.note}
                onChange={(e) => updateNote(item.id, e.target.value)}
                placeholder="ex: No onions, no pickles..."
                className="w-full p-2 border rounded text-sm"
              />
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
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
        Proceed to Checkout
      </button>
    </div>
  );
}
