const mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({
    carModel: { 
      type: String, 
      required: true
     },
     days: [{
        type: String, 
        required: true 
    }],
      time: { 
        type: String, 
        required: true 
      },
    location: { 
      type: String,
       required: true 
      },
    price: { 
        type: Number, 
        required: true 
    },
    ratings: [
        {
          star: Number,
          postedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tourist",
          },
        },
      ],
      totalrating: {
        type: String,
        default: "0",
      },
      bookings :[{
        date: Date,
        bookedby:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tourist",
        }
      }],
    advertiser: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Advertiser', 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('Transportation', transportationSchema);
