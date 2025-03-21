import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crop, UploadCloud, Save } from "lucide-react";

export default function ProfilePictureEditor() {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle File Selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    // Open File Picker
    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-6">
            <Card className="w-64 h-64 flex items-center justify-center border rounded-2xl overflow-hidden shadow-md">
                {image ? (
                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <p className="text-gray-500">No image selected</p>
                )}
            </Card>

            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef} 
                className="hidden"
            />

            <div className="flex space-x-3">
                <Button onClick={triggerFileUpload} variant="outline">
                    <UploadCloud className="mr-2 w-5 h-5" /> Upload
                </Button>
                <Button variant="ghost" disabled={!image}>
                    <Crop className="mr-2 w-5 h-5" /> Edit
                </Button>
                <Button variant="default" disabled={!image}>
                    <Save className="mr-2 w-5 h-5" /> Save
                </Button>
            </div>
        </div>
    );
}
