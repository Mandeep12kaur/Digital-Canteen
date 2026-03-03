const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Main Course', 'Snacks', 'Drinks', 'Desserts', 'Breakfast'],
    },
    image: {
        type: String, // URL or base64
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
