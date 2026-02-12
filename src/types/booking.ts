export interface Booking {
  id: string;
  charger_id: string;
  driver_id: string;
  booking_date: string | Date;
  start_time: string;
  end_time: string;
  total_price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string | Date;
  charger?: {
    id: string;
    title: string;
    address: string;
    photo_url: string | null;
    host: {
      id: string;
      name: string;
    };
  };
}

export interface CreateBookingInput {
  charger_id: string;
  driver_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  total_price: number;
}