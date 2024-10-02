const mongoose = require('mongoose');

const advertiserSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    companyProfile: { 
      type: String 
    },  // Information about the company
    websiteLink: { 
      type: String 
    },  // Link to the company website
    hotline: { 
      type: String
     },  // Company hotline
    accepted: { 
      type: Boolean, 
      default: false 
    },  // If the advertiser is accepted by the system
    createdAt: { 
      type: Date, 
      default: Date.now }
});

module.exports = mongoose.model('Advertiser', advertiserSchema);
