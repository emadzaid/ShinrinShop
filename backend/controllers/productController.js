const Product = require('../models/productModel');
const asyncHandler = require('../middlwares/asyncHandler');


// @description get all women and men category products
// @Method GET /api/collections/
// @Access PUBLIC

const getAllCollections = asyncHandler (async(req,res) => {
   
    const products = await Product.find({});
    if(products) {
        res.status(200).json(products);
    } else {
        res.status(404).json({message: 'Products not found'});
    }
})

// @description get all women category products
// @Method GET /api/collections/women
// @Access PUBLIC

const getWomenCollections =  asyncHandler(async(req,res) => {
    const products = await Product.find({category: 'women'});
    if(products) {
        res.status(200).json(products);
    } else {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
})

// @description get all men category products
// @Method GET /api/collections/men
// @Access PUBLIC

const getMenCollections = asyncHandler (async(req,res) => {
    const products = await Product.find({category: 'men'});
    if(products.length > 0) {
         res.status(200).json(products);
    } else {
        res.status(404).json({message: 'Products not found'});
    }
})

// @description get product by ID
// @Method GET /api/collections/:id
// @Access PUBLIC

const getProductById = asyncHandler (async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
         res.status(200).json(product);
    } else {
        res.status(404).json({message: 'Resource not found'});
    }
})


module.exports = {getAllCollections, getWomenCollections, getMenCollections, getProductById};