"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function EditInfoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    phone: ""
  });
  const [error, setError] = useState("");

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const defaultImage =
    "https:media.tenor.com/2abbiMqSkOwAAAAM/charlotte-healing-song.gif";

  useEffect(() => {
    axios
      .get("http://localhost:8080/currentuserread")
      .then((response) => {
        setFormData({
          username: response.data.username || "",
          password: response.data.password || "",
          name: response.data.name || "",
          phone: response.data.phone || ""
        });
        // setProfileImage(response.data.profileImage); // if profileImage is stored
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    setProfileImage(tempImage);
    setTempImage(null);
    // Optionally upload to server here
  };

  const handleCancelImage = () => {
    setTempImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/currentuserupdate",
        {
          username: formData.username,
          password: formData.password,
          name: formData.name,
          phone: formData.phone
          // profileImage: profileImage, // add if needed
        }
      );

      if (response.status === 500) {
        alert("Username already in use or server error");
        router.push("/dashboard");
      } else if (response.status === 200) {
        alert("Update successful!");
        router.push("/user");
      }
    } catch (err) {
      console.error("Error during update:", err);
      if (axios.isAxiosError(err)) {
        setError(
          `Error: ${err.response?.status}, Message: ${
            err.response?.data?.message || err.message
          }`
        );
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
            <CardTitle className="text-3xl font-bold">Edit Info</CardTitle>
            <CardDescription>Update your details and profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Picture Editor */}
            <div className="flex flex-col items-center space-y-2 mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="profile-upload"
                className="hidden"
              />
              <label htmlFor="profile-upload" className="cursor-pointer">
                <img
                  src={tempImage || profileImage || defaultImage}
                  alt="Profile Preview"
                  className="w-28 h-28 rounded-full border-4 border-gray-200 dark:border-gray-600 object-cover"
                />
              </label>
              {tempImage && (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveImage}
                    className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelImage}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Text Fields */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name || ""}
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
                  value={formData.username || ""}
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
                  value={formData.password || ""}
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
                  value={formData.phone || ""}
                  onChange={handleChange}
                />
              </div>
              <CardFooter className="flex flex-col mt-4">
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
