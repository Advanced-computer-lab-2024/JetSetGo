const Tourist = require('../models/touristModel'); 
const Itinerary = require('../models/ItineraryModel');
const Activity = require('../models/AdvertiserActivityModel');
const Tag = require('../models/TagModel');
const HistoricalLocationModel = require('../models/HistoricalLocationModel');
const MuseumModel = require('../models/MuseumModel');

//66f8084788afe7e5aff3aefc

// Update tourist information
const updateInfo = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedInfo = await Tourist.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(updatedInfo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get tourist information
const getInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Tourist.findById(id);
    res.status(200).json(profile);
  } catch (err) {
    res.status(404).json({ error: 'Profile not found' });
  }
};

//Search Historical Location by Name
const searchHistoricalPlaceByName = async (req,res) =>{
    const nameReq = req.body
    try{
      const Historical = await HistoricalLocationModel.find(nameReq)
      if(Historical.length == 0)
        {
          res.status(404).json({error:"Historical Place not found"})
        }
      res.status(200).json(Historical)
    }
    catch(error){
      res.status(404).json({error:"Historical Place not found here"})
    }
};

//Search Historical Location by Category
const searchHistoricalPlaceByCategory = async (req,res) =>{
    const nameReq = req.body
    try{
      const Historical = await HistoricalLocationModel.find(nameReq)
      if(Historical.length == 0)
        {
          res.status(404).json({error:"Historical Place not found"})
        }
      res.status(200).json(Historical)
    }
    catch(error){
      res.status(404).json({error:"Historical Place not found"})
    }
};

//Search Historical Location by Tag
const searchHistoricalPlaceByTag = async (req, res) => {
  const { tagId } = req.body;  // Extract tagId from the request body (already an ObjectId)

  try{
    const Historical = await HistoricalLocationModel.find(req.body);
    if(Historical.length == 0)
      {
        res.status(404).json({error:"Historical Place not found"})
      }
    res.status(200).json(Historical)
  }
  catch(error){
    res.status(404).json({error:"Historical Place not found"})
  }
};

//Search Museum by Tag
const searchMuseumByTag = async (req, res) => {
  const { tagId } = req.body;  // Extract tagId from the request body (already an ObjectId)

  try {
    // Step 1: Find Activities that have the tagId in their tags array
    const activities = await MuseumModel.find({ tags: tagId }).populate('tags');  // Optional: populate 'tags' to return tag details

    if (activities.length === 0) {
      return res.status(404).json({ error: "No activities found for this tag" });
    }

    // Step 2: Return the list of activities
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while searching for activities" });
  }
};

//Search Museum by Name
const searchMuseumByName = async (req,res) =>{
    const nameReq = req.body
    try{
      const Museum = await MuseumModel.find(nameReq)
      if(Museum.length == 0)
      {
        res.status(404).json({error:"Museum not found"})
      }
      res.status(200).json(Museum)
    }
    catch(error){
      res.status(404).json({error:"Museum not found"})
    }
};

//Search Museum by Category
const searchMuseumByCategory = async (req,res) =>{
    const nameReq = req.body
    try{
      const Museum = await MuseumModel.find(nameReq)
      if(Museum.length == 0)
      {
        res.status(404).json({error:"Museum not found"})
      }
      res.status(200).json(Museum)
    }
    catch(error){
      res.status(404).json({error:"Museum not found"})
    }
};


