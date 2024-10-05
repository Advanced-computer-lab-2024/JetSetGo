//const Guest = require('../models/GuestModel'); // Assuming the Guest model covers all user types
const Itinerary = require('../models/ItineraryModel');
const Activity = require('../models/AdvertiserActivityModel');

//Seach Itinerary by budget
const searchItineraryByBudget = async (req,res) =>{
  const budget = req.body
  try{
    const itinerary = await Itinerary.find()
    if (itinerary.length === 0) {
      return res.status(404).json({ error: "No itineraries found within this budget" });
    }
    const result = itinerary.filter(el => el.price <= budget.price)

    res.status(200).json(result)
  }
  catch(error){
    res.status(500).json({ error: "An error occurred while searching for itineraries" });
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
      if (itinerary.length === 0) {
        return res.status(404).json({ error: "No itineraries found" });
      }
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

//Seach Activity by category 
const searchActivityByCategory = async (req,res) =>{
  const categoryName = req.body
  try{
    const activty = await Activity.find(categoryName)
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activties found" });
    }
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};



//Seach Activity by date 
const searchActivityByDate = async (req,res) =>{
  const dateReq = req.body
  try{
    const activty = await Activity.find(dateReq)
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activties found" });
    }
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by rating 
const searchActivityByRating = async (req,res) =>{
  const ratingReq = req.body
  try{
    const activty = await Activity.find(ratingReq)
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activties found" });
    }
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by budget
const searchActivityByBudget = async (req,res) =>{
  const budget = req.body
  
  try{
    const activty = await Activity.find()
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activties found" });
    }
    const result = activty.filter(el => el.price <= budget.price)

    res.status(200).json(result)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Search Itinerary By tag
const searchItineraryByTag = async (req, res) => {
  const { tagId } = req.body;  // Extract tagId from the request body (already an ObjectId)

  try {
    // Step 1: Find itineraries that have the tagId in their tags array
    const itineraries = await Itinerary.find({ tags: tagId }).populate('tags');  // Optional: populate 'tags' to return tag details

    if (itineraries.length === 0) {
      return res.status(404).json({ error: "No itinerary found for this tag" });
    }

    // Step 2: Return the list of itineraries
    res.status(200).json(itineraries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while searching for itineraries" });
  }
};

module.exports = {searchActivityByBudget,searchActivityByDate,searchActivityByCategory,searchActivityByRating,searchItineraryByTag, 
searchItineraryByDate, searchItineraryByBudget, searchItineraryByLanguage  };