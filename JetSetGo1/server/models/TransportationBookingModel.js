const mongoose = require('mongoose');

const transportationbookingSchema = new mongoose.Schema({
    
    transportationId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Transportation', 
      required: true 
    },    
    touristId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tourist', 
        required: true 
      },
      date:{
        type: Date,
        required: false
      },
      seats:{
        type: Number,
        required :false,
      },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});



transportationbookingSchema.pre('validate', async function(next) {
  try {
    const transportation = await mongoose.model('Transportation').findById(this.transportationId);
    
    if (transportation && transportation.vehicle === 'bus' && !this.seats) {
      this.invalidate('seats', 'Seats are required for bus bookings.');
    } else if (transportation && transportation.vehicle === 'car' && !this.date) {
      this.invalidate('date', 'date is required for car bookings.');
    }
    
    next();
  } catch (error) {
    next(error);
  }
});


transportationbookingSchema.pre('save', async function(next) {
  try {
    if (this.date) {
      const existingBooking = await mongoose.model('TransportationBooking').findOne({
        transportationId: this.transportationId,
        date: this.date,
      });

      if (existingBooking) {
        const error = new Error('Booking already exists for this date');
        return next(error);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});



module.exports = mongoose.model('TransportationBooking', transportationbookingSchema);
