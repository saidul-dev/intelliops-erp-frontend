import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const siteSettingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSiteSettings: builder.query({
            query: () => {
                return {
                    url: "/site-settings",
                    method: "GET"
                };
            },
            providesTags: [tagTypes.SITESETTINGS],
        }),
        storeSiteSettings: builder.mutation({
            query: (payload) => ({
                url: "/site-settings",
                method: "POST",
                body: payload
            }),
            invalidatesTags: [tagTypes.SITESETTINGS],
        })
    })
});

export const { getSiteSettings, storeSiteSettings } = siteSettingsApi;