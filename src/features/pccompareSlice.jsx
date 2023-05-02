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
    tagTypes: ["Customer", "Account", "Users", "Roles"],
  }),
  
  endpoints: (builder) => ({
    getAllCustomer: builder.query({
      query: () => "customer",
      providesTags: ["Customer"],
    }),
    getAllAccount: builder.query({
      query: () => "account",
      providesTags: ["Account"],
    }),
    getAllUserData: builder.query({
      query: () => "alluserdata",
      providesTags: ["Users"],
    }),
    getAllRoleData: builder.query({
      query: () => "allroledata",
      providesTags: ["Roles"],
    }),
    

    getCurrentCustomer: builder.query({
      query: (Id_customer) => `customer/${Id_customer}`,
      providesTags: ["Users"],
    }),
    updateCustomer: builder.mutation({
      query: ({ Id_customer, pseudo, firstname, lastname, email, last_connection ,createdBy , createdAt }) => ({
        url: `customer/${Id_customer}`,
        method: "PUT",
        body: { Id_customer, pseudo, firstname, lastname, email, last_connection ,createdBy , createdAt },
      }),
      invalidatesTags: ["Users"],
    }),



  }),
});

export const {
  useGetAllCustomerQuery,
  useGetAllAccountQuery,
  useGetAllUserDataQuery,
  useGetAllRoleDataQuery,
  useGetCurrentCustomerQuery,
  useUpdateCustomerMutation,
} = pccompareApi;
