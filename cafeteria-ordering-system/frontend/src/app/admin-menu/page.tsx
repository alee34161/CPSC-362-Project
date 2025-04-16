"use client";

import { useState } from "react";

export default function AdminMenuPage() {
  const [tab, setTab] = useState("user");

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Menu</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setTab("user")} className="bg-blue-500 text-white px-4 py-2 rounded">Manage Users</button>
        <button onClick={() => setTab("menu")} className="bg-green-500 text-white px-4 py-2 rounded">Edit Cafeteria Menu</button>
      </div>

      {tab === "user" && (
        <div className="space-y-6">
          {/* 🔹 Update User Info */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Update User Info</h2>
            <input type="text" placeholder="Username or Email" className="input" />
            <input type="text" placeholder="New Name" className="input" />
            <input type="text" placeholder="New Phone" className="input" />
            <button className="button-blue">Update Info</button>
          </div>

          {/* 🔹 Promote/Demote User */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Promote/Demote User</h2>
            <input type="text" placeholder="Username" className="input" />
            <select className="input">
              <option value="admin">Admin</option>
              <option value="cafeteria">Cafeteria Staff</option>
              <option value="delivery">Delivery Driver</option>
              <option value="customer">Customer</option>
            </select>
            <button className="button-blue">Update Role</button>
          </div>

          {/* 🔹 Delete User */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Delete User</h2>
            <input type="text" placeholder="Username" className="input" />
            <button className="button-red">Delete User</button>
          </div>
        </div>
      )}

      {tab === "menu" && (
        <div className="space-y-6">
          {/* 🔹 Update Cafeteria Menu */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Edit Menu Item</h2>
            <input type="text" placeholder="Item ID or Name" className="input" />
            <input type="text" placeholder="New Name" className="input" />
            <input type="text" placeholder="New Price" className="input" />
            <input type="number" placeholder="New Quantity" className="input" />
            <button className="button-green">Update Menu</button>
          </div>
        </div>
      )}
    </div>
  );
}

//  Utility classes
const inputClass = "border p-2 w-full rounded mb-2";
const buttonClass = "px-4 py-2 rounded mt-2";

// Combine into a Tailwind component
function Input({ ...props }) {
  return <input className={inputClass} {...props} />;
}
