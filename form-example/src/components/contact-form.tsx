import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./input";
import { Button } from "./button";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be less than 50 characters"),
    email: z.email("Please enter a valid email address"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Form Data:", data);

        reset();
        alert("Form submitted successfully! Check console for data.");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Information</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                    {...register("name")}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    error={errors.phone?.message}
                    helperText="Include country code for international numbers"
                    {...register("phone")}
                />

                <Button type="submit" loading={isSubmitting} className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
}
