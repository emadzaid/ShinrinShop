const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middlwares/authMiddleware');


const { getAllCollections, getProductById, getProductsByCategoryAndType, getWomenCollection, getMenCollection, getBestSellingProducts, createProduct, updateProduct, deleteProduct, getAllAccessories, createProductReview, getRelatedProducts} = require('../controllers/productController');

// More specific routes first, handle category-based logic
router.get('/:id/related', getRelatedProducts); 

router.get('/:category/bestselling', getBestSellingProducts); // Get best-selling products by category
router.get('/:category/:type', getProductsByCategoryAndType); // Matches category and type (e.g., men/shoes, women/dresses)

// Category-specific routes for men and women
router.get('/women', getWomenCollection); // Get products for women category
router.get('/men', getMenCollection); // Get products for men category
router.get('/accessories', getAllAccessories); // Get products for men category

// Route for product by ID (should be last to avoid conflicts)
router.get('/:category/:type/:id', getProductById); // Get product by category, type, and ID
router.get('/:id', getProductById); // Fallback route for getting a product by ID only
router.post('/:id/reviews', protect, createProductReview);

// Routes for product creation and updates
router.delete('/:id', protect, admin, deleteProduct); // Update product by ID
router.put('/:id', protect, admin, updateProduct); // Update product by ID
router.post('/', protect, admin, createProduct); // Create new product

// General route to fetch all collections (not tied to a specific category)
router.get('/', getAllCollections); // Get all collections


module.exports = router;
