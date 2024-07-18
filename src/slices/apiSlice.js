// In your userApiSlice.js (or any file where you're using API_SERVER_URL)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_SERVER_URL } from "./apiConfig"; // Adjust the path as per your file structure

// Use API_SERVER_URL in your slice configuration
const USERS_URL = `${API_SERVER_URL}/api/users`;

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
