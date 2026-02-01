import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().max(10, "Phone number should not be more than 10 digits").optional(),
  role: z.string().nullable().refine((val) => val !== null && val.length > 0, {
    message: "Please select a user type"
  })
});

export type ContactFormValues = z.infer<typeof contactSchema>;