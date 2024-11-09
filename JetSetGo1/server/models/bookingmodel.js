const mongoose = require('mongoose');
// const TouristModel = require('./TouristModel');

const bookingSchema = new mongoose.Schema({
    tourist: {
        type: String, 
        required: true, 
        ref: "Tourist"
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    referenceType: {
        type: String, 
        enum: ['Activity', 'Itinerary'], 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
