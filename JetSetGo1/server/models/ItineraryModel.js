const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itinerarySchema = new Schema({
    price:{
        type : Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    rating:{
        type : Number,
    },
    language:{
        type: [String],
        required: true
    }
});
module.exports = mongoose.model("Itinerary", itinerarySchema);