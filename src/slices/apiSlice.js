import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // The reducer path for your API state slice

    baseUrl: "https://finalapi-puce.vercel.app/", // Replace with your API base URL
    // You can also add headers, credentials, or other fetch options here if needed
  
 

  tagTypes: ["User"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
