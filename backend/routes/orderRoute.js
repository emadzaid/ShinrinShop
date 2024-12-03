const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middlwares/authMiddleware');

const {placeOrder, getMyOrders, getOrderById, updateOrderToPaid} = require('../controllers/orderController');

router.post('/', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);

router.put('/:id/pay', protect, updateOrderToPaid);
router.get('/:id', protect, getOrderById);


module.exports = router;