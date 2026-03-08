import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./baseQuery";

interface User {
  id: string;
  email: string;
  name: string;
  role: "driver" | "host";
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (userId) => `/user/${userId}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserByIdQuery } = userApi;