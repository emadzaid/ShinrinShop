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
            })
        }),

        getOrderById: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: 'GET'
            }),
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
        })
    })
})

export const { useCreateOrderMutation, useGetMyOrdersQuery, useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery} = orderApiSlice;
export default orderApiSlice;