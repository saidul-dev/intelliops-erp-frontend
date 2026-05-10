import { cleanObject } from "../../../utils/cleanObject";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (args) => {
                const filteredParams = cleanObject(args);
                return {
                    url: "/users",
                    method: "GET",
                    params: filteredParams,
                };
            },
            providesTags: [tagTypes.USERS],
        }),
        storeUser: builder.mutation({
            query: (payload) => ({
                url: "/users",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: [tagTypes.USERS],
        }),
        showUser: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.USERS],
        }),
        updateUser: builder.mutation({
            query: (userInfo) => ({
                url: "/users/update",
                method: "PUT",
                body: userInfo,
            }),
            invalidatesTags: [tagTypes.USERS],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.USERS],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useStoreUserMutation,
    useShowUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;
