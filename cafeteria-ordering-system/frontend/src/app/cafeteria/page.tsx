'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

type MealItem = {
  name: string;
  customization: string;
  quantity: number;
};

type MealOrder = {
  id: number;
  deliveryAddress: string;
  status: string;
  items: MealItem[]; // Ensure 'items' is included for each order
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<MealOrder[]>([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Fetch the list of orders
        const response = await axios.get('http://localhost:8080/orderoverallviewnotdelivered', { withCredentials: true });
        console.log("Orders response:", response.data);  // Log the orders to verify

        // Now fetch items for each order
        const ordersWithItems = await Promise.all(
          response.data
            .filter((order: MealOrder) => order.status === 'Pending') // Filter orders with status 'Pending'
            .map(async (order: MealOrder) => {
              const itemsResponse = await axios.get('http://localhost:8080/ordercafitemslist', {
                params: { ordID: order.id },
                withCredentials: true,
              });
              console.log("Items for order", order.id, itemsResponse.data);  // Log the items response

              // Merge the items into the order
              return { ...order, items: itemsResponse.data };
            })
        );

        console.log("Orders with merged items:", ordersWithItems);  // Log the final orders with items
        setOrders(ordersWithItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrderData();
    const interval = setInterval(fetchOrderData, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleReady = async (id: number) => {
    try {
      await axios.post(
        'http://localhost:8080/orderstatusupdate',
        {
          orderID: id,
          newStatus: 'Awaiting Pickup',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }

    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Cafeteria Meal Tickets</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-12">No current orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 space-y-4 border border-gray-300 mb-6" // Stronger border between orders
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold text-blue-700">Order #{order.id}</h2>
              <button
                onClick={() => handleReady(order.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition"
              >
                Ready for Pickup
              </button>
            </div>

            <ul className="list-disc list-inside text-sm text-gray-800 space-y-3">
              {order.items?.map((item, index) => (
                <li key={index} className="pb-3 border-b border-gray-200"> {/* Divider between items */}
                  <span className="font-medium">{item.name}</span>
                  {item.customization && (
                    <div className="text-gray-500 mt-1">
                      <strong>Customization:</strong> {item.customization}
                    </div>
                  )}
                  {item.quantity && (
                    <div className="text-gray-500 mt-1">
                      <strong>Quantity:</strong> {item.quantity}
                    </div>
                  )}
                </li>
              ))}

              {/* If 'items' is undefined or empty, display a message */}
              {(!order.items || order.items.length === 0) && (
                <p className="text-gray-500">No items available for this order.</p>
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
