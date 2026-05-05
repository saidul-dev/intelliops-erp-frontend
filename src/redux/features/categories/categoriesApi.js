import { cleanObject } from "../../../utils/cleanObject";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: (args) => {
                const filteredParams = cleanObject(args);
                return {
                    url: "/categories",
                    method: "GET",
                    params: filteredParams,
                };
            },
            providesTags: [tagTypes.CATEGORIES],
        }),
        storeCategory: builder.mutation({
            query: (payload) => ({
                url: "/categories/store",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: [tagTypes.CATEGORIES],
        }),
        updateCategory: builder.mutation({
            query: (categoryInfo) => ({
                url: "/categories/update",
                method: "PUT",
                body: categoryInfo,
            }),
            invalidatesTags: [tagTypes.CATEGORIES],
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `/categories/delete/${categoryId}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.CATEGORIES],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useStoreCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;
