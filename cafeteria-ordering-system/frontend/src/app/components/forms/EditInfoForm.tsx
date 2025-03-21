"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import ProfilePictureEditor from "../ProfilePictureEditor";


export function EditInfoForm() {
    return(
        <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-lg mt-10">
            <Card>
                <CardHeader className="space-y-1">
                    {/* <div className="flex justify-center items-center min-h-screen bg-gray-100">
                        <ProfilePictureEditor />
                    </div> */}
                    <CardTitle className="text-3xl font-bold">Edit info</CardTitle>
                    <CardDescription>
                    Enter your details to edit your info
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="text"
                        placeholder="Password"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="password">Phone number</Label>
                    <Input
                        id="phone numbere"
                        name="phone number"
                        type="text"
                        placeholder="Phone number"
                    />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Link href="/user">
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
                        Confirm
                        </button>
                    </Link>
                </CardFooter>
                </Card>
            </div>
        </div>
    );
}