const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");  // Assuming password hashing will be done here

const guestSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    maxLength: 20,
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
  job_status: {
    type: String,
    enum: ["Student", "Employed", "Unemployed"],
    required: true,
  },
  role: {
    type: String,
    enum: ['Guest', 'Tour Guide', 'Advertiser', 'Seller','Admin','Tourist','Tourism Governer'], 
    required: true
}
}, { timestamps: true });

// Password hashing (if needed)
guestSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Guest", guestSchema);
