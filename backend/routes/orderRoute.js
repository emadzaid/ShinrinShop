const express = require('express');
const router = express.Router();
const {protect, admin} = require('../middlwares/authMiddleware');

const {placeOrder, getMyOrders, getOrderById, updateOrderToPaid, getAllOrders, updateOrderStatus} = require('../controllers/orderController');

router.get('/', protect, admin, getAllOrders)
router.post('/', protect, placeOrder);
router.get('/myorders', protect, getMyOrders);

router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.get('/:id', protect, getOrderById);


module.exports = router;