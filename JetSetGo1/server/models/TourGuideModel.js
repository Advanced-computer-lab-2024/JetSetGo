const mongoose = require("mongoose");

const tourGuideSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
  }, // Years of experience
  mobile: {
    type: String,
  },
  previousWork: {
    type: String,
  }, // Previous work (optional)
  accepted: {
    type: Boolean,
    default: false,
  }, // If the guide is accepted by the system
  rejected :{
    type:Boolean,
    default:false
   },
  documents: {
    //////////////////////////////
    type: [String],
  }, // Paths to required documents
  profileImage: {
    type: String, ////////////////////
  }, // Path to profile image or logo
  deletionRequested: {
    ///////////////////////////
    type: Boolean,
    default: false,
  },
  ratings: [
    {
      tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tourist", // Reference to the tourist
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  comments: {
    type: [String],
    required: false,
  },

  Tourists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tourist", // Assuming you have a Tourist model
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TourGuide", tourGuideSchema);