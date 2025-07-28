import express, { Request, Response, NextFunction } from "express";
import { z } from "zod";

const app = express();

app.use(express.json());

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
});

type ContactData = z.infer<typeof contactSchema>;

const validateRequest = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (result.success) {
            req.body = result.data;
            return next();
        }

        return res.status(400).json({
            error: "Validation failed",
            details: z.treeifyError(result.error),
        });
    };
};

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.post("/contact", validateRequest(contactSchema), (req: Request, res: Response) => {
    const contactData: ContactData = req.body;
    console.log("Received contact data:", contactData);
    res.status(201).json({
        message: "Contact information received successfully",
        data: contactData,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
