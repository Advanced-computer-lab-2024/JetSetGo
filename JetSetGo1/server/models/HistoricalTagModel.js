const mongoose = require('mongoose');

const HistoricaltagSchema = new mongoose.Schema({
    
    type: { 
      type: String, 
      enum: ['Monuments', 'Museums', 'Religious Sites','Palaces/Castles'], 
      required: true ,
    },
   
    historicalPeriod: { 
        type: String, 
        required: true 
    },


});

module.exports = mongoose.model('HistoricalTag', HistoricaltagSchema);