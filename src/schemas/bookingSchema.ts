import { z } from "zod";

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const bookingSchema = z.object({
  charger_id: z.string().min(1, "Charger is required"),
  booking_date: z.string().min(1, "Date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
}).refine(
  (data) => {
    // Validate end time is after start time
    const start = parseInt(data.start_time.replace(":", ""));
    const end = parseInt(data.end_time.replace(":", ""));
    return end > start;
  },
  {
    message: "End time must be after start time",
    path: ["end_time"],
  }
);

export type BookingFormValues = z.infer<typeof bookingSchema>;

// Calculate total price
export function calculateBookingPrice(
  startTime: string,
  endTime: string,
  pricePerHour: number
): number {
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
  const hours = endHour - startHour;
  return hours * pricePerHour;
}

// Generate time slots between available hours
export function generateTimeSlots(
  availableStart: string,
  availableEnd: string
): string[] {
  const slots: string[] = [];
  const startHour = parseInt(availableStart.split(":")[0]);
  const endHour = parseInt(availableEnd.split(":")[0]);

  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  return slots;
}