const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertiserSchema = new Schema({
  username: {
    type: String,
    ref: 'GuestModel',
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
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  company_profile: {
    type: String,
    trim: true,
  },
  website_link: {
    type: String,
    trim: true,
  },
  hotline: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Advertiser", advertiserSchema);
