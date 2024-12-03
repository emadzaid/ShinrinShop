const express = require('express');
const router = express.Router();

const { getAllCollections, getProductById, getProductsByCategoryAndType, getCollectionByCategory, getBestSellingProducts } = require('../controllers/productController');

// More specific routes first
router.get('/:category/:type/:id', getProductById); // This should match the product ID
router.get('/:category/bestselling', getBestSellingProducts); // Best selling products with categories
router.get('/:category/:type', getProductsByCategoryAndType); // Matches category and type
router.get('/:category', getCollectionByCategory); // Matches category only

router.get('/', getAllCollections); // Matches all collections

module.exports = router;
