import  apiSlice from "./apiSlice";
import { PRODUCTS_URL } from "../Constants";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getWomenProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/women`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getMenProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/men`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'GET',
            })
        })
    })
});

export const { useGetAllProductsQuery, useGetMenProductsQuery, useGetWomenProductsQuery, useGetProductByIdQuery } = productApiSlice;
export default productApiSlice;