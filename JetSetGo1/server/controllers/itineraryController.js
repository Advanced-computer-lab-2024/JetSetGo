const Itinerary = require('../models/ItineraryModel');



//Seach Itinerary by budget
const searchItineraryByBudget = async (req,res) =>{
  const budget = req.body
  try{
    const itinerary = await Itinerary.find()
    const result = itinerary.filter(el => el.price <= budget.price)

    res.status(200).json(result)
  }
  catch(error){
    res.status(404).json({error:"Itinerary not found"})
  }
};

//Search Itinerary By date

const searchItineraryByDate = async (req, res) => {
  const { availableDates } = req.body; // Extracting availableDates from request body

  try {
      // Extract the date from the availableDates array (it should match any of the dates in the DB)
      const searchDate = new Date(availableDates[0].date);  // Assuming the request contains one date

      // Find all itineraries where any availableDates in the array matches the search date
      const itineraries = await Itinerary.find({
          'availableDates.date': searchDate  // Check all availableDates in each itinerary
      });

      if (itineraries.length === 0) {
          return res.status(404).json({ error: "No itineraries found for the given date" });
      }

      res.status(200).json(itineraries);
  } catch (error) {
      res.status(500).json({ error: "An error occurred while searching for itineraries" });
  }
};



//Search Itinerary By Language
const searchItineraryByLanguage = async (req,res) =>{
    const languageReq = req.body
    try{
      const itinerary = await Itinerary.find(languageReq)
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

//Search Itinerary By Preferences
const searchItineraryByPreferenes = async (req,res) =>{
    const preferencesReq = req.body
    try{
      const itinerary = await Itinerary.find(preferencesReq) //Change language parameter to another parameter
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

//Search Itinerary By Name
const searchItineraryByName = async (req,res) =>{
  const name = req.body
  try{
    const itinerary = await Itinerary.find(name)
    res.status(200).json(itinerary)
  }
  catch(error){
    res.status(404).json({error:"Itinerary not found"})
  }
};

//Search Itinerary By category
const searchItineraryByCategory = async (req,res) =>{
  const category = req.body
  try{
    const itinerary = await Itinerary.find(category)
    res.status(200).json(itinerary)
  }
  catch(error){
    res.status(404).json({error:"Itinerary not found"})
  }
};

//Search Itinerary By tag
const searchItineraryByTag = async (req,res) =>{
  const tag = req.body
  try{
    const itinerary = await Itinerary.find(tag)
    res.status(200).json(itinerary)
  }
  catch(error){
    res.status(404).json({error:"Itinerary not found"})
  }
};
module.exports = {searchItineraryByPreferenes, searchItineraryByDate, searchItineraryByBudget, searchItineraryByLanguage,
searchItineraryByCategory,searchItineraryByName,searchItineraryByTag};