//Seach Itinerary by budget
const searchItineraryByBudget = async (req,res) =>{
  const budget = req.body
  try{
    const itinerary = await Itinerary.find()
    if (itinerary.length === 0) {
      return res.status(404).json({ error: "No itinerary found for this tag" });
    }
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
      if (itinerary.length === 0) {
        return res.status(404).json({ error: "No itinerary found for this tag" });
      }
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
    if (itinerary.length === 0) {
      return res.status(404).json({ error: "No itinerary found with this name" });
    }
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
    if (itinerary.length === 0) {
      return res.status(404).json({ error: "No itinerary found for this category" });
    }
    res.status(200).json(itinerary)
  }
  catch(error){
    res.status(404).json({error:"Itinerary not found"})
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

//Seach Activity by date 
const searchActivityByDate = async (req,res) =>{
  const dateReq = req.body
  try{
    const activty = await Activity.find(dateReq)
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activities found on this date" });
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
      return res.status(404).json({ error: "No activities found with this rating" });
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
      return res.status(404).json({ error: "No activities found" });
    }
    const result = activty.filter(el => el.price <= budget.price)

    res.status(200).json(result)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};


//Search Activity by name
const searchActivityByName = async (req,res) => {
  const activityName = req.body
  try{
    const activty = await Activity.find(activityName)
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activities found" });
    }
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by category 
const searchActivityByCategory = async (req,res) =>{
  const categoryName = req.body
  try{
    const activty = await Activity.find(categoryName)
    if (activty.length === 0) {
      return res.status(404).json({ error: "No activities found" });
    }
    res.status(200).json(activty)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Seach Activity by tag 
const searchActivityByTag = async (req, res) => {
  const { tagId } = req.body;  // Extract tagId from the request body (already an ObjectId)

  try {
    // Step 1: Find Activities that have the tagId in their tags array
    const activities = await Activity.find({ tags: tagId }).populate('tags');  // Optional: populate 'tags' to return tag details

    if (activities.length === 0) {
      return res.status(404).json({ error: "No activities found for this tag" });
    }

    // Step 2: Return the list of activities
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while searching for activities" });
  }
};


const getUpcomingActivities = async (req, res) => {
    try {
      const currentDate = new Date(); // Get the current date
      const upcomingActivities = await Activity.find({
        date: { $gte: currentDate } // Find activities with a date greater than or equal to the current date
      });
  
      res.status(200).json(upcomingActivities);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  
  const sortActivityByPrice = async (req, res) => {
    try {
        const currentDate = new Date(); // Get the current date
        const sortedActivityByPrice = await Activity.find({
        date: { $gte: currentDate } // Find activities with a date greater than or equal to the current date
      }).sort({price: 1});
      res.status(200).json(sortedActivityByPrice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  const sortActivityByRating = async (req, res) => {
    try {
        const currentDate = new Date(); // Get the current date
        const sortedActivityByRating = await Activity.find({
        date: { $gte: currentDate } // Find activities with a date greater than or equal to the current date
      }).sort({rating: 1});
      res.status(200).json(sortedActivityByRating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const getUpcomingItineraries = async (req, res) => {
    try {
      const currentDate = new Date(); // Get the current date
  
      const upcomingItineraries = await Itinerary.find({
        availableDates: {
          $elemMatch: {
            date: { $gte: currentDate } // Check if at least one date is greater than or equal to the current date
          }
        }
      });
  
      res.status(200).json(upcomingItineraries);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const sortItineraryByPrice = async (req, res) => {
    try {
      const currentDate = new Date(); // Get the current date
      const sortedItineraryByPrice = await Itinerary.find({
        availableDates: {
          $elemMatch: {
            date: { $gte: currentDate } // Check if at least one date is greater than or equal to the current date
          }
        }
      }).sort({price: 1});
      res.status(200).json(sortedItineraryByPrice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

const sortItineraryByRating = async (req, res) => {
    try {
      const currentDate = new Date(); // Get the current date
      const sortedItineraryByRating = await Itinerary.find({
        availableDates: {
          $elemMatch: {
            date: { $gte: currentDate } // Check if at least one date is greater than or equal to the current date
          }
        }
      }).sort({rating: 1});
      res.status(200).json(sortedItineraryByRating);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const getMuseums = async (req, res) => {
    try {
      const museum = await MuseumModel.find();
      res.status(200).json(museum);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const filterMuseumsByTag = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Query museums where the tags array contains the given tagId
      const museums = await MuseumModel.find({ tags: id });
  
      if (museums.length === 0) {
        return res.status(404).json({ message: 'No museums found with the given tag' });
      }
  
      res.status(200).json(museums);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const getHistoricalLocations = async (req, res) => {
    try {
      const historicalLocation = await HistoricalLocationModel.find();
      res.status(200).json(historicalLocation);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const filterHistoricalLocationsByTag = async (req, res) => {
    try {
      const { id } = req.params;
      // Query historical locations where the tags array contains the given tagId
      const historicalLocations = await HistoricalLocationModel.find({ tags: id });
  
      if (historicalLocations.length === 0) {
        return res.status(404).json({ message: 'No historical locations found with the given tag' });
      }
  
      res.status(200).json(historicalLocations);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


  module.exports = {updateInfo, getInfo,
    searchHistoricalPlaceByTag,searchHistoricalPlaceByName,searchHistoricalPlaceByCategory,
    searchMuseumByTag,searchMuseumByName,searchMuseumByCategory,
    searchActivityByBudget,searchActivityByDate,searchActivityByRating, searchActivityByTag,searchActivityByCategory,searchActivityByName, 
    searchItineraryByDate, searchItineraryByBudget, 
    searchItineraryByLanguage, searchItineraryByCategory,searchItineraryByName,searchItineraryByTag,
    getUpcomingActivities, sortActivityByPrice, sortActivityByRating, getUpcomingItineraries, sortItineraryByPrice, sortItineraryByRating,
     getMuseums, filterMuseumsByTag, getHistoricalLocations, filterHistoricalLocationsByTag};