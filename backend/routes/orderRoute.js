const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middlwares/authMiddleware');

const {placeOrder, getMyOrders, getOrderById} = require('../controllers/orderController');

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);


module.exports = router;