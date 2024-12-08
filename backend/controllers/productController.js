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


// @description get women collection
// @Method GET /api/collections/women
// @Access PUBLIC

const getWomenCollection = asyncHandler(async (req, res) => {
  
    try {
        const products = await Product.find({category:'women' });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found in this category' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @description get men collection
// @Method GET /api/collections/men
// @Access PUBLIC

const getMenCollection = asyncHandler(async (req, res) => {
  
    try {
        const products = await Product.find({category:'men' });

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
    const products = await Product.find({category, bestSelling: true});
    if(products.length > 0) {
         res.status(200).json(products);
    } else {
        res.status(404);
        throw new Error('No Best Selling Products');
    }
})


// @description Add new product
// @Method POST /api/collections/
// @Access PRIVATE/ADMIN

const createProduct = asyncHandler (async(req,res) => {

    const product = await Product.create ({
        user: req.user._id ,
        name: 'Sample Product',
        description: 'Sample Description',
        category: 'men',
        type: 'Sample Type',
        price: 0,
        countInStock: 0,
        image: ['/images/sample.jpg'],
        size: [],
        material: 'Sample Materital',
        bestSelling: false,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

})

// @description Edit product
// @Method PUT /api/collections/:id
// @Access PRIVATE/ADMIN

const updateProduct = asyncHandler (async(req,res) => {

    const {name, description, category, type, price, countInStock, material, size, image, bestSelling} = req.body;

    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404);
        throw new Error('Product Not Found');
    }

    product.name = name;
    product.description = description;
    product.category = category;
    product.type = type;
    product.price = price;
    product.countInStock = countInStock
    product.material = material;
    product.size = size;
    product.image = image;
    product.bestSelling = bestSelling;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);

})





module.exports = {getAllCollections, getProductsByCategoryAndType, getWomenCollection, getMenCollection, getProductById, getBestSellingProducts, createProduct, updateProduct};