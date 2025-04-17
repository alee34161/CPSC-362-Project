"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function AdminMenuPage() {
  const [tab, setTab] = useState("user");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Inputs for managing users
  const [userIdentifier, setUserIdentifier] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [usernameForRole, setUsernameForRole] = useState("");
  const [newRole, setNewRole] = useState("customer");

  const [usernameToDelete, setUsernameToDelete] = useState("");

  // Inputs for menu editing
  const [menuItemIdOrName, setMenuItemIdOrName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemQty, setNewItemQty] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Check admin status once component mounts
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8080/currentuserread", {
          withCredentials: true,
        });
        if (res.data && res.data.role === "admin") {
          setIsAdmin(true);
        } else {
          router.replace("/");
        }
      } catch (err) {
        console.error("Error checking admin:", err);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  // Handle pre-filling menu item inputs if an item is selected
  useEffect(() => {
    if (selectedItem) {
      setMenuItemIdOrName(selectedItem.name);
      setNewItemName(selectedItem.name);
      setNewItemPrice(selectedItem.price.toString());
      setNewItemQty(selectedItem.quantity);
    }
  }, [selectedItem]);

  // Fetch search results based on the search query
  useEffect(() => {
    if (searchQuery.length === 0) {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await axios.post("http://localhost:8080/cafmenusearch", {
          name: searchQuery,
        }, { withCredentials: true });

        setSearchResults(res.data);
      } catch (err) {
        console.error("Search failed", err);
      }
    };

    const debounce = setTimeout(fetchResults, 300); // optional debounce

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Handle updating user information
  const handleUpdateUserInfo = async () => {
    try {
      await axios.post("http://localhost:8080/updateUser", {
        username: userIdentifier,
        name: newName,
        password: newPassword
      }, { withCredentials: true });
      alert("User info updated.");
    } catch (err) {
      console.error("Error updating user info:", err);
    }
  };

  // Handle updating user role
  const handleUpdateRole = async () => {
    try {
      await axios.post("http://localhost:8080/updateRole", {
        username: usernameForRole,
        role: newRole
      }, { withCredentials: true });
      alert("User role updated.");
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    try {
      await axios.post("http://localhost:8080/deleteUser", {
        username: usernameToDelete
      }, { withCredentials: true });
      alert("User deleted.");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Show loading text or admin content based on loading and isAdmin state
  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Menu</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setTab("user")} className="bg-blue-500 text-white px-4 py-2 rounded">Manage Users</button>
        <button onClick={() => setTab("menu")} className="bg-green-500 text-white px-4 py-2 rounded">Edit Cafeteria Menu</button>
      </div>

      {/* Render User Management */}
      {tab === "user" && (
        <div className="space-y-6">
          {/* Update User Info */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Update User Info</h2>
            <input type="text" placeholder="Username/Email" value={userIdentifier} onChange={e => setUserIdentifier(e.target.value)} className="input" />
            <input type="text" placeholder="New Name" value={newName} onChange={e => setNewName(e.target.value)} className="input" />
            <input type="text" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input" />
            <button onClick={handleUpdateUserInfo} className="button-blue">Update Info</button>
          </div>

          {/* Promote/Demote User */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Promote/Demote User</h2>
            <input type="text" placeholder="Username" value={usernameForRole} onChange={e => setUsernameForRole(e.target.value)} className="input" />
            <select className="input" value={newRole} onChange={e => setNewRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="cafeteria">Cafeteria Staff</option>
              <option value="delivery">Delivery Driver</option>
              <option value="customer">Customer</option>
            </select>
            <button onClick={handleUpdateRole} className="button-blue">Update Role</button>
          </div>

          {/* Delete User */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Delete User</h2>
            <input type="text" placeholder="Username" value={usernameToDelete} onChange={e => setUsernameToDelete(e.target.value)} className="input" />
            <button onClick={handleDeleteUser} className="button-red">Delete User</button>
          </div>
        </div>
      )}

      {/* Render Menu Editing */}
      {tab === "menu" && (
        <div className="space-y-6">
          {/* Search Existing Menu Item */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Search Menu Item</h2>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input"
            />
    
            {searchResults.length > 0 && (
              <ul className="border rounded mt-2 max-h-40 overflow-y-auto">
                {searchResults.map(item => (
                  <li
                    key={item.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedItem(item);
                      setSearchQuery(item.name); // set search input to the item name
                      setSearchResults([]);
                    }}
                  >
                    {item.name} - ${item.price} (Qty: {item.quantity})
                  </li>
                ))}
              </ul>
            )}
          </div>

		{/* Add Menu Item */}
		          <div className="bg-white p-4 rounded shadow">
		            <h2 className="text-xl font-semibold mb-2">Add Menu Item</h2>
		            <input
		              type="text"
		              placeholder="Item Name"
		              value=''
		              onChange={e => setMenuItemIdOrName(e.target.value)}
		              className="input"
		            />
		            <input
		              type="text"
		              placeholder="Price"
		              value=''
		              onChange={e => setNewItemPrice(e.target.value)}
		              className="input"
		            />
		            <input
		              type="number"
		              placeholder="Quantity"
		              value=''
		              onChange={e => setNewItemQty(Number(e.target.value))}
		              className="input"
		            />
		            <button
		              onClick={async () => {
		                try {
		                  await axios.post("http://localhost:8080/cafmenuadd", {
		                    name: menuItemIdOrName,
		                    price: newItemPrice,
		                    quantity: newItemQty,
		                  }, { withCredentials: true });
		                  alert("Menu item added.");
		                  // Reset fields
		                  setMenuItemIdOrName("");
		                  setNewItemPrice("");
		                  setNewItemQty(0);
		                } catch (err) {
		                  console.error("Error adding item:", err);
		                }
		              }}
		              className="button-blue"
		            >
		              Add Item
		            </button>
		          </div>
    
          {/* Update Existing Menu Item */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Update Existing Menu Item</h2>
            <input
              type="text"
              placeholder="Item Name"
              value={menuItemIdOrName}
              onChange={e => setMenuItemIdOrName(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="New Price"
              value={newItemPrice}
              onChange={e => setNewItemPrice(e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="New Quantity"
              value={newItemQty}
              onChange={e => setNewItemQty(Number(e.target.value))}
              className="input"
            />
            <button
              onClick={async () => {
                try {
                  await axios.post("http://localhost:8080/cafmenuupdate", {
                    name: menuItemIdOrName,
                    price: newItemPrice,
                    quantity: newItemQty,
                  }, { withCredentials: true });
                  alert("Menu item updated.");
                  // Reset fields
                  setMenuItemIdOrName("");
                  setNewItemPrice("");
                  setNewItemQty(0);
                } catch (err) {
                  console.error("Error updating item:", err);
                }
              }}
              className="button-blue"
            >
              Update Item
            </button>
          </div>
    
          {/* Delete Menu Item */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Delete Menu Item</h2>
            <input
              type="text"
              placeholder="Item Name"
              value={menuItemIdOrName}
              onChange={e => setMenuItemIdOrName(e.target.value)}
              className="input"
            />
            <button
              onClick={async () => {
                try {
                  await axios.post("http://localhost:8080/cafmenudelete", {
                    name: menuItemIdOrName
                  }, { withCredentials: true });
                  alert("Menu item deleted.");
                  // Reset field
                  setMenuItemIdOrName("");
                } catch (err) {
                  console.error("Error deleting item:", err);
                }
              }}
              className="button-red"
            >
              Delete Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
