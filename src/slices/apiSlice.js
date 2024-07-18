const API_SERVER_URL = 'https://finalapi-puce.vercel.app/'; // Replace with your API server URL

const USERS_URL = `${API_SERVER_URL}/api/users`;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
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
