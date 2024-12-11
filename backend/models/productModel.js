const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      title: {type: String, required: true},
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
  );

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
        enum: ['men', 'women'], // Specifies allowed values
        required: true,
        lowercase: true,
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

    reviews: [reviewSchema],
    
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

    bestSelling: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;