const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  advertiser_id: {
    type: Schema.Types.ObjectId,
    ref: "Advertiser",
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price_range: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  special_discounts: {
    type: String,
  },
  is_booking_open: {
    type: Boolean,
    default: true,
  },
  rating:{
    type: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
