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
            image: {type: [String], default: [], }, // images
            qty: { type: Number, required: true }, // Quantity ordered
            price: { type: Number, required: true }, // Price of the item
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
            selectedSize: { type: [String], default: []}, 
        },
    ],

    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },

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

    status: {
        type: String,
        enum: ['Pending Payment', 'Order Confirmed', 'Order Processed', 'Shipped', 'Delivered'],
        default: function () {
            return !this.isPaid && this.paymentMethod === 'PayPal' ? 'Pending Payment' : 'Order Confirmed';
        },
        required: true,
    },
    
    deliveredAt: {
        type: Date, // Date and time when the order was delivered
    },

}, { timestamps: true });

orderSchema.pre('save', function (next) {
    if (this.isPaid && this.status === 'Pending Payment') {
        this.status = 'Order Confirmed';
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);
