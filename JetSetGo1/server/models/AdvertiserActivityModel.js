const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true
     },
    date: { 
      type: Date, 
      required: true 
    },
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
    rating :{
      type:Number,
      default:0
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category' 
    },  // Reference to the activity category
    tags: [
      { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tag' }],
    advertiser: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Advertiser', 
      required: true 
    },
    bookingOpen: { 
      type: Boolean, 
      default: true 
    },
    
    specialDiscounts: {
      type: String, 
      default: null  
  },

    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('Activity', activitySchema);
