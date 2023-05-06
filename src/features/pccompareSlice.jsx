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


    getAllUserData: builder.query({
      query: () => "alluserdata",
      providesTags: ["Users"],
    }),
    getAllRoleData: builder.query({
      query: () => "allroledata",
      providesTags: ["Roles"],
    }),
    

    getCurrentCustomer: builder.query({
      // On check si l'argument est defined ou pas avant d'envoyer la requete
      query: (Id_customer) => {
        if (Id_customer) {
          return `customer/${Id_customer}`;
        } else {
          return {}; // test if null better
        }
      },
      providesTags: ["Users"],
    }),
    updateCustomer: builder.mutation({
      query: ({ Id_customer, pseudo, firstname, lastname, email, last_connection ,createdBy , createdAt , img_src}) => ({
        url: `customer/${Id_customer}`,
        method: "PUT",
        body: { Id_customer, pseudo, firstname, lastname, email, last_connection ,createdBy , createdAt, img_src },
      }),
      invalidatesTags: ["Users"],
    }),



  }),
});

export const {
  useGetAllUserDataQuery,
  useGetAllRoleDataQuery,
  useGetCurrentCustomerQuery,
  useUpdateCustomerMutation,
} = pccompareApi;
