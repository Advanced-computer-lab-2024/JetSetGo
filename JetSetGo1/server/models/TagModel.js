const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({

    type: { 
        Monuments: { type: String, required: true },
        Museums: { type: String, required: true },
        ReligiousSites: { type: String, required: true },
        Castles: { type: String, required: true }
    },

    historicalPeriod: { 
        type: String, 
        required: true 
    },
    

    
});

module.exports = mongoose.model('Tag', tagSchema);
