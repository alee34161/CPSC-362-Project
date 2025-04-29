"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';
import React, { useState, useEffect } from "react";




export function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "", name: "", phone: "", location: "", role: "", profileImage: "" });
  const [error, setError] = useState("");

    useEffect(() => {
      axios.get('http://localhost:8080/currentuserread', {withCredentials: true})
      .then((response) => {
      	setFormData(response.data);
      	const results = response;
      })      
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
    }, []);

    const handleLogout = async() => {
    	try {
    		const response = await axios.post('http://localhost:8080/logout', {}, {withCredentials: true});
    		router.push("/");
    	}catch(error) {
    		console.error('Error logging out.');
    	}
    }

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
    >
      Logout
    </button>
    
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg mt-10">
        <div className="flex flex-col items-center mb-8">
          <img
            src={formData.profileImage}
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 mb-4 object-cover"
          />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{formData.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{formData.role}</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-800 dark:text-white">
            <span className="font-medium">Email:</span>
            <span className="text-gray-600 dark:text-gray-300">{formData.username}</span>
          </div>
          <div className="flex justify-between text-gray-800 dark:text-white">
            <span className="font-medium">Phone:</span>
            <span className="text-gray-600 dark:text-gray-300">{formData.phone}</span>
          </div>
          <div className="flex justify-between text-gray-800 dark:text-white">
            <span className="font-medium">Location:</span>
            <span className="text-gray-600 dark:text-gray-300">{formData.location}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/edit-info">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
              Edit Profile
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition duration-300">
              Home
            </button>
          </Link>
          <Link href="/meal-subscription">
              <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
                Subscription Plan
              </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
