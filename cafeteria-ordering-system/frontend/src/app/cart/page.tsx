'use client'; // Needed for interactivity in Next.js App Router

import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastSentTotal, setLastSentTotal] = useState<number | null>(null);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
  	const fetchCartData = async () => {
  	  	try {
  	  		const response = await fetch('http://localhost:8080/cartread', {method: 'GET', credentials: 'include'});
  	  		const data = await response.json();
  	  		setCartItems(data);
  	  		setIsCartLoaded(true);
  	  	} catch (error) {
  	  		console.error('Error fetching cart items:', error);
  	  	}
  	  };
  	  fetchCartData();
  }, []);

  const updateQuantity = async (itema:any, newQty: number) => {
	try {
		const response = await axios.post('http://localhost:8080/cartupdate', {
			id: itema.id,
			quantity: newQty
			}, {
			headers: {
				'Content-Type': 'application/json'
			}, withCredentials: true
		});
	} catch (error) {
		console.error('Error updating cart:', error);
	}
	
  
    setCartItems((items) =>
      items.map((item) =>
        item.id === itema.id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const updateNote = async (id: number, newNote: string) => {
	try {
		const response = await axios.post('http://localhost:8080/cartcustomupdate', {
			id: id,
			customization: newNote
		}, {
			headers: {
				'Content-Type': 'application/json'
			}, withCredentials: true
		});
	} catch (error) {
		console.error('Error updating customization in cart.', error);
	}

    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, customization: newNote } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;  
  
  useEffect(() => {
    if (!isCartLoaded) return; // Avoid running before cart is loaded
    if (lastSentTotal !== total) {
      const updateCartTotal = async () => {
        try {
          await axios.post(
            'http://localhost:8080/updatetotal',
            { cartTotal: total },
            { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
          );
          setLastSentTotal(total);
        } catch (error) {
          console.error('Error updating cart total:', error);
        }
      };
  
      updateCartTotal();
    }
  }, [total, lastSentTotal, isCartLoaded]);

useEffect(() => {
	if (isCartLoaded && cartItems.length === 0) {
	alert("Your cart is empty.");
	}
}, [cartItems, isCartLoaded]);


const handleTotal = async () => {
	try {
		const response = await axios.post('http://localhost:8080/updatetotal', {
			cartTotal: total
		}, {
			headers: {
				'Content-Type': 'application/json'
			}, withCredentials: true
		});
		router.push('/checkout');
	} catch (error) {
		console.error('Error updating cart total.');
	}
}

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
		<div className="flex justify-end">
 		 <a
		    href="/dashboard"
		    className="text-sm font-medium text-blue-600 hover:underline"
		  >
 		   Back to Menu
		  </a>
		</div>

    
      <h1 className="text-3xl font-bold">Your Cart</h1>

      <div className="space-y-4">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/*<Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />*/}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <label className="text-sm text-gray-500">Qty:</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item, parseInt(e.target.value) || 1)}
                      className="w-16 p-1 text-center border rounded"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="text-sm text-red-600 hover:underline mt-1"
                // unconnected delete button
                >
                  Delete
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm block mb-1 text-gray-500">Special Request</label>
              <input
                type="text"
                value={item.customization ?? ''}
                onChange={(e) => updateNote(item.id, e.target.value)}
                placeholder="ex: No onions, no pickles..."
                className="w-full p-2 border rounded text-sm"
              />
            </div>
          </div>
        ))
        )}
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
	{cartItems.length > 0 && (

        <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition" onClick={handleTotal}>
          Proceed to Checkout
        </button>

      )}
    </div>
  );
}
