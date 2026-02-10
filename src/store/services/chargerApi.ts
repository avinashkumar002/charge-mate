import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Charger, ChargerSearchParams, ChargerListResponse } from "@/types/charger";

export const chargerApi = createApi({
  reducerPath: "chargerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Charger", "ChargerList"],
  
  endpoints: (builder) => ({
    // Get all chargers (for drivers to browse)
    getAllChargers: builder.query<Charger[], void>({
      query: () => "/chargers/all",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Charger" as const, id })),
              { type: "ChargerList", id: "LIST" },
            ]
          : [{ type: "ChargerList", id: "LIST" }],
    }),

    // Get single charger by ID
    getChargerById: builder.query<Charger, string>({
      query: (id) => `/chargers/${id}`,
      providesTags: (result, error, id) => [{ type: "Charger", id }],
    }),

    // Search chargers with filters
    searchChargers: builder.query<Charger[], ChargerSearchParams>({
      query: (params) => ({
        url: "/chargers/search",
        params: {
          ...(params.pincode && { pincode: params.pincode }),
          ...(params.charger_type && { charger_type: params.charger_type }),
          ...(params.min_price && { min_price: params.min_price }),
          ...(params.max_price && { max_price: params.max_price }),
          ...(params.min_power && { min_power: params.min_power }),
        },
      }),
      providesTags: [{ type: "ChargerList", id: "SEARCH" }],
      // Keep data fresh for 5 minutes
      keepUnusedDataFor: 300,
    }),

    // Get chargers by host (already exists, for host dashboard)
    getChargersByHost: builder.query<Charger[], string>({
      query: (hostId) => `/chargers?hostId=${hostId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Charger" as const, id })),
              { type: "ChargerList", id: "HOST" },
            ]
          : [{ type: "ChargerList", id: "HOST" }],
    }),

    // Create charger (for host)
    createCharger: builder.mutation<Charger, Partial<Charger>>({
      query: (body) => ({
        url: "/chargers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ChargerList", id: "HOST" }],
    }),

    // Update charger (for host)
    updateCharger: builder.mutation<Charger, { id: string; data: Partial<Charger> }>({
      query: ({ id, data }) => ({
        url: `/chargers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Charger", id },
        { type: "ChargerList", id: "HOST" },
      ],
    }),

    // Delete charger (for host)
    deleteCharger: builder.mutation<void, string>({
      query: (id) => ({
        url: `/chargers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Charger", id },
        { type: "ChargerList", id: "HOST" },
      ],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetAllChargersQuery,
  useGetChargerByIdQuery,
  useSearchChargersQuery,
  useGetChargersByHostQuery,
  useCreateChargerMutation,
  useUpdateChargerMutation,
  useDeleteChargerMutation,
} = chargerApi;