"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {  // Make it async
    e.preventDefault();
    try {
      // Use await to ensure the request completes before moving forward
      const response = await axios.post('http://localhost:8080/login', {
        username: formData.email,
        password: formData.password,
      }, { withCredentials: true });
  
      if (response.status === 201) {
        alert("Login successful!");
        router.push("/dashboard"); // Redirect after login
      } else if (response.status === 202) {
      	alert("Login successful!");
      	router.push("/cafeteria");
      } else if (response.status === 203) {
      	alert("Login successful!");
      	router.push("/delivery");
      } else if (response.status === 204) {
      	alert("Login successful!");
      	router.push("/admin");
      } else if (response.status === 400 || response.status === 401) {
        setError("Invalid login credentials");
      }
    } catch (err) {
      console.error("Error during login:", err); // Log the error object to the console
      if (axios.isAxiosError(err)) {
        // If it's an axios error, log the details
        setError(`Invalid Credentials. Status: ${err.response?.status}, Message: ${err.response?.data?.message || err.message}`);
      } else {
        // If it's another type of error, log a generic message
        setError("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full rounded-md">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <Link href="/forgot-password">
            <p className="text-blue-500 cursor-pointer">Forgot Password?</p>
          </Link>
          <p className="mt-2">Don't have an account?</p>
          <Link href="/signup">
            <p className="text-blue-500 cursor-pointer">Sign Up</p>
          </Link>
          {/* ✅ Back to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="mt-4 text-gray-600 hover:text-gray-800"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
