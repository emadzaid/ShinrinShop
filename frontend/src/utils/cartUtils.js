const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };


export const updateCart = (state) => {

    // calculate items price 
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + (item.qty * item.price ), 0));

    // calculate shipping price (free shipping for orders 500 and above else $100)
    state.shippingPrice = addDecimals((state.itemsPrice < 500 && state.cartItems.length > 0) ? 100 : 0);

    // calculating total price 
    state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);


    // update local storage
    localStorage.setItem('cart', JSON.stringify(state));

    return state;

}

