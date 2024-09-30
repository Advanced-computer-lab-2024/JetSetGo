const Itinerary = require('../models/ItineraryModel');

//Seach Itinerary by budget
//DOES NOT WORK AS INTENDED
//INTENTION: SEARCH FOR Itinerary WITH PRICE LOWER THAN OR EQUAL TO BUDGET
const searchItineraryByBudget = async (req,res) =>{
    const budget = req.body
    try{
      const itinerary = await Itinerary.find({price_range: budget})
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
  };

//Search Itinerary By date
const searchItineraryByDate = async (req,res) =>{
    const dateReq = req.body
    try{
      const itinerary = await Itinerary.find({date: dateReq})
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

//Search Itinerary By Language
const searchItineraryByLanguage = async (req,res) =>{
    const languageReq = req.body
    try{
      const itinerary = await Itinerary.find({language: languageReq})
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

//Search Itinerary By Language
//DOES NOT WORK AS INTENDED SINCE ITINERARY MODEL IS NOT COMPLETE AND PREFERENCES IS NOT CLEAR
const searchItineraryByPreferenes = async (req,res) =>{
    const preferencesReq = req.body
    try{
      const itinerary = await Itinerary.find({language: preferencesReq}) //Change language parameter to another parameter
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

module.exports = {searchItineraryByPreferenes, searchItineraryByDate, searchItineraryByBudget, searchItineraryByLanguage };