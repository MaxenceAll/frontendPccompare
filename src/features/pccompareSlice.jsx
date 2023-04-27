import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";

export const pccompareApi = createApi({
  reducerPath: "pccompareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.url,
    prepareHeaders: (headers) => {
      // Set the Authorization header with your API authorization
      //   headers.set("Authorization", config.api.authorization);
      // Set the Content-Type header to "application/json"
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
    tagTypes: ["Customer"],
  }),
  endpoints: (builder) => ({

    getAllCustomer: builder.query({
      query: () => "customer",
      providesTags: ["Customer"],
    }),



  }),
});

export const {useGetAllCustomerQuery} = pccompareApi;
