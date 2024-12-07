const Product = require('../models/productModel');
const asyncHandler = require('../middlwares/asyncHandler');


// @description get all women and men category products
// @Method GET /api/collections/
// @Access PUBLIC

const getAllCollections = asyncHandler (async(req,res) => {
   
    const products = await Product.find( {});
    if(products) {
        res.status(200).json(products);
    } else {
        res.status(404).json({message: 'Products not found'});
    }
})


// @description get products by category (either men or women)
// @Method GET /api/collections/:category
// @Access PUBLIC

const getCollectionByCategory= asyncHandler(async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({category });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found in this category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// @description Get women products by category and type
// @Method GET /api/collections/:category/:type
// @Access PUBLIC

const getProductsByCategoryAndType= asyncHandler(async (req, res) => {
    const { category, type } = req.params;
    console.log(category, type)

    try {
        const products = await Product.find({ category, type });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found in this type' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});


// @description get product by ID
// @Method GET /api/collections/:id
// @Access PUBLIC

const getProductById = asyncHandler (async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
         res.status(200).json(product);
    } else {
        res.status(404);
        throw new Error('Products Not Found');
    }
})

// @description get best selling products
// @Method GET /api/collections/:category/bestselling
// @Access PUBLIC

const getBestSellingProducts = asyncHandler (async(req,res) => {
    const { category } = req.params;
    const products = await Product.find({category, BestSelling: true});
    if(products.length > 0) {
         res.status(200).json(products);
    } else {
        res.status(404);
        throw new Error('No Best Selling Products');
    }
})





module.exports = {getAllCollections, getProductsByCategoryAndType, getCollectionByCategory, getProductById, getBestSellingProducts};