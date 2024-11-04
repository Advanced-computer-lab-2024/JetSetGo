const mongoose = require('mongoose');

const transportationbookingSchema = new mongoose.Schema({
    
    transportationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Transportation', 
      required: true 
    },    
    touristId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tourist', 
        required: true 
      },
      date:{
        type: Date,
        required: true
      },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('TransportationBooking', transportationbookingSchema);
