const mongoose = require('mongoose');


const tourGuideSchema = new mongoose.Schema({
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
    experience: { 
      type: Number, 
      required: false 
    },  // Years of experience
    mobile: { 
      type: String, 
      required: false 
    },
    previousWork: [
      { 
        type: String 
      }],  // Previous work (optional)
    accepted: { 
      type: Boolean, 
      default: false 
    },  // If the guide is accepted by the system
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});

module.exports = mongoose.model('TourGuide', tourGuideSchema);
