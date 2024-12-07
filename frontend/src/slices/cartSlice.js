import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], shippingAddress: {}, paymentMethod: ""};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            // we don't need user, numReviews, ratings in the cart
            const {user, numReviews, ratings, ...item} = action.payload;
            // check if product already exists in cart
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // Check if the size matches
                const sizeMatch = state.cartItems.find(
                    (x) => x._id === item._id && x.selectedSize === item.selectedSize
                );

                if (sizeMatch) {
                    // Update quantity if size matches
                    state.cartItems = state.cartItems.map((x) =>
                        x._id === item._id && x.selectedSize === item.selectedSize
                            ? item
                            : x
                    );
                } else {
                    // Add as a new item if size doesn't match
                    state.cartItems = [...state.cartItems, item];
                }
            } else {
                // Add as a new item if the product doesn't exist at all
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);


        },

        removeFromCart(state, action) {
            const { _id, selectedSize } = action.payload;
            const existItem = state.cartItems.find((x) => x._id === _id);
            if(existItem) {
                // Filter out the item that needs to be removed
                state.cartItems = state.cartItems.filter((x) => !(x._id === _id && x.selectedSize === selectedSize));
            }
    
            return updateCart(state);

        },

        emptyCart(state, action) {
            state.cartItems = [];
            return updateCart(state);

        },

        updateShippingAddress(state, action) {
            state.shippingAddress = action.payload;
            return updateCart(state);

        },

        updatePaymentMethod(state, action) {
            state.paymentMethod = action.payload;
            return updateCart(state);
        }
        
    }
})

export const {addToCart, removeFromCart, emptyCart, updateShippingAddress, updatePaymentMethod} = cartSlice.actions;
export default cartSlice.reducer;