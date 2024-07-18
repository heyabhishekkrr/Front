// Import necessary functions from the toolkit/query package
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define your API server URL and endpoint paths
const API_SERVER_URL = 'https://finalapi-puce.vercel.app';
const USERS_URL = `${API_SERVER_URL}/api/users`;

// Create your apiSlice using createApi
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    // Optionally, you can add other default headers, credentials, etc. here
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Define your endpoints here
    // Example:
    // getUserById: builder.query({
    //   query: (userId) => `/users/${userId}`,
    // }),
  }),
});
