import { cleanObject } from "@/utils/cleanObject";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

const rolesAndPermissions = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (payload) => ({
        url: "/master-admin/admins",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [tagTypes.NEW_ADMIN],
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        const filteredParams = cleanObject(args);
        return {
          url: "/master-admin/admins",
          method: "GET",
          params: filteredParams,
        };
      },
      providesTags: [tagTypes.NEW_ADMIN],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/master-admin/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.NEW_ADMIN],
    }),
    getAllPersmissions: builder.query({
      query: () => ({
        url: "/master-admin/permissions",
        method: "GET",
      }),
      providesTags: [tagTypes.ROLE_PERMISSIONS],
    }),
    updateUserPermissions: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/master-admin/admins/${id}/permissions`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [tagTypes.ROLE_PERMISSIONS, tagTypes.NEW_ADMIN],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
  useGetAllPersmissionsQuery,
  useUpdateUserPermissionsMutation,
} = rolesAndPermissions;
