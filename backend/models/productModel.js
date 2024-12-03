const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: [String],
        default: [],
    },

    category: {
        type: String,
        enum: ['men', 'women'],
        required: true,
    },

    type: {
        type: String,
        required: true,
        lowercase: true,
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }, 

    ratings: {
        type: Number,
        required: true,
        default: 0.0,

    },

    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },

    size: {
        type: [String],
        default: [],
    },

    material: {
        type: String,
    },

    BestSelling: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;