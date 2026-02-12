import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Booking, CreateBookingInput } from "@/types/booking";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Booking", "BookingList"],
  
  endpoints: (builder) => ({
    // Get bookings for driver
    getDriverBookings: builder.query<Booking[], string>({
      query: (driverId) => `/bookings?driverId=${driverId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Booking" as const, id })),
              { type: "BookingList", id: "DRIVER" },
            ]
          : [{ type: "BookingList", id: "DRIVER" }],
    }),

    // Get single booking
    getBookingById: builder.query<Booking, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: (result, error, id) => [{ type: "Booking", id }],
    }),

    // Create booking
    createBooking: builder.mutation<{ success: boolean; booking: Booking }, CreateBookingInput>({
      query: (body) => ({
        url: "/bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "BookingList", id: "DRIVER" }],
    }),

    // Cancel booking
    cancelBooking: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: { status: "cancelled" },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Booking", id },
        { type: "BookingList", id: "DRIVER" },
      ],
    }),
  }),
});

export const {
  useGetDriverBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
} = bookingApi;