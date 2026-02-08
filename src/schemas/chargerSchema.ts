import { z } from "zod";

// Charger types available in India
export const CHARGER_TYPES = [
    { value: "type2", label: "Type 2 (AC)" },
    { value: "ccs", label: "CCS (DC Fast)" },
    { value: "chademo", label: "CHAdeMO (DC)" },
    { value: "gbct", label: "GB/T (DC)" },
    { value: "wall", label: "Wall Socket (Slow)" },
] as const;

// Power output options in kW
export const POWER_OUTPUTS = [
    { value: 3.3, label: "3.3 kW (Slow)" },
    { value: 7.4, label: "7.4 kW (Home)" },
    { value: 22, label: "22 kW (Fast AC)" },
    { value: 50, label: "50 kW (DC Fast)" },
    { value: 150, label: "150 kW (Ultra Fast)" },
] as const;

// Time slots for availability
export const TIME_SLOTS = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
] as const;

export const chargerSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    address: z
        .string()
        .min(10, "Address must be at least 10 characters")
        .max(200, "Address must be less than 200 characters"),

    pincode: z
        .string()
        .length(6, "Pincode must be 6 digits")
        .regex(/^\d{6}$/, "Pincode must contain only numbers"),

    price_per_hour: z
        .number()
        .min(10, "Minimum price is ₹10/hour")
        .max(500, "Maximum price is ₹500/hour"),

    charger_type: z.string().refine((val) => ["type2", "ccs", "chademo", "gbct", "wall"].includes(val), {
        message: "Please select a charger type"
    }),

    power_output: z
        .number()
        .min(1, "Minimum power is 1 kW")
        .max(350, "Maximum power is 350 kW"),

    available_start: z.string().min(1, "Select start time"),

    available_end: z.string().min(1, "Select end time"),

    photo_url: z.string().optional(),
}).refine(
    (data) => {
        const startIndex = TIME_SLOTS.indexOf(data.available_start as typeof TIME_SLOTS[number]);
        const endIndex = TIME_SLOTS.indexOf(data.available_end as typeof TIME_SLOTS[number]);
        return endIndex > startIndex;
    },
    {
        message: "End time must be after start time",
        path: ["available_end"],
    }
);

export type ChargerFormValues = z.infer<typeof chargerSchema>;