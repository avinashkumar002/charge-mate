import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Booking, CreateBookingInput } from "@/types/booking";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Booking", "BookingList", "HostBookingList"],

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

    // Get bookings for host
    getHostBookings: builder.query<Booking[], string>({
      query: (hostId) => `/bookings/host?hostId=${hostId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Booking" as const, id })),
              { type: "HostBookingList", id: "HOST" },
            ]
          : [{ type: "HostBookingList", id: "HOST" }],
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
      invalidatesTags: [
        { type: "BookingList", id: "DRIVER" },
        { type: "HostBookingList", id: "HOST" },
      ],
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
        { type: "HostBookingList", id: "HOST" },
      ],
    }),

    // Accept booking (host)
    acceptBooking: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: { status: "confirmed" },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Booking", id },
        { type: "HostBookingList", id: "HOST" },
        { type: "BookingList", id: "DRIVER" },
      ],
    }),

    // Reject booking (host)
    rejectBooking: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: { status: "cancelled" },
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Booking", id },
        { type: "HostBookingList", id: "HOST" },
        { type: "BookingList", id: "DRIVER" },
      ],
    }),
  }),
});

export const {
  useGetDriverBookingsQuery,
  useGetHostBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
  useAcceptBookingMutation,
  useRejectBookingMutation,
} = bookingApi;