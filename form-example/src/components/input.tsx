import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                ref={ref}
                className={cn(
                    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors",
                    error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                    "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
            {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
