const mongoose = require('mongoose');

const historicalLocationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    location: {
        type: String,
        required: true,
    },
    openingHours: {
        type: String,
        required: true,
    },
    ticketPrices: {
        foreigner: { type: Number, required: true },
        native: { type: Number, required: true },
        student: { type: Number, required: true },
    },

    tags: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'HistoricalTag' 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    governor: { type: mongoose.Schema.Types.ObjectId, ref: 'TourismGovernor', required: true },

});

module.exports = mongoose.model('HistoricalLocation', historicalLocationSchema);