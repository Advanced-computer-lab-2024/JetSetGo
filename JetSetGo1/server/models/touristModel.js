const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const TouristSchema = new Schema({
   
    username: {
        type: String,
        required: true,
        ref: 'GuestModel',
        trim: true,
        maxLength: 20,
      },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      mobile_number: {
        type: String,
        required: true,
        trim: true,
      },
      nationality: {
        type: String,
        required: true,
      },
    
      dob: {
        type: Date,
        required: true,
        validate: {
          validator: function(value) {
            const age = new Date().getFullYear() - value.getFullYear();
            return age >= 18;  // Must be 18 or older
          },
          message: "User must be 18 or older to register.",
        },
        immutable: true,  // Prevents changes to DOB
      },
      job_or_student: {
        type: String,
        trim: true
      },
    wallet: {
        type: Number,
        default: 0
      },
}, { timestamps: true });

module.exports = mongoose.model("Tourist", TouristSchema);
