"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: File | null;
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
  const [addItemName, setAddItemName] = useState("");
  const [addItemPrice, setAddItemPrice] = useState("");
  const [addItemQty, setAddItemQty] = useState(0);
  const [addItemCategory, setAddItemCategory] = useState("");
  const [addItemImage, setAddItemImage] = useState<File | null>(null);

  const [updateItemName, setUpdateItemName] = useState("");
  const [updateItemPrice, setUpdateItemPrice] = useState("");
  const [updateItemQty, setUpdateItemQty] = useState(0);
  const [updateItemCategory, setUpdateItemCategory] = useState("");
  const [updateItemImage, setUpdateItemImage] = useState<File | null>(null);

  const [deleteItemName, setDeleteItemName] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Check admin status once component mounts
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8080/currentuserread", { withCredentials: true });
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
// Handle pre-filling menu item inputs if an item is selected
useEffect(() => {
  if (selectedItem) {
    setUpdateItemName(selectedItem.name); // Fill in name
    setUpdateItemPrice(selectedItem.price.toString()); // Fill in price
    setUpdateItemQty(selectedItem.quantity); // Fill in quantity
    setUpdateItemCategory(selectedItem.category || ""); // Set the category

    // For image handling: if there is an image (URL or Base64 string), set it to the state
    setUpdateItemImage(selectedItem.image || null); // If no image, set null
    setDeleteItemName(selectedItem.name); // Pre-fill Delete section
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
        const res = await axios.post("http://localhost:8080/cafmenusearch", { name: searchQuery }, { withCredentials: true });
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
        password: newPassword,
      }, { withCredentials: true });
      alert("User info updated.");
      // Clear all form fields after submission
      clearAllFields();
    } catch (err) {
      console.error("Error updating user info:", err);
    }
  };

   // Handle updating user role
  const handleUpdateRole = async () => {
    try {
      await axios.post("http://localhost:8080/updateRole", {
        username: usernameForRole,
        role: newRole,
      }, { withCredentials: true });
      alert("User role updated.");
      // Clear all form fields after submission
      clearAllFields();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    try {
      await axios.post("http://localhost:8080/deleteUser", {
        username: usernameToDelete,
      }, { withCredentials: true });
      alert("User deleted.");
      // Clear all form fields after submission
      clearAllFields();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Handle adding a menu item
const handleAddMenuItem = async () => {
    // Start by preparing the image Base64 string
    let imageBase64 = null;
    
    // If an image is selected, use FileReader to convert it to Base64
    if (addItemImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageBase64 = reader.result as string;  // this will hold the Base64 string of the image
  
        // Now you can proceed with the rest of the data, including the image as Base64
        try {
          await axios.post("http://localhost:8080/cafmenuadd", {
            name: addItemName,
            price: addItemPrice,
            quantity: addItemQty,
            category: addItemCategory,
            image: imageBase64, // Send the Base64 string of the image
          }, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json", // Send as JSON
            },
          });
  
          alert("Menu item added.");
          clearAllFields(); // Clear the form after submission
        } catch (err) {
          console.error("Error adding item:", err);
        }
      };
      reader.readAsDataURL(addItemImage); // Convert the image to Base64
    } else {
      // If no image selected, just send the other form data
      await axios.post("http://localhost:8080/cafmenuadd", {
        name: addItemName,
        price: addItemPrice,
        quantity: addItemQty,
        category: addItemCategory,
        image: null, // No image selected
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
      });
  
      alert("Menu item added.");
      clearAllFields(); // Clear the form after submission
    }
  };
  

  // Handle updating a menu item
