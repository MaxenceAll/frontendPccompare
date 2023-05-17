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
    tagTypes: ["Customer", "Account", "Users", "Roles", "Category", "Product", "Comments", "Favorite"],
  }),

  endpoints: (builder) => ({
    // DASHBOARD ADMIN ENDPOINTS logic:
    getAllUserData: builder.query({
      query: () => "alluserdata",
      providesTags: ["Users"],
    }),
    getAllRoleData: builder.query({
      query: () => "allroledata",
      providesTags: ["Roles"],
    }),

    // CUSTOMER ENDPOINTS LOGIC:
    getCurrentCustomer: builder.query({
      // On check si l'argument est defined ou pas avant d'envoyer la requete
      query: (Id_customer) => {
        if (Id_customer) {
          return `customer/${Id_customer}`;
        } else {
          return {}; // TODO tester if null better
        }
      },
      providesTags: ["Users"],
    }),
    updateCustomer: builder.mutation({
      query: ({
        Id_customer,
        pseudo,
        firstname,
        lastname,
        email,
        last_connection,
        createdBy,
        createdAt,
        img_src,
      }) => ({
        url: `customer/${Id_customer}`,
        method: "PUT",
        body: {
          Id_customer,
          pseudo,
          firstname,
          lastname,
          email,
          last_connection,
          createdBy,
          createdAt,
          img_src,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    // DROPDOWN MENU logic :
    getAllCategoryData: builder.query({
      query: () => "dropdownmenu",
      providesTags: ["Category"],
    }),

    // COMPARE DATA logic :
    getAllGpuData: builder.query({
      query: (cat) => `compare/${cat}`,
      providesTags: ["gpu"],
    }),
    // COMPARE DATA logic :
    getAllCpuData: builder.query({
      query: (cat) => `compare/${cat}`,
      providesTags: ["cpu"],
    }),
    // COMPARE DATA logic :
    getAllMbData: builder.query({
      query: (cat) => `compare/${cat}`,
      providesTags: ["mb"],
    }),
    // COMPARE DATA logic :
    getAllRamData: builder.query({
      query: (cat) => `compare/${cat}`,
      providesTags: ["ram"],
    }),



    // PRODUCT DETAILED VIEW logic :
    // get all product data based on article id and category
    getProductDetails: builder.query(
      {
      query: (Obj) => {
        // console.log(Obj)
        return `compare/product/${Obj.Category_to_find}/${Obj.Id_article_to_find}`
      },
      providesTags: ["Product"],
    }),
    // get seller_historique_article corresponding table based on article id:
    getSHADetails: builder.query({
      query: (id) => `compare/sha/${id}`,
      providesTags: ["Product"],
    }),
    // get historique price corresponding table based on article id:
    getHistoriqueDetails: builder.query({
      query: (id) => `compare/historique/${id}`,
      providesTags: ["Product"],
    }),
    // get sellers corresponding table based on article id:
    getSellerDetails: builder.query({
      query: (id) => `compare/seller/${id}`,
      providesTags: ["Product"],
    }),
    // get comments with given Id_article :
    getComments: builder.query({
      query: (id) => `compare/comments/${id}`,
      providesTags: ["Comments"],
    }),
    // get avatar with given Id_comment :
    getAvatarComment: builder.query({
      query: (id) => `compare/comments/avatar/${id}`,
      providesTags: ["Comments"],
    }),

    // FAVORITES LOGIC :
    // check if its a favorite :
    getFavoriteStatus: builder.query(
      {
      query: (Obj) => {
        return `favorite/${Obj.Id_customer_to_find}/${Obj.Id_article_to_find}`
      },
      providesTags: ["Favorite"],
    }),
    // get all favorite given Id_customer :
    getAllFavoriteByIdCustomer: builder.query({
      query: (id) => `favorite/${id}`,
      providesTags: ["Favorite"],
    }),
    // Remove a favorite given a Id_customer and Id_article :
    removeFavorite: builder.mutation({
      query: ({ Id_customer_to_find, Id_article_to_find }) => ({
        url: `favorite/${Id_customer_to_find}`,
        method: "DELETE",
        body: { Id_article_to_find },
      }),
      invalidatesTags: ["Favorite"],
    }),
    // Add a favorite given a Id_customer and Id_article :
    addFavorite: builder.mutation({
      query: ({ Id_customer_to_find, Id_article_to_find }) => ({
        url: `favorite/${Id_customer_to_find}`,
        method: "PUT",
        body: { Id_article_to_find },
      }),
      invalidatesTags: ["Favorite"],
    }),
    
  }),
});

export const {
  useGetAllUserDataQuery,
  useGetAllRoleDataQuery,
  useGetCurrentCustomerQuery,
  useUpdateCustomerMutation,
  //
  useGetAllCategoryDataQuery,
  //
  useGetAllGpuDataQuery,
  useGetAllCpuDataQuery,
  useGetAllMbDataQuery,
  useGetAllRamDataQuery,
  //
  useGetProductDetailsQuery,
  useGetSHADetailsQuery,
  useGetHistoriqueDetailsQuery,
  useGetSellerDetailsQuery,
  //
  useGetCommentsQuery,
  useGetAvatarCommentQuery,

  //
  useGetFavoriteStatusQuery,
  useGetAllFavoriteByIdCustomerQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,

} = pccompareApi;
