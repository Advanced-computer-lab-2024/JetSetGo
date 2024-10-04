const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    }, 
    description: { 
        type: String, 
        required: true 
    },  
    tourGuide: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TourGuide', 
        required: true 
    },  // Reference to the tour guide who created the itinerary
    activities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'  // References multiple activities
        }
    ],
    locations: [
        {
            name: { type: String, required: true },  
            address: { type: String, required: true }, 
            coordinates: { type: [Number], required: true } 
        }
    ],
    timeline: [
        {
            activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
            startTime: { type: Date, required: true },  // Start time of the activity
            endTime: { type: Date, required: true }  // End time of the activity
        }
    ],
    duration: { type: String, required: true },  ////// (e.g., '3 hours', '1 day')
    language: { 
        type: String, 
        enum: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'],  //  supported langss
        required: true 
    },
    price: { type: Number, required: true },  // Total price for the tour
    availableDates: [
        {
            date: { type: Date, required: true },
            times: [{ type: String }]  // Times available for this date
        }
    ],
    accessibility: { 
        type: String, 
        enum: ['wheelchair accessible', 'not accessible', 'limited accessibility'],  // Accessibility options
        required: true
    },
    pickupLocation: { 
        type: String, 
        required: true  // Location where participants will be picked up
    },
    dropoffLocation: { 
        type: String, 
        required: true  // Location where participants will be dropped off
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
