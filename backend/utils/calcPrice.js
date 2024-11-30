// Helper function to round numbers to 2 decimal places
const addDecimal = (num) => {
    return Number(num.toFixed(2)); // Ensures the result is a number with 2 decimals
};

// Function to calculate prices based on items
const calcPrice = (items) => {
    // Calculate the total price of items
    const itemsPrice = addDecimal(
        items.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    // Calculate shipping price
    const shippingPrice = itemsPrice >= 500 ? 0 : 100;

    // Calculate total price (items price + shipping)
    const totalPrice = addDecimal(itemsPrice + shippingPrice);

    // Return an object with all calculated prices
    return {
        itemsPrice,
        shippingPrice,
        totalPrice,
    };
};

module.exports = {calcPrice};
