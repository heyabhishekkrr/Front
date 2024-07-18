import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SERVER_URL = 'https://finalapi-puce.vercel.app'; // Use a different variable name

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    // Optionally, you can add other default headers, credentials, etc. here
  }),
  tagTypes: ["User"],
  // Define your endpoints here
  endpoints: (builder) => ({
    // Add your endpoints as needed
    // Example:
    // getUserById: builder.query({
    //   query: (userId) => `/users/${userId}`,
    // }),
  }),
});


