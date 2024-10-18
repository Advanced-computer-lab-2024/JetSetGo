const mongoose = require('mongoose');

const touristSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true ,
        immutable:true
    },
    email: { type: String, 
        required: true,
         unique: true 
        },
    password: { 
        type: String, 
        required: true 
    },
    mobile: { 
        type: String, 
        required: true 
    },
    nationality: { 
        type: String, 
        required: true 
    },
    dob: { 
        type: Date, 
        required: true ,
        immutable: true
    },  //     Date of Birth (not editable)
    job: { 
        type: String, 
        enum: ['student', 'employee', 'unemployed'],  // List of allowed job types
        required: true
    },
    wallet: { 
        type: Number, 
        default: 0 ,
        immutable: true
    },         // Not editable directly
    
    deletionRequested: {////////////////////////////////////////////////
        type: Boolean,
        default: false
    },

    prefrences:{
        historicalTags: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'HistoricalTag',
            }],
        tags: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Tag',
            
        }],
        budget: { 
            maximum: { 
                type: Number
            },
            minimum: { 
                type: Number
            }
        }
    },
       
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Tourist', touristSchema);