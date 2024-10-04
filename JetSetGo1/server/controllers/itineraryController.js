const Itinerary = require('../models/ItineraryModel');

//Seach Itinerary by budget
const searchItineraryByBudget = async (req,res) =>{
  const budget = req.body
  try{
    const itinerary = await Itinerary.find()
    const result = activty.filter(el => el.price <= budget.price)

    res.status(200).json(result)
  }
  catch(error){
    res.status(404).json({error:"Activity not found"})
  }
};

//Search Itinerary By date
const searchItineraryByDate = async (req,res) =>{
    const dateReq = req.body
    try{
      const itinerary = await Itinerary.find(dateReq)
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
      const itinerary = await Itinerary.find(languageReq)
      res.status(200).json(itinerary)
    }
    catch(error){
      res.status(404).json({error:"Itinerary not found"})
    }
};

//Search Itinerary By Language
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
searchItineraryByCategory,searchItineraryByName,searchItineraryByTag
 };