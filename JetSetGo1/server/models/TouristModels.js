const mongoose = require('mongoose');
///aaaaaaA11111111111111111111111
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
    prefrences:{
        tags: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Tag'
            }],
        budget:{
            from:{type: Number},
            to:{type:Number}
        }    
    },
    wallet: { 
        type: Number, 
        default: 0
    },
    
    deletionRequested: {////////////////////////////////////////////////
        type: Boolean,
        default: false
    },
    TotalPoints: { 
        type: Number, 
        default: 0
    },
    Points: { 
        type: Number, 
        default: 0
    },
    Level: { 
        type: Number,
        enum: [1, 2, 3],  // Only allow values 1, 2, or 3
        default: 1 
    },   
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Tourist', touristSchema);