const handleUpdateMenuItem = async () => {
    // Start by preparing the image Base64 string for the update
    let imageBase64 = null;
    
    // If an image is selected, use FileReader to convert it to Base64
    if (updateItemImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageBase64 = reader.result as string; // this will hold the Base64 string of the image
  
        // Now send the updated data with the Base64 image
        try {
          await axios.post("http://localhost:8080/cafmenuupdate", {
            name: updateItemName,
            price: updateItemPrice,
            quantity: updateItemQty,
            category: updateItemCategory,
            image: imageBase64, // Send the Base64 string of the image
          }, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json", // Send as JSON
            },
          });
  
          alert("Menu item updated.");
          clearAllFields(); // Clear the form after submission
        } catch (err) {
          console.error("Error updating item:", err);
        }
      };
      reader.readAsDataURL(updateItemImage); // Convert the image to Base64
    } else {
      // If no new image selected, just send the other updated data without the image
      await axios.post("http://localhost:8080/cafmenuupdate", {
        name: updateItemName,
        price: updateItemPrice,
        quantity: updateItemQty,
        category: updateItemCategory,
        image: null, // No image selected
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
      });
  
      alert("Menu item updated.");
      clearAllFields(); // Clear the form after submission
    }
  };
  

  // Handle deleting a menu item
  const handleDeleteMenuItem = async () => {
    try {
      await axios.post("http://localhost:8080/cafmenudelete", {
        name: deleteItemName,
      }, { withCredentials: true });
      alert("Menu item deleted.");
      // Clear all form fields after submission
      clearAllFields();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Clear all text fields across all sections
  const clearAllFields = () => {
    setUserIdentifier("");
    setNewName("");
    setNewPassword("");
    setUsernameForRole("");
    setNewRole("customer");
    setUsernameToDelete("");

    setAddItemName("");
    setAddItemPrice("");
    setAddItemQty(0);
    setAddItemCategory("");
    setAddItemImage(null);

    setUpdateItemName("");
    setUpdateItemPrice("");
    setUpdateItemQty(0);
    setUpdateItemCategory("");
    setUpdateItemImage(null);

    setDeleteItemName("");
    setSearchQuery("");
    setSearchResults([]);
    setSelectedItem(null);
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

          {/* Add Menu Item Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Add Menu Item</h2>
            <input type="text" placeholder="New Item Name" value={addItemName} onChange={e => setAddItemName(e.target.value)} className="input" />
            <input type="text" placeholder="Price" value={addItemPrice} onChange={e => setAddItemPrice(e.target.value)} className="input" />
            <input type="number" placeholder="Quantity" value={addItemQty} onChange={e => setAddItemQty(Number(e.target.value))} className="input" />
            {/* Replace the category input with a dropdown */}
            <select 
              value={addItemCategory} 
              onChange={e => setAddItemCategory(e.target.value)} 
              className="input"
            >
              <option value="">Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
            <input type="file" accept="image/*" onChange={e => { if (e.target.files) setAddItemImage(e.target.files[0]); }} className="input" />
            <button onClick={handleAddMenuItem} className="button-blue">Add Item</button>
          </div>

          {/* Update Menu Item Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Update Menu Item</h2>
            <input type="text" placeholder="Item Name" value={updateItemName} onChange={e => setUpdateItemName(e.target.value)} className="input" />
            <input type="text" placeholder="New Price" value={updateItemPrice} onChange={e => setUpdateItemPrice(e.target.value)} className="input" />
            <input type="number" placeholder="New Quantity" value={updateItemQty} onChange={e => setUpdateItemQty(Number(e.target.value))} className="input" />
            {/* Replace the category input with a dropdown */}
            <select 
              value={addItemCategory} 
              onChange={e => setAddItemCategory(e.target.value)} 
              className="input"
            >
              <option value="">Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
            </select>
            <input type="file" accept="image/*" onChange={e => { if (e.target.files) setUpdateItemImage(e.target.files[0]); }} className="input" />
            <button onClick={handleUpdateMenuItem} className="button-blue">Update Item</button>
          </div>

          {/* Delete Menu Item Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Delete Menu Item</h2>
            <input type="text" placeholder="Item Name" value={deleteItemName} onChange={e => setDeleteItemName(e.target.value)} className="input" />
            <button onClick={handleDeleteMenuItem} className="button-red">Delete Item</button>
          </div>
        </div>
      )}
    </div>
  );
}
