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
    
    rate :{
      type:[Number],
    },


    specialDiscounts: {
      type: String, 
      default: null  
  },

  Tourists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tourist', // Assuming you have a Tourist model
  }],
  comments: {
    type : [String],
    required: true,
},


    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});



module.exports = mongoose.model('Activity', activitySchema);
