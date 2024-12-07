const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const asyncHandler = require('../middlwares/asyncHandler');
const {calcPrice} = require('../utils/calcPrice');

// @description Place an order
// @method POST /api/orders/
// @access PRIVATE

const placeOrder = asyncHandler(async (req,res) => {
    const {orderItems, shippingAddress, paymentMethod} = req.body;

     // Validate shippingAddress
    const requiredShippingFields = ['address', 'city', 'postalCode', 'country', 'phone'];
    const missingFields = requiredShippingFields.filter(
        (field) => !shippingAddress || !shippingAddress[field]
    );

    if (missingFields.length > 0) {
            res.status(400);
            throw new Error(
            `Missing required fields in shipping address: ${missingFields.join(', ')}`
            );
        }
    
    if (!paymentMethod) {
        res.status(400);
        throw new Error("Payment method is required");
      }


    if(orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    } else {

        // Here we will recalculate items price, shipping price, and total price at the server side since the client side values can not be trusted and can be tampered
        // find the order items in database

        const itemsFromDB = await Product.find({ _id: {$in: orderItems.map((x) => x._id)}});

        // now map the items from client side to items from DB

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemFromDB) => itemFromDB._id.toString() === itemFromClient._id);
            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            }
        })

        const {
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = calcPrice(dbOrderItems);

        const order = new Order({
            user: req.user._id,
            orderItems: dbOrderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save();
        res.status(200).json(createdOrder);
    }

})

// @description Get logged in user orders
// @method GET /api/orders/myorders
// @access PRIVATE

const getMyOrders = asyncHandler(async (req,res) => {
    const myorders = await Order.find({user: req.user._id});
    if(myorders.length > 0) {
        res.status(200).json(myorders);
    } else {
        res.status(404);
        throw new Error('No orders found');
    }
})


// @description Get order by id 
// @method GET /api/orders/myorders
// @access PRIVATE

const getOrderById = asyncHandler(async (req,res) => {
    
    const order = await Order.findById(req.params.id);
    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('No order found');
    }
})

// @description update order to pay
// @method PUT /api/orders/pay
// @access PRIVATE

const updateOrderToPaid = asyncHandler(async (req,res) => {
    
    const order = await Order.findById(req.params.id);
    if(order) {
       order.isPaid = true;
       order.isPaidAt = Date.now();
       order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
       }
       const updateOrder = await order.save();
       res.status(200).json(updateOrder);
    } else {
        res.status(404);
        throw new Error('No order found');
    }
})



// @description Get all orders
// @method GET /api/orders/
// @access PRIVATE/ADMIN

const getAllOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    if(orders.length > 0) {
        res.status(200).json(orders);
    } else {
        res.status(404);
        throw new Error('No orders found');
    }
})

// @description update order stauts
// @method PUT /api/orders/:id
// @access PRIVATE/ADMIN

const updateOrderStatus = asyncHandler(async (req, res) => {

    const { id, status } = req.body; // The new status sent in the request body
    console.log(id, status)

    // Find the order by ID
    const order = await Order.findById(id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // Update the order status
    order.status = status;
    const updatedOrder = await order.save();

    // Return the updated order
    res.status(200).json({
        message: 'Order status updated successfully',
        order: updatedOrder,
    });
});



module.exports = {placeOrder, getMyOrders, getOrderById, updateOrderToPaid, getAllOrders, updateOrderStatus};