const Product = require('../models/productModel');
const asyncHandler = require('../middlwares/asyncHandler');


// @description get all women and men category products
// @Method GET /api/collections/
// @Access PUBLIC

const getAllCollections = asyncHandler (async(req,res) => {
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

    const products = await Product.find({...keyword});
    if(products.length > 0) {
        res.status(200).json(products);
    } else {
        res.status(404).json({message: 'Products not found'});
    }
})

// @description get all women and men accessories only
// @Method GET /api/collections/accessories
// @Access PUBLIC

const getAllAccessories = asyncHandler (async(req,res) => {
   
    const products = await Product.find({type: 'accessories'});
    if(products) {
        res.status(200).json(products);
    } else {
        res.status(404);
        throw new Error('Products not found');
    }
})


// @description get women collection
// @Method GET /api/collections/women
// @Access PUBLIC

const getWomenCollection = asyncHandler(async (req, res) => {
  
    const products = await Product.find({category:'women' });
    if (products.length > 0) {
        res.status(200).json(products);
    } else {
        res.status(404);
        throw new Error('No products not found in this category');
    }
    
});

// @description get men collection
// @Method GET /api/collections/men
// @Access PUBLIC

const getMenCollection = asyncHandler(async (req, res) => {
    const products = await Product.find({category:'men' });
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404);
            throw new Error('Products not found');        }
    
});

// @description Get women products by category and type
// @Method GET /api/collections/:category/:type
// @Access PUBLIC

const getProductsByCategoryAndType= asyncHandler(async (req, res) => {
    const { category, type } = req.params;
    const products = await Product.find({ category, type });
     if (products.length > 0) {
        res.status(200).json(products);
    } else {
        res.status(404);
        throw new Error('Products not found');    }    
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

// @description Delete product
// @Method DELETE /api/collections/:id
// @Access PRIVATE/ADMIN

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

    // @description create a review
    // @Method  POST /api/collections/:id/reviews
    // @Access PRIVATE

  const createProductReview = asyncHandler(async (req, res) => {
    const { name, rating, title, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
  
      const review = {
        name,
        rating: Number(rating),
        comment,
        title,
        user: req.user._id,
      };
  
      product.reviews.push(review);
  
      product.numReviews = product.reviews.length;
  
      product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

// @description Get 3 related products
// @Method GET /api/collections/:id/related
// @Access PUBLIC

const getRelatedProducts = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id); // Fetch the specific product by ID
    if (product) {
      // Find related products based on matching category or type, excluding the current product
      const relatedProducts = await Product.find({
        type: product.type, // Match the category
        _id: { $ne: product._id }, // Exclude the current product
      }).limit(3); // Limit to 3
  
      if (relatedProducts.length > 0) {
        res.status(200).json(relatedProducts); // Return related products
      } else {
        res.status(200).json({ message: "No related products found." });
      }
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
  


module.exports = {getAllCollections, getAllAccessories, getProductsByCategoryAndType, getWomenCollection, getMenCollection, getProductById, getBestSellingProducts, createProduct, updateProduct, deleteProduct, createProductReview, getRelatedProducts};