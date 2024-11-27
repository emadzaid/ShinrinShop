const express = require('express');
const app = express();
const router = express.Router();

const {getAllCollections, getWomenCollections, getMenCollections, getProductById} = require('../controllers/productController');


router.get('/', getAllCollections);
router.get('/women', getWomenCollections);
router.get('/men', getMenCollections);

router.get('/:id', getProductById);


module.exports = router;