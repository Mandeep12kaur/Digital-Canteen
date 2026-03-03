const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            priceAtOrder: {
                type: Number,
                required: true,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Cooking', 'Ready', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    qrCode: {
        type: String, // String representation or data for QR
    },
    pickupLocation: {
        type: String,
        default: 'Main Canteen',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
