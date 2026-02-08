import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "driver" | "host";
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (userId) => `/user/${userId}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;