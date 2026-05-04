// import { cleanObject } from "@/utils/cleanObject";

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.USER_INFO],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
