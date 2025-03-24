import { cn } from "@/lib/utils"; // Utility for conditional classNames (optional)
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition";
    
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-400 text-gray-700 hover:bg-gray-200",
        ghost: "text-gray-600 hover:bg-gray-100"
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props} />
    );
}
