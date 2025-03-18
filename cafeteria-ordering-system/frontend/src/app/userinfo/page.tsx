
import Link from "next/link";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
  } from "@/components/ui/card";

  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";

export default function UserInfoRoute(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md">
        <form>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">NAME</CardTitle>
              <CardDescription>
                EMAIL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Address</Label>
                
              </div>
              <div className="space-y-2">
                <Label htmlFor="Role">Role</Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <button className="w-full">Edit User Information</button>
            </CardFooter>
          </Card>
        </form>
        </div>
      </div>
    );       

}