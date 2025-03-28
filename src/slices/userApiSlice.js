import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";
import { toast } from "react-toastify";


const USERS_URL = "https://finalapi-puce.vercel.app/api/users";

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
    contact: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/contact`,
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
        body: { email, otp},
      }),
    }),
    updatePWD: builder.mutation({
      query: ({email, newPassword }) => ({
        url: `${USERS_URL}/updatePWD`,
        method: 'POST',
        body: { email, newPassword},
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
          if(queryFulfilled){
            toast.success("Logout Sucess, See you Again :)");
          };
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
         
        } catch (error) {
          console.log(error);
          toast.error("Server Error...")
          
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
  useContactMutation,
} = userApiSlice;
