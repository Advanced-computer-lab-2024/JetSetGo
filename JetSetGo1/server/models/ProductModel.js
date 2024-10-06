const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantityAvailable: { type: Number, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    picture: { type: String },
    ratings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);