"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export function EditInfoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "", name: "", phone: "" });    
  const [error, setError] = useState("");
        useEffect(() => {
      axios.get('http://localhost:8080/currentuserread')
      .then((response) => {
      	setFormData(response.data);
      	const results = response[0];
      })      
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
    }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/currentuserupdate', {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      });
      alert("Update successful!");  // Fixed alert call
      router.push("/user");  // Navigate to user page upon successful submission
    } catch (err) {
      console.error("Error during update:", err);
      if (axios.isAxiosError(err)) {
        setError(`Error: ${err.response?.status}, Message: ${err.response?.data?.message || err.message}`);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg mt-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Edit info</CardTitle>
            <CardDescription>Enter your details to edit your info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}  // Bind form state to input
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Email"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <CardFooter className="flex flex-col">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Confirm
                </button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
