const mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({

  vehicle: {
    type: String,
    enum: ['bus', 'car'],  // Enum to restrict to 'bus' or 'car'
    required: true
  },

  carModel: {
    type: String,
    required: function () { return this.vehicle === 'car'; }
  },

  cLocation: {
    type: String,
    required: function () { return this.vehicle === 'car'; }
  },

  bLocation: {
    pickup: {
      type: String,
      required: function () { return this.vehicle === 'bus'; }
    },
    dropoff: {
      type: String,
      required: function () { return this.vehicle === 'bus'; }
    }
  },
  capacity:{
    type: Number,
    required: function () { return this.vehicle === 'bus'; }
  },


  days: [{
    type: String,
    required: true
  }],
  time: {
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
  bookings: [{
    date: Date,
    bookedby: {
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
