import  apiSlice from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../Constants";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),

        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
                method: 'GET'
            }), keepUnusedDataFor: 5,
        }),

        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: 'GET'
            }), 
        }),

        getAllOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
                method: 'GET'
            }), keepUnusedDataFor: 5,
        }),

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details},

            })
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: `${PAYPAL_URL}`,
                method: 'GET',
            })
        }),

        updateStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `${ORDERS_URL}/${id}/status`,
                method: 'PUT',
                body: {id, status},
            })
        })

    })
})

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetAllOrdersQuery, useUpdateStatusMutation} = orderApiSlice;
export default orderApiSlice;