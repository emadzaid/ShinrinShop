const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },

    orderItems: [
        {
            name: { type: String, required: true }, // Name of the product
            image: {type: [String], default: [], },
        
            qty: { type: Number, required: true }, // Quantity ordered
            price: { type: Number, required: true }, // Price of the item
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
        },
    ],

    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },

    },

    paymentMethod: {
        type: String,
        required: true, // E.g., 'PayPal', 'Credit Card'
    },

    paymentResult: {
        id: { type: String }, // Transaction ID
        status: { type: String }, // Payment status
        update_time: { type: String }, // Time of payment
        email_address: { type: String }, // Payer's email
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0, // Total price of items
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0, // Shipping cost
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0.0, // Final total
    },

    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },

    paidAt: {
        type: Date, // Date and time when the order was paid
    },

    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },

    deliveredAt: {
        type: Date, // Date and time when the order was delivered
    },

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
