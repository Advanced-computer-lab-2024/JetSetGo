const mongoose = require('mongoose');
// not stated in the requiemnts about its attributes but logically the admin data should be stored
const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
         unique: true 
        },
    
     createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Admin', adminSchema);
