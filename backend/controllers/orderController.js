const Order = require('../models/Order');
const { io } = require('../server'); // We'll need to handle the circular dependency or better export

// Note: circular dependency fix later if needed, but for now we'll use a direct approach
// Better yet, pass io to the controller functions or use a helper

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const { orderItems, totalAmount, pickupLocation } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    } else {
        const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000); // Simple short ID

        const order = new Order({
            user: req.user._id,
            items: orderItems.map(item => ({
                product: item._id,
                quantity: item.qty,
                priceAtOrder: item.price
            })),
            totalAmount,
            orderId,
            pickupLocation: pickupLocation || 'Main Canteen',
            qrCode: `CANTEEN-ORDER|${orderId}|${pickupLocation || 'Main Canteen'}`, // Structured data for verification
        });

        const createdOrder = await order.save();

        // Notify admins about new order
        const { io } = require('../server');
        if (io) io.emit('new_order', createdOrder);

        res.status(201).json(createdOrder);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        let updatedOrder = await order.save();

        // Re-populate for the socket emit and response
        updatedOrder = await Order.findById(updatedOrder._id)
            .populate('user', 'name email')
            .populate('items.product');

        // Notify user in real-time
        const { io } = require('../server');
        if (io) io.to(order._id.toString()).emit('order_status_updated', updatedOrder);

        // Also notify admins list for dashboard updates
        if (io) io.emit('order_list_updated');

        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate('items.product')
        .sort({ createdAt: -1 });
    res.json(orders);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name').sort({ createdAt: -1 });
    res.json(orders);
};

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderStatus,
    getMyOrders,
    getOrders,
};
