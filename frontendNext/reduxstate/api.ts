import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_BACK_URL }),
    reducerPath : 'api',
    tagTypes : [],
    endpoints: (build) => ({}),
})

export const {} = api;