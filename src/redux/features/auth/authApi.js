import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../../api/baseApi";
import { cleanObject } from "@/utils/cleanObject";

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
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
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
