import  apiSlice from "./apiSlice";
import { PRODUCTS_URL, UPLOADS_URL } from "../Constants";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getWomenCollection: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/women`,
                method: 'GET',
            }), keepUnusedDataFor: 5,
        }),

        getMenCollection: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/men`,
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


        getProductByIdOnly: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'GET',
            })
        }),


        getBestSellingProducts: builder.query({
            query: ({category}) => ({
                url: `${PRODUCTS_URL}/${category}/bestselling`,
                method: 'GET',
            })
        }),

        addNewProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
            })
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            })
        }),

        uploadFile: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: 'POST',
                body: data,
            })
        }),
    })
});

export const { useGetAllProductsQuery, useGetWomenCollectionQuery, useGetMenCollectionQuery, useGetProductByIdQuery, useGetProductsByTypeAndCategoryQuery, useGetBestSellingProductsQuery, useAddNewProductMutation, useGetProductByIdOnlyQuery, useUpdateProductMutation, useUploadFileMutation} = productApiSlice;
export default productApiSlice;