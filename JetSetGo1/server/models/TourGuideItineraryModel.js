const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourGuideItenerarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    activity: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    language: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableDates: [
      {
        type: Date,
        required: true,
      },
    ],
    accessibility: {
      type: Boolean,
      default: false,
    },
    pickUpLocation: {
      type: String,
      required: true,
    },
    dropOffLocation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourGuideItenerary", tourGuideItenerarySchema);
