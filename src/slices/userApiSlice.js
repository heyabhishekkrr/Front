





// In your userApiSlice.js (or any file where you're using API_SERVER_URL)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_SERVER_URL } from "./apiConfig"; // Adjust the path as per your file structure

// Use API_SERVER_URL in your slice configuration
const USERS_URL = ${API_SERVER_URL}/api/users;

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
    //   query: (userId) => /users/${userId},
    // }),
  }),
});




import { apiSlice } from "./apiSlice";  // Assuming apiSlice is exported correctly from apiSlice.js
import { logout } from "./authSlice";  // Assuming authSlice is correctly imported
import { toast } from "react-toastify";  // Assuming react-toastify is correctly imported
import { API_SERVER_URL } from "./apiConfig";  // Import API_SERVER_URL from apiConfig.js

// Define the base URL for user-related API endpoints
const USERS_URL = ${API_SERVER_URL}/api/users;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: ${USERS_URL}/auth,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: ${USERS_URL}/register,
        method: "POST",
        body: data,
      }),
    }),
    sendOTP: builder.mutation({
      query: ({ email }) => ({
        url: ${USERS_URL}/sendOTP,
        method: 'POST',
        body: { email },
      }),
    }),
    verifyOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: ${USERS_URL}/verifyOTP,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    updatePWD: builder.mutation({
      query: ({ email, newPassword }) => ({
        url: ${USERS_URL}/updatePWD,
        method: 'POST',
        body: { email, newPassword },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: ${USERS_URL}/logout,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (queryFulfilled) {
            toast.success("Logout Success, See you Again :)");
          }
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error("Error during logout:", error);
          toast.error("Server Error...");
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: ${USERS_URL}/profile,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendLogoutMutation,
  useUpdateProfileMutation,
  useVerifyOTPMutation,
  useSendOTPMutation,
  useUpdatePWDMutation,
} = userApiSlice;
ChatGPT
The code looks mostly correct, but here are a few points to check:

Import Paths: Ensure the import paths for apiConfig.js, apiSlice.js, and authSlice.js are correct.
Error Handling: Enhance error handling in your mutations to catch and handle potential issues.
Endpoint Definitions: Ensure the backend endpoints (/auth, /register, etc.) are correctly defined and accessible.
Here's a slightly revised version with added comments:

javascript
Copy code
// apiConfig.js
export const API_SERVER_URL = 'https://finalapi-puce.vercel.app';

// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_SERVER_URL } from "./apiConfig"; // Adjust path

const USERS_URL = `${API_SERVER_URL}/api/users`;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_SERVER_URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Define endpoints here
  }),
});

// userApiSlice.js
import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";
import { toast } from "react-toastify";
import { API_SERVER_URL } from "./apiConfig";

const USERS_URL = `${API_SERVER_URL}/api/users`;

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    sendOTP: builder.mutation({
      query: ({ email }) => ({
        url: `${USERS_URL}/sendOTP`,
        method: 'POST',
        body: { email },
      }),
    }),
    verifyOTP: builder.mutation({
      query: ({ email, otp }) => ({
        url: `${USERS_URL}/verifyOTP`,
        method: 'POST',
        body: { email, otp },
      }),
    }),
    updatePWD: builder.mutation({
      query: ({ email, newPassword }) => ({
        url: `${USERS_URL}/updatePWD`,
        method: 'POST',
        body: { email, newPassword },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Logout Success, See you Again :)");
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.error("Error during logout:", error);
          toast.error("Server Error...");
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendLogoutMutation,
  useUpdateProfileMutation,
  useVerifyOTPMutation,
  useSendOTPMutation,
  useUpdatePWDMutation,
} = userApiSlice;
