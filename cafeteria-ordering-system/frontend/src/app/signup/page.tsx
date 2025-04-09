"use client";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Send POST request to backend using axios
    axios
      .post('http://localhost:8080/register', {
        username: formData.email, // Match API's expected field (username = email)
        password: formData.password,
        role: 'customer'
      })
      .then((response) => {
        // If successful, show a success message
        alert("Account created for " + formData.email);

        // Redirect to home page
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("Registration failed!"); // Show error if registration fails
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 w-full rounded-md">
            Create Account
          </button>
        </form>
        {/* ✅ Back to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
