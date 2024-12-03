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

        getProductsByCategory: builder.query({
            query: ({category}) => ({
                url: `${PRODUCTS_URL}/${category}`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getProductsByTypeAndCategory: builder.query({
            query: ({category, type}) => ({
                url: `${PRODUCTS_URL}/${category}/${type}`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getProductById: builder.query({
            query: ({category, type, productId}) => ({
                url: `${PRODUCTS_URL}/${category}/${type}/${productId}`,
                method: 'GET',
            })
        }),

        getBestSellingProducts: builder.query({
            query: ({category}) => ({
                url: `${PRODUCTS_URL}/${category}/bestselling`,
                method: 'GET',
            })
        })
    })
});

export const { useGetAllProductsQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery, useGetProductsByTypeAndCategoryQuery, useGetBestSellingProductsQuery } = productApiSlice;
export default productApiSlice;