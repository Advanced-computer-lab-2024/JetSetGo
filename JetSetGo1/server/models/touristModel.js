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
    TotalPoints: { 
        type: Number, 
        default: 0 ,
        immutable: true
    },
    Points: { 
        type: Number, 
        default: 0 ,
        immutable: true
    },
    Level: { 
        type: Number,
        enum: [1, 2, 3],  // Only allow values 1, 2, or 3
        default: 1 ,
        immutable: true
    },
       
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Tourist', touristSchema);