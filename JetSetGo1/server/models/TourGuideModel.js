const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourGuideSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
    trim: true,
  },
  years_of_experience: {
    type: Number,
    required: true,
    min: 0,
  },
  previous_work: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("TourGuide", tourGuideSchema